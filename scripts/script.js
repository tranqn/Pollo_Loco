// Main game script

/** @type {HTMLCanvasElement} The game canvas element */
let canvas;
/** @type {World} The game world instance */
let world;
/** @type {Keyboard} The keyboard input handler */
let keyboard;
/** @type {boolean} Whether audio is currently muted */
let isMuted = false;
/** @type {boolean} Whether the game is currently paused */
let isPaused = false;

// rAF game loop state
/** @type {number|null} The requestAnimationFrame ID */
let gameAnimationId = null;
/** @type {number} Timestamp of the last frame */
let lastFrameTime = 0;
/** @type {number} Accumulated time for fixed-step updates */
let accumulator = 0;

/** @type {Object} Cached DOM element references */
const DOM = {};

/**
 * Cache all frequently-accessed DOM elements once at startup
 */
function cacheDOMElements() {
    DOM.canvas = document.getElementById('canvas');
    DOM.landingPage = document.getElementById('landing-page');
    DOM.muteBtn = document.getElementById('mute-btn');
    DOM.fullscreenBtn = document.getElementById('fullscreen-btn');
    DOM.pauseBtn = document.getElementById('pause-btn');
    DOM.mobileControls = document.getElementById('mobile-controls');
    DOM.pauseScreen = document.getElementById('pause-screen');
    DOM.gameoverScreen = document.getElementById('gameover-screen');
    DOM.winScreen = document.getElementById('win-screen');
    DOM.instructionsDialog = document.getElementById('instructions-dialog');
    DOM.portraitWarning = document.getElementById('portrait-warning');
    DOM.restartBtn = document.getElementById('restart-btn');
    DOM.winRestartBtn = document.getElementById('win-restart-btn');
    DOM.gameoverBg = document.getElementById('gameover-bg');
    DOM.winBg = document.getElementById('win-bg');
    DOM.startBtn = document.getElementById('start-btn');
}

/**
 * Detect if the device supports touch input
 * @returns {boolean} True if the device has touch capability
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Preload all game images into GLOBAL_IMAGE_CACHE
 * @returns {Promise} Resolves when all images are loaded
 */
/**
 * Collect all image paths from every class into one flat array
 * @returns {Array<string>}
 */
function collectAllImagePaths() {
    return [
        ...Character.IMAGES_IDLE, ...Character.IMAGES_LONG_IDLE,
        ...Character.IMAGES_WALKING, ...Character.IMAGES_JUMPING,
        ...Character.IMAGES_HURT, ...Character.IMAGES_DEAD,
        ...Chicken.IMAGES_WALKING, ...Chicken.IMAGES_DEAD,
        ...SmallChicken.IMAGES_WALKING, ...SmallChicken.IMAGES_DEAD,
        ...Endboss.IMAGES_WALKING, ...Endboss.IMAGES_ALERT,
        ...Endboss.IMAGES_ATTACK, ...Endboss.IMAGES_HURT, ...Endboss.IMAGES_DEAD,
        ...Coin.IMAGES_COIN, ...Bottle.IMAGES_GROUND,
        ...ThrowableObject.IMAGES_ROTATION, ...ThrowableObject.IMAGES_SPLASH,
        ...StatusBar.IMAGES_HEALTH, ...StatusBar.IMAGES_COIN,
        ...StatusBar.IMAGES_BOTTLE, ...StatusBar.IMAGES_ENDBOSS,
        ...World.IMAGES_GAME_OVER, ...World.IMAGES_WIN_SCREEN,
        ...BackgroundObject.IMAGES_LAYER_1, ...BackgroundObject.IMAGES_LAYER_2,
        ...BackgroundObject.IMAGES_LAYER_3, ...BackgroundObject.IMAGES_CLOUDS,
        BackgroundObject.IMAGE_AIR, Cloud.IMAGE
    ];
}

/**
 * Populate each class's static IMAGES_CACHE from the global cache
 */
function populateClassCaches() {
    Character.loadAllImages();
    Chicken.loadAllImages();
    SmallChicken.loadAllImages();
    Endboss.loadAllImages();
    Coin.loadAllImages();
    Bottle.loadAllImages();
    ThrowableObject.loadAllImages();
    StatusBar.loadAllImages();
}

/**
 * Preload all game images into GLOBAL_IMAGE_CACHE, then populate class caches
 * @returns {Promise}
 */
function preloadImages() {
    const uniquePaths = [...new Set(collectAllImagePaths())];
    const promises = uniquePaths.map(path => {
        return new Promise(resolve => {
            const img = getCachedImage(path);
            if (img.complete) return resolve();
            img.onload = resolve;
            img.onerror = resolve;
        });
    });
    return Promise.all(promises).then(populateClassCaches);
}

/**
 * Start the game from landing page
 */
function startGame() {
    stopBackgroundAnimation();
    removeBgEventListeners();
    if (DOM.canvas) DOM.canvas.classList.remove('hidden');
    if (DOM.landingPage) DOM.landingPage.classList.add('hidden');
    if (DOM.muteBtn) DOM.muteBtn.classList.remove('hidden');
    if (DOM.fullscreenBtn) DOM.fullscreenBtn.classList.remove('hidden');
    if (DOM.pauseBtn) DOM.pauseBtn.classList.remove('hidden');

    init();

    if (isTouchDevice()) {
        if (DOM.mobileControls) DOM.mobileControls.classList.remove('hidden');
    }

    setupTouchControls();
}

/**
 * Show instructions modal dialog
 */
function showInstructions() {
    if (DOM.instructionsDialog) DOM.instructionsDialog.classList.remove('hidden');
}

/**
 * Hide instructions modal dialog
 */
function hideInstructions() {
    if (DOM.instructionsDialog) DOM.instructionsDialog.classList.add('hidden');
}

/**
 * Toggle mute/unmute sound
 */
function toggleMute() {
    const audioManager = AudioManager.getInstance();
    isMuted = audioManager.toggleMute();
    if (DOM.muteBtn) DOM.muteBtn.textContent = isMuted ? '🔇' : '🔊';
}

/**
 * Toggle fullscreen mode on the document
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/**
 * Toggle pause state of the game
 */
function togglePause() {
    if (!world || world.isGameOver) return;
    if (isPaused) {
        resumeGame();
    } else {
        isPaused = true;
        stopGameLoop();
        if (DOM.pauseScreen) DOM.pauseScreen.classList.remove('hidden');
    }
}

/**
 * Resume the game from paused state
 */
function resumeGame() {
    isPaused = false;
    if (DOM.pauseScreen) DOM.pauseScreen.classList.add('hidden');
    if (world && world.character) {
        world.character.lastActionTime = Date.now();
    }
    startGameLoop();
}

/**
 * Clear remaining timeouts from game objects
 */
function clearGameIntervals() {
    if (!world) return;

    if (world.endScreenTimeout) {
        clearTimeout(world.endScreenTimeout);
    }
}

/**
 * Reset keyboard state to all keys released
 */
function resetKeyboard() {
    if (!keyboard) return;
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
    keyboard.D = false;
}

/**
 * Go back to main menu (landing page)
 */
/**
 * Hide all game UI overlays and buttons
 */
function hideAllGameUI() {
    const elementsToHide = [
        DOM.gameoverScreen, DOM.winScreen, DOM.pauseScreen,
        DOM.muteBtn, DOM.fullscreenBtn, DOM.pauseBtn, DOM.mobileControls
    ];
    elementsToHide.forEach(el => { if (el) el.classList.add('hidden'); });
}

/**
 * Go back to main menu (landing page)
 */
function backToMenu() {
    if (world && world.character) {
        world.character.stopSnoring();
    }
    AudioManager.getInstance().stopMusic();
    stopGameLoop();
    clearGameIntervals();
    hideAllGameUI();
    isPaused = false;
    if (DOM.canvas) DOM.canvas.classList.add('hidden');
    if (DOM.landingPage) DOM.landingPage.classList.remove('hidden');
    resetKeyboard();
    world = null;
    level1 = createLevel1();
    restartBackgroundAnimation();
    addBgEventListeners();
}

/**
 * Initialize the game
 */
function init() {
    canvas = DOM.canvas;
    if (!canvas) return;

    if (!keyboard) {
        keyboard = new Keyboard();
        initKeyboardListeners();
    }

    world = new World(canvas, keyboard);
    startGameLoop();
}

/**
 * Initialize keyboard event listeners
 */
function initKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') togglePause();
        if (e.key === 'ArrowLeft') keyboard.LEFT = true;
        if (e.key === 'ArrowRight') keyboard.RIGHT = true;
        if (e.key === ' ') keyboard.SPACE = true;
        if (e.key === 'd' || e.key === 'D') keyboard.D = true;
    }, { passive: true });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') keyboard.LEFT = false;
        if (e.key === 'ArrowRight') keyboard.RIGHT = false;
        if (e.key === ' ') keyboard.SPACE = false;
        if (e.key === 'd' || e.key === 'D') keyboard.D = false;
    }, { passive: true });
}

/**
 * Restart the game without page reload
 */
function restartGame() {
    stopGameLoop();
    clearGameIntervals();

    if (DOM.gameoverScreen) DOM.gameoverScreen.classList.add('hidden');
    if (DOM.winScreen) DOM.winScreen.classList.add('hidden');
    if (DOM.pauseScreen) DOM.pauseScreen.classList.add('hidden');
    isPaused = false;

    resetKeyboard();
    world = null;

    level1 = createLevel1();
    init();
}

/**
 * Restore mute state from localStorage on page load
 */
function restoreMuteState() {
    const savedMuteState = localStorage.getItem('gameMuted');
    if (savedMuteState === 'true') {
        isMuted = true;
        if (DOM.muteBtn) DOM.muteBtn.textContent = '🔇';
    }
}

/**
 * Disable start button during preload, re-enable when done
 */
function initPreloading() {
    if (DOM.startBtn) {
        DOM.startBtn.disabled = true;
        DOM.startBtn.textContent = 'Loading...';
    }
    preloadImages().then(() => {
        if (DOM.startBtn) {
            DOM.startBtn.disabled = false;
            DOM.startBtn.textContent = 'Start Game';
        }
    });
}

/** Initialize restart buttons, mobile controls, and preload images when page loads */
window.addEventListener('DOMContentLoaded', () => {
    cacheDOMElements();
    restoreMuteState();
    if (DOM.restartBtn) DOM.restartBtn.addEventListener('click', restartGame);
    if (DOM.winRestartBtn) DOM.winRestartBtn.addEventListener('click', restartGame);
    initPreloading();
    initMobileControls();
    checkOrientation();
    initBackgroundAnimation();
});

/**
 * Start the game loop using requestAnimationFrame with fixed-timestep updates
 */
function startGameLoop() {
    lastFrameTime = 0;
    accumulator = 0;
    gameAnimationId = requestAnimationFrame(gameLoop);
}

/**
 * Main game loop — accumulates real time and runs fixed-step updates
 * @param {number} currentTime - Timestamp provided by requestAnimationFrame
 */
function gameLoop(currentTime) {
    if (!lastFrameTime) lastFrameTime = currentTime;
    let delta = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    if (delta > FRAME_INTERVAL * 5) delta = FRAME_INTERVAL * 5;
    accumulator += delta;

    while (accumulator >= FRAME_INTERVAL) {
        world.update();
        accumulator -= FRAME_INTERVAL;
    }

    world.draw();
    gameAnimationId = requestAnimationFrame(gameLoop);
}

/**
 * Stop the game loop
 */
function stopGameLoop() {
    if (gameAnimationId) {
        cancelAnimationFrame(gameAnimationId);
        gameAnimationId = null;
    }
}

/**
 * Initialize mobile touch controls visibility and resize handling
 */
function initMobileControls() {
    if (!DOM.mobileControls) return;

    window.addEventListener('resize', () => {
        if (!world) return;
        if (isTouchDevice()) {
            DOM.mobileControls.classList.remove('hidden');
        } else {
            DOM.mobileControls.classList.add('hidden');
        }
    }, { passive: true });
}

/** @type {boolean} Whether touch controls have been initialized */
let touchControlsInitialized = false;

/**
 * Setup touch event listeners for mobile buttons
 */
function setupTouchControls() {
    if (touchControlsInitialized) return;
    setupTouchButton('.left-btn', 'LEFT');
    setupTouchButton('.right-btn', 'RIGHT');
    setupTouchButton('.jump-btn', 'SPACE');
    setupTouchButton('.throw-btn', 'D');
    touchControlsInitialized = true;
}

/**
 * Setup touch events for a single mobile button
 * @param {string} selector - CSS selector for the button
 * @param {string} key - Keyboard property name to toggle
 */
function setupTouchButton(selector, key) {
    const btn = document.querySelector(selector);
    if (!btn || !keyboard) return;

    btn.addEventListener('contextmenu', (e) => e.preventDefault());
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });
    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
}

/**
 * Check device orientation and show warning in portrait mode
 */
function checkOrientation() {
    function updateOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const isMobile = isTouchDevice();

        if (isPortrait && isMobile && DOM.portraitWarning) {
            DOM.portraitWarning.classList.remove('hidden');
        } else if (DOM.portraitWarning) {
            DOM.portraitWarning.classList.add('hidden');
        }
    }

    updateOrientation();
    window.addEventListener('orientationchange', updateOrientation, { passive: true });
    window.addEventListener('resize', updateOrientation, { passive: true });
}
