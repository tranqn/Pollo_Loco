// Main game script

/** @type {HTMLCanvasElement} The game canvas element */
let canvas;
/** @type {World} The game world instance */
let world;
/** @type {number|null} The game loop interval ID */
let gameInterval;
/** @type {Keyboard} The keyboard input handler */
let keyboard;
/** @type {boolean} Whether audio is currently muted */
let isMuted = false;
/** @type {boolean} Whether the game is currently paused */
let isPaused = false;

/**
 * Detect if the device supports touch input
 * @returns {boolean} True if the device has touch capability
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Start the game from landing page
 */
function startGame() {
    const landingPage = document.getElementById('landing-page');
    if (landingPage) landingPage.classList.add('hidden');

    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) muteBtn.classList.remove('hidden');

    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) fullscreenBtn.classList.remove('hidden');

    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) pauseBtn.classList.remove('hidden');

    init();

    if (isTouchDevice()) {
        const mobileControls = document.getElementById('mobile-controls');
        if (mobileControls) mobileControls.classList.remove('hidden');
    }

    setupTouchControls();
}

/**
 * Show instructions modal dialog
 */
function showInstructions() {
    const dialog = document.getElementById('instructions-dialog');
    if (dialog) dialog.classList.remove('hidden');
}

/**
 * Hide instructions modal dialog
 */
function hideInstructions() {
    const dialog = document.getElementById('instructions-dialog');
    if (dialog) dialog.classList.add('hidden');
}

/**
 * Toggle mute/unmute sound
 */
function toggleMute() {
    const audioManager = AudioManager.getInstance();
    isMuted = audioManager.toggleMute();

    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) muteBtn.textContent = isMuted ? '🔇' : '🔊';
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
        const pauseScreen = document.getElementById('pause-screen');
        if (pauseScreen) pauseScreen.classList.remove('hidden');
    }
}

/**
 * Resume the game from paused state
 */
function resumeGame() {
    isPaused = false;
    hideScreen('pause-screen');
    if (world && world.character) {
        world.character.lastActionTime = Date.now();
    }
    startGameLoop();
}

/**
 * Clear all animation intervals from game objects
 */
function clearGameIntervals() {
    if (!world) return;

    if (world.endScreenTimeout) {
        clearTimeout(world.endScreenTimeout);
    }

    if (world.character && world.character.animationInterval) {
        clearInterval(world.character.animationInterval);
    }

    if (world.level && world.level.enemies) {
        world.level.enemies.forEach(enemy => {
            if (enemy.animationInterval) clearInterval(enemy.animationInterval);
        });
    }

    if (world.thrownBottles) {
        world.thrownBottles.forEach(bottle => {
            if (bottle.animationInterval) clearInterval(bottle.animationInterval);
        });
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
function backToMenu() {
    AudioManager.getInstance().stopMusic();
    stopGameLoop();
    clearGameIntervals();

    hideScreen('gameover-screen');
    hideScreen('win-screen');
    hideScreen('pause-screen');
    hideScreen('mute-btn');
    hideScreen('fullscreen-btn');
    hideScreen('pause-btn');
    hideScreen('mobile-controls');
    isPaused = false;

    const landingPage = document.getElementById('landing-page');
    if (landingPage) landingPage.classList.remove('hidden');

    resetKeyboard();
    world = null;
    level1 = createLevel1();
}

/**
 * Hide a screen element by adding 'hidden' class
 * @param {string} id - Element ID
 */
function hideScreen(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

/**
 * Initialize the game
 */
function init() {
    canvas = document.getElementById('canvas');
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
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') keyboard.LEFT = false;
        if (e.key === 'ArrowRight') keyboard.RIGHT = false;
        if (e.key === ' ') keyboard.SPACE = false;
        if (e.key === 'd' || e.key === 'D') keyboard.D = false;
    });
}

/**
 * Restart the game without page reload
 */
function restartGame() {
    stopGameLoop();
    clearGameIntervals();

    hideScreen('gameover-screen');
    hideScreen('win-screen');
    hideScreen('pause-screen');
    isPaused = false;

    resetKeyboard();
    world = null;

    level1 = createLevel1();
    init();
}

// Initialize restart buttons and mobile controls when page loads
window.addEventListener('DOMContentLoaded', () => {
    const savedMuteState = localStorage.getItem('gameMuted');
    if (savedMuteState === 'true') {
        isMuted = true;
        const muteBtn = document.getElementById('mute-btn');
        if (muteBtn) muteBtn.textContent = '🔇';
    }

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) restartBtn.addEventListener('click', restartGame);

    const winRestartBtn = document.getElementById('win-restart-btn');
    if (winRestartBtn) winRestartBtn.addEventListener('click', restartGame);

    initMobileControls();
    checkOrientation();
});

/**
 * Start the game loop
 */
function startGameLoop() {
    gameInterval = setInterval(() => {
        world.update();
        world.draw();
    }, FRAME_INTERVAL);
}

/**
 * Stop the game loop
 */
function stopGameLoop() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
}

/**
 * Initialize mobile touch controls visibility and resize handling
 */
function initMobileControls() {
    const mobileControls = document.getElementById('mobile-controls');
    if (!mobileControls) return;

    window.addEventListener('resize', () => {
        if (!world) return;
        if (isTouchDevice()) {
            mobileControls.classList.remove('hidden');
        } else {
            mobileControls.classList.add('hidden');
        }
    });
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
    const portraitWarning = document.getElementById('portrait-warning');

    function updateOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const isMobile = isTouchDevice();

        if (isPortrait && isMobile && portraitWarning) {
            portraitWarning.classList.remove('hidden');
        } else if (portraitWarning) {
            portraitWarning.classList.add('hidden');
        }
    }

    updateOrientation();
    window.addEventListener('orientationchange', updateOrientation);
    window.addEventListener('resize', updateOrientation);
}
