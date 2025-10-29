// Main game script

// Global variables
let canvas;
let world;
let gameInterval;

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

    // Create world (this creates the character and all game objects)
    world = new World(canvas);

    // Start game loop
    startGameLoop();
}

/**
 * Start the game loop - runs 60 times per second
 * For now, we only draw (no movement)
 */
function startGameLoop() {
    console.log('Starting game loop...');

    gameInterval = setInterval(() => {
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
