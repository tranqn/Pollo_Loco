// World - Game world that contains all objects

class World {
    canvas;
    ctx;
    keyboard;
    character;
    level; // Current level data (backgrounds, enemies, coins, etc.)
    cameraX = 0; // Camera X position (follows character)
    debugMode = true; // Enable debug helpers

    // Status bars (fixed to screen, not affected by camera)
    healthBar;
    coinBar;
    bottleBar;

    // Collectible counters
    coinsCollected = 0;
    bottlesCollected = 0;

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

        // Create status bars (positioned at top of screen)
        this.healthBar = new StatusBar(STATUSBAR_PADDING, STATUSBAR_PADDING, IMAGES_STATUSBAR_HEALTH);
        this.coinBar = new StatusBar(STATUSBAR_PADDING, STATUSBAR_PADDING + STATUSBAR_HEIGHT + 10, IMAGES_STATUSBAR_COIN);
        this.bottleBar = new StatusBar(STATUSBAR_PADDING, STATUSBAR_PADDING + (STATUSBAR_HEIGHT + 10) * 2, IMAGES_STATUSBAR_BOTTLE);

        // Set coin and bottle bars to 0% (player starts with none)
        this.coinBar.setPercentage(0);
        this.bottleBar.setPercentage(0);
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

        // Check all collisions
        this.checkCollisions();

        // Update camera to follow character
        this.updateCamera();
    }

    /**
     * Check all collisions between character and game objects
     */
    checkCollisions() {
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkEnemyCollisions();
    }

    /**
     * Check and handle enemy collisions
     * Player can defeat enemies by jumping on them from above
     * Or take damage when hitting them from the side
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                // Check if character is falling onto enemy from above
                // Character must be: falling (positive yVelocity) AND above enemy center
                const isFalling = this.character.yVelocity > 0;
                const isAboveEnemy = this.character.yCoordinate < enemy.yCoordinate + enemy.height / 2;

                if (isFalling && isAboveEnemy) {
                    // Success! Defeat the enemy
                    this.level.enemies.splice(index, 1);
                    console.log('Enemy defeated! Enemies remaining:', this.level.enemies.length);

                    // Make character bounce slightly
                    this.character.yVelocity = -ENEMY_BOUNCE_FORCE;
                } else {
                    // Hit from side or below - take damage
                    this.character.hit(20);
                    // Update health bar
                    this.healthBar.setPercentage(this.character.health);
                }
            }
        });
    }

    /**
     * Check and handle coin collisions
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                // Remove coin from array
                this.level.coins.splice(index, 1);

                // Increment counter and update status bar
                this.coinsCollected++;
                const coinPercentage = Math.min(100, (this.coinsCollected / 10) * 100); // 10 coins = 100%
                this.coinBar.setPercentage(coinPercentage);

                console.log('Coin collected! Total:', this.coinsCollected);
            }
        });
    }

    /**
     * Check and handle bottle collisions
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                // Remove bottle from array
                this.level.bottles.splice(index, 1);

                // Increment counter and update status bar
                this.bottlesCollected++;
                const bottlePercentage = Math.min(100, (this.bottlesCollected / 5) * 100); // 5 bottles = 100%
                this.bottleBar.setPercentage(bottlePercentage);

                console.log('Bottle collected! Total:', this.bottlesCollected);
            }
        });
    }

    /**
     * Update camera position to follow character
     * Keeps character centered on screen (with small offset to show more ahead)
     * Camera is constrained to not show areas outside the visible backgrounds
     */
    updateCamera() {
        // Camera follows character, keeping them at x=100 on screen
        // This means cameraX = character's world position - 100
        this.cameraX = this.character.xCoordinate - 100;

        // Constrain camera to level boundaries (don't show outside backgrounds)
        // Min: 0 (at start of level)
        if (this.cameraX < 0) {
            this.cameraX = 0;
        }

        // Max: CAMERA_MAX_X (at end of level)
        // When camera is at max, right edge of screen aligns with level end
        if (this.cameraX > CAMERA_MAX_X) {
            this.cameraX = CAMERA_MAX_X;
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

        // Draw status bars (fixed to screen, not affected by camera)
        this.healthBar.draw(this.ctx);
        this.coinBar.draw(this.ctx);
        this.bottleBar.draw(this.ctx);

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
        this.ctx.fillRect(5, 5, 280, 110);

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

        // Draw health
        const healthColor = this.character.health > 50 ? '#00ff00' : this.character.health > 20 ? 'orange' : 'red';
        this.ctx.fillStyle = healthColor;
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillText(`Health: ${this.character.health} HP`, 10, 70);

        // Draw instructions
        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Debug Mode: ON', 10, 90);
        this.ctx.fillText('Red box = hitbox', 10, 105);

        this.ctx.restore();
    }
}
