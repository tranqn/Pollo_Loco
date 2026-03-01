// Main game script

// Global variables
let canvas;
let world;
let gameInterval;
let keyboard;
let isMuted = false;

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
 * Clear all animation intervals from game objects
 */
function clearGameIntervals() {
    if (!world) return;

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
    hideScreen('mute-btn');
    hideScreen('mobile-controls');

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
