// Main game script

// Global variables
let canvas;
let world;
let gameInterval;
let keyboard;

/**
 * Initialize the game
 * Called when player clicks "START GAME" button
 */
function init() {
    // Hide start screen
    const startScreen = document.getElementById('start-screen');
    if (startScreen) {
        startScreen.classList.add('hidden');
    }

    // Get canvas element
    canvas = document.getElementById('canvas');
    if (!canvas) {
        return;
    }

    // Initialize keyboard (only once)
    if (!keyboard) {
        keyboard = new Keyboard();
        initKeyboardListeners();
    }

    // Create world (this creates the character and all game objects)
    world = new World(canvas, keyboard);

    // Start game loop
    startGameLoop();
}

/**
 * Initialize keyboard event listeners
 */
function initKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            keyboard.LEFT = true;
        }
        if (e.key === 'ArrowRight') {
            keyboard.RIGHT = true;
        }
        if (e.key === ' ') {
            keyboard.SPACE = true;
        }
        if (e.key === 'd' || e.key === 'D') {
            keyboard.D = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') {
            keyboard.LEFT = false;
        }
        if (e.key === 'ArrowRight') {
            keyboard.RIGHT = false;
        }
        if (e.key === ' ') {
            keyboard.SPACE = false;
        }
        if (e.key === 'd' || e.key === 'D') {
            keyboard.D = false;
        }
    });
}

/**
 * Restart the game
 * Resets game state without page reload
 */
function restartGame() {
    // Stop the game loop
    stopGameLoop();

    // Hide end screens
    const gameOverScreen = document.getElementById('gameover-screen');
    const winScreen = document.getElementById('win-screen');
    if (gameOverScreen) gameOverScreen.classList.add('hidden');
    if (winScreen) winScreen.classList.add('hidden');

    // Show start screen
    const startScreen = document.getElementById('start-screen');
    if (startScreen) startScreen.classList.remove('hidden');

    // Reset keyboard state
    if (keyboard) {
        keyboard.LEFT = false;
        keyboard.RIGHT = false;
        keyboard.SPACE = false;
        keyboard.D = false;
    }

    // Clear world (will be recreated on next init())
    world = null;
}

// Initialize restart buttons and mobile controls when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Game over restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartGame);
    }

    // Win screen restart button
    const winRestartBtn = document.getElementById('win-restart-btn');
    if (winRestartBtn) {
        winRestartBtn.addEventListener('click', restartGame);
    }

    // Initialize mobile controls
    initMobileControls();
    checkOrientation();
});

/**
 * Start the game loop - runs 60 times per second
 * For now, we only draw (no movement)
 */
function startGameLoop() {
    gameInterval = setInterval(() => {
        // Update game state (movement, physics, collisions)
        world.update();

        // Draw everything on the canvas
        world.draw();
    }, FRAME_INTERVAL); // From constants.js: 1000/60 ≈ 16.67ms
}

/**
 * Stop the game loop
 * Useful for pause functionality
 */
function stopGameLoop() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
}

/**
 * Initialize mobile touch controls
 * Shows controls on mobile/tablet, hides on desktop
 */
function initMobileControls() {
    const mobileControls = document.getElementById('mobile-controls');
    const isMobile = window.innerWidth <= 768;

    if (isMobile && mobileControls) {
        mobileControls.classList.remove('hidden');
        setupTouchControls();
    }

    // Re-check on window resize
    window.addEventListener('resize', () => {
        const isMobileNow = window.innerWidth <= 768;
        if (isMobileNow) {
            mobileControls.classList.remove('hidden');
        } else {
            mobileControls.classList.add('hidden');
        }
    });
}

/**
 * Setup touch event listeners for mobile buttons
 */
function setupTouchControls() {
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const jumpBtn = document.querySelector('.jump-btn');
    const throwBtn = document.querySelector('.throw-btn');

    // Disable context menu on all touch buttons
    [leftBtn, rightBtn, jumpBtn, throwBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('contextmenu', (e) => e.preventDefault());
        }
    });

    // Left button
    if (leftBtn && keyboard) {
        leftBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.LEFT = true;
        });
        leftBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT = false;
        });
    }

    // Right button
    if (rightBtn && keyboard) {
        rightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT = true;
        });
        rightBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT = false;
        });
    }

    // Jump button
    if (jumpBtn && keyboard) {
        jumpBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.SPACE = true;
        });
        jumpBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        });
    }

    // Throw button
    if (throwBtn && keyboard) {
        throwBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.D = true;
        });
        throwBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.D = false;
        });
    }
}

/**
 * Check device orientation and show warning in portrait mode
 */
function checkOrientation() {
    const portraitWarning = document.getElementById('portrait-warning');

    function updateOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const isMobile = window.innerWidth <= 768;

        if (isPortrait && isMobile && portraitWarning) {
            portraitWarning.classList.remove('hidden');
        } else if (portraitWarning) {
            portraitWarning.classList.add('hidden');
        }
    }

    // Check on load
    updateOrientation();

    // Check on orientation change
    window.addEventListener('orientationchange', updateOrientation);
    window.addEventListener('resize', updateOrientation);
}
