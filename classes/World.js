// World - Game world that contains all objects

class World {
    canvas;
    ctx;
    keyboard;
    character;
    debugMode = true; // Enable debug helpers

    // FPS tracking
    fps = 0;
    frameCount = 0;
    lastFpsUpdate = Date.now();

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d'); // Get 2D drawing context
        this.keyboard = keyboard;
        this.initializeGame();
    }

    /**
     * Initialize game objects
     */
    initializeGame() {
        // Create player character and pass keyboard
        this.character = new Character(this.keyboard);
        console.log('Character created at:', this.character.xCoordinate, this.character.yCoordinate);
    }

    /**
     * Update game state - called every frame
     * Updates positions, physics, animations
     */
    update() {
        // Update character (movement, animations, physics)
        this.character.update();
    }

    /**
     * Main drawing function - called every frame
     * Clears canvas and draws all objects
     */
    draw() {
        // Clear the entire canvas (remove previous frame)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw character
        this.character.draw(this.ctx);

        // Draw debug helpers if enabled
        if (this.debugMode) {
            this.character.drawFrame(this.ctx);
            this.updateFPS();
            this.drawDebugInfo();
        }
    }

    /**
     * Update FPS counter
     */
    updateFPS() {
        this.frameCount++;
        const now = Date.now();

        // Update FPS every second
        if (now - this.lastFpsUpdate >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsUpdate = now;
        }
    }

    /**
     * Draw debug information (FPS, positions, etc.)
     */
    drawDebugInfo() {
        this.ctx.save();

        // Draw semi-transparent background for debug info
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(5, 5, 280, 90);

        // Draw FPS
        this.ctx.fillStyle = '#00ff00'; // Green
        this.ctx.font = 'bold 18px Arial';
        this.ctx.fillText(`FPS: ${this.fps}`, 10, 25);

        // Draw character position
        this.ctx.fillStyle = 'yellow';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(
            `Character: (${Math.round(this.character.xCoordinate)}, ${Math.round(this.character.yCoordinate)})`,
            10,
            50
        );

        // Draw instructions
        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Debug Mode: ON', 10, 70);
        this.ctx.fillText('Red box = hitbox', 10, 88);

        this.ctx.restore();
    }
}
