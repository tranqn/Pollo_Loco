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
    console.log('Initializing game...');

    // Hide start screen
    const startScreen = document.getElementById('start-screen');
    if (startScreen) {
        startScreen.classList.add('hidden');
    }

    // Get canvas element
    canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    console.log('Canvas size:', canvas.width, 'x', canvas.height);

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

    console.log('Keyboard listeners initialized');
}

/**
 * Restart the game
 * Resets game state without page reload
 */
function restartGame() {
    console.log('Restarting game...');

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

    console.log('Game reset - ready to start again');
}

// Initialize restart buttons when page loads
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

    console.log('Restart buttons initialized');
});

/**
 * Start the game loop - runs 60 times per second
 * For now, we only draw (no movement)
 */
function startGameLoop() {
    console.log('Starting game loop...');

    gameInterval = setInterval(() => {
        // Update game state (movement, physics, collisions)
        world.update();

        // Draw everything on the canvas
        world.draw();
    }, FRAME_INTERVAL); // From constants.js: 1000/60 ≈ 16.67ms

    console.log('Game loop started! Character should be visible.');
}

/**
 * Stop the game loop
 * Useful for pause functionality
 */
function stopGameLoop() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
        console.log('Game loop stopped.');
    }
}
