// World - Game world that contains all objects

class World {
    canvas;
    ctx;
    keyboard;
    character;
    level; // Current level data (backgrounds, enemies, coins, etc.)
    cameraX = 0; // Camera X position (follows character)
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
        // Load level data (backgrounds, enemies, coins, etc.)
        this.level = level1;
        console.log('Level loaded with', this.level.backgroundObjects.length, 'background objects');

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

        // Update clouds (floating animation)
        this.level.clouds.forEach(cloud => {
            cloud.update();
        });

        // Update enemies (movement and animations)
        this.level.enemies.forEach(enemy => {
            enemy.update();
        });

        // Update camera to follow character
        this.updateCamera();
    }

    /**
     * Update camera position to follow character
     * Keeps character centered on screen (with small offset to show more ahead)
     */
    updateCamera() {
        // Camera follows character, keeping them at x=100 on screen
        // This means cameraX = character's world position - 100
        this.cameraX = this.character.xCoordinate - 100;

        // Don't let camera go below 0 (at start of level)
        if (this.cameraX < 0) {
            this.cameraX = 0;
        }
    }

    /**
     * Main drawing function - called every frame
     * Clears canvas and draws all objects
     */
    draw() {
        // Clear the entire canvas (remove previous frame)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Save context state before camera translation
        this.ctx.save();

        // Apply camera translation (moves everything left/right to follow character)
        this.ctx.translate(-this.cameraX, 0);

        // Draw background layers (furthest to closest)
        this.level.backgroundObjects.forEach(bg => {
            bg.draw(this.ctx);
        });

        // Draw clouds (in the sky, behind character)
        this.level.clouds.forEach(cloud => {
            cloud.draw(this.ctx);
        });

        // Draw enemies (on ground level, before character)
        this.level.enemies.forEach(enemy => {
            enemy.draw(this.ctx);
        });

        // Draw coins (collectibles at various heights)
        this.level.coins.forEach(coin => {
            coin.draw(this.ctx);
        });

        // Draw bottles (collectibles on ground)
        this.level.bottles.forEach(bottle => {
            bottle.draw(this.ctx);
        });

        // Draw character
        this.character.draw(this.ctx);

        // Draw hitboxes if debug mode
        if (this.debugMode) {
            // Draw enemy hitboxes
            this.level.enemies.forEach(enemy => {
                enemy.drawFrame(this.ctx);
            });
            // Draw character hitbox
            this.character.drawFrame(this.ctx);
        }

        // Restore context (remove camera translation)
        this.ctx.restore();

        // Draw UI elements (fixed to screen, not affected by camera)
        if (this.debugMode) {
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
