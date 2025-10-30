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

    // Initialize keyboard
    keyboard = new Keyboard();
    initKeyboardListeners();

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
