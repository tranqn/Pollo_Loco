// World - Game world that contains all objects

class World {
    canvas;
    ctx;
    keyboard;
    character;
    level; // Current level data (backgrounds, enemies, coins, etc.)
    cameraX = 0; // Camera X position (follows character)
    debugMode = false; // Enable debug helpers (set to true to see hitboxes and FPS)

    // Status bars (fixed to screen, not affected by camera)
    healthBar;
    coinBar;
    bottleBar;
    endbossBar;

    // Collectible counters
    coinsCollected = 0;
    bottlesCollected = 0;

    // Throwable objects
    thrownBottles = [];
    lastThrowTime = 0; // Track last throw time (cooldown)

    // Game state
    isGameOver = false;

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

        // DEBUG: Log enemy types at initialization
        console.log('=== LEVEL INITIALIZED ===');
        this.level.enemies.forEach((enemy, idx) => {
            const type = enemy instanceof Endboss ? 'Endboss' : (enemy instanceof SmallChicken ? 'SmallChicken' : (enemy instanceof Chicken ? 'Chicken' : 'Unknown'));
            console.log(`  ${idx}: ${type} at x=${Math.round(enemy.xCoordinate)}`);
        });
        console.log('=========================');

        // Create player character and pass keyboard
        this.character = new Character(this.keyboard);

        // Create status bars (positioned at top of screen)
        this.healthBar = new StatusBar(STATUSBAR_PADDING, STATUSBAR_PADDING, IMAGES_STATUSBAR_HEALTH);
        this.coinBar = new StatusBar(STATUSBAR_PADDING, STATUSBAR_PADDING + STATUSBAR_HEIGHT + 10, IMAGES_STATUSBAR_COIN);
        this.bottleBar = new StatusBar(STATUSBAR_PADDING, STATUSBAR_PADDING + (STATUSBAR_HEIGHT + 10) * 2, IMAGES_STATUSBAR_BOTTLE);

        // Create Endboss health bar (centered at top, initially at 100%)
        const endbossBarX = (CANVAS_WIDTH - STATUSBAR_WIDTH) / 2; // Center horizontally
        this.endbossBar = new StatusBar(endbossBarX, STATUSBAR_PADDING, IMAGES_STATUSBAR_ENDBOSS);
        this.endbossBar.setPercentage(100); // Endboss starts at full health

        // Set coin and bottle bars to 0% (player starts with none)
        this.coinBar.setPercentage(0);
        this.bottleBar.setPercentage(0);
    }

    /**
     * Update game state - called every frame
     * Updates positions, physics, animations
     */
    update() {
        // Check if character died
        if (this.character.isDead) {
            this.gameOver();
            return; // Stop updating
        }

        // Check if player won (defeated endboss)
        const endboss = this.getEndboss();
        if (endboss && endboss.isDead) {
            this.victory();
            return; // Stop updating
        }

        // Update character (movement, animations, physics)
        this.character.update();

        // Handle bottle throwing
        this.handleThrow();

        // Update clouds (floating animation)
        this.level.clouds.forEach(cloud => {
            cloud.update();
        });

        // Update enemies (movement and animations)
        this.level.enemies.forEach(enemy => {
            enemy.update();
        });

        // Update thrown bottles
        this.updateThrownBottles();

        // Check all collisions
        this.checkCollisions();

        // Update camera to follow character
        this.updateCamera();
    }

    /**
     * Get the endboss from the enemies array
     * @returns {Endboss|null} - The endboss or null if not found
     */
    getEndboss() {
        return this.level.enemies.find(enemy => enemy instanceof Endboss);
    }

    /**
     * Check if Endboss is visible on screen
     * @returns {boolean} - True if Endboss is within camera view
     */
    isEndbossVisible() {
        const endboss = this.getEndboss();
        if (!endboss) return false;

        // Check if Endboss x position is within camera view (with small buffer)
        const buffer = 100; // Show bar slightly before Endboss appears
        return endboss.xCoordinate > this.cameraX - buffer &&
               endboss.xCoordinate < this.cameraX + CANVAS_WIDTH + buffer;
    }

    /**
     * Handle game over - stop game and show game over screen
     */
    gameOver() {
        // Prevent multiple game over triggers
        if (this.isGameOver) return;
        this.isGameOver = true;

        // Stop the game loop (defined in script.js)
        if (typeof stopGameLoop === 'function') {
            stopGameLoop();
        }

        // Show game over screen after a short delay (let death animation play)
        setTimeout(() => {
            const gameOverScreen = document.getElementById('gameover-screen');
            if (gameOverScreen) {
                gameOverScreen.classList.remove('hidden');
            }
        }, 1000); // 1 second delay
    }

    /**
     * Handle victory - stop game and show victory screen
     */
    victory() {
        // Prevent multiple victory triggers
        if (this.isGameOver) return; // Reuse flag to prevent multiple end screens
        this.isGameOver = true;

        // Stop the game loop (defined in script.js)
        if (typeof stopGameLoop === 'function') {
            stopGameLoop();
        }

        // Show victory screen after a short delay (let death animation play)
        setTimeout(() => {
            const winScreen = document.getElementById('win-screen');
            if (winScreen) {
                winScreen.classList.remove('hidden');
            }
        }, 1500); // 1.5 second delay
    }

    /**
     * Handle bottle throwing when 'D' key is pressed
     */
    handleThrow() {
        const now = Date.now();
        const throwCooldown = 500; // 500ms between throws

        // Check if player pressed 'D', has bottles, and cooldown expired
        if (this.keyboard.D && this.bottlesCollected > 0 && now - this.lastThrowTime > throwCooldown) {
            // Create throwable bottle at character position
            const throwX = this.character.xCoordinate + (this.character.otherDirection ? 0 : this.character.width);
            const throwY = this.character.yCoordinate + 170; // Throw from hand level (bottom quarter of sprite)
            const direction = this.character.otherDirection ? -1 : 1; // Throw in facing direction

            const bottle = new ThrowableObject(throwX, throwY, direction);
            this.thrownBottles.push(bottle);

            // Decrease bottle count and update status bar
            this.bottlesCollected--;
            const bottlePercentage = Math.min(100, (this.bottlesCollected / 10) * 100);
            this.bottleBar.setPercentage(bottlePercentage);

            this.lastThrowTime = now;
        }
    }

    /**
     * Update all thrown bottles (physics and animations)
     */
    updateThrownBottles() {
        // Update each bottle
        this.thrownBottles.forEach(bottle => {
            bottle.update();
        });

        // Remove bottles marked for removal (after splash animation)
        this.thrownBottles = this.thrownBottles.filter(bottle => !bottle.markForRemoval);
    }

    /**
     * Check all collisions between character and game objects
     */
    checkCollisions() {
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkEnemyCollisions();
        this.checkBottleEnemyCollisions();
    }

    /**
     * Check and handle enemy collisions
     * Player can defeat enemies by jumping on them from above
     * Or take damage when hitting them from the side
     */
    checkEnemyCollisions() {
        // Iterate backwards to safely remove enemies during iteration
        // When we splice during forEach, indices shift and enemies get skipped
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.level.enemies[i];

            if (this.character.isColliding(enemy)) {
                const enemyType = enemy instanceof Endboss ? 'Endboss' : (enemy instanceof SmallChicken ? 'SmallChicken' : 'Chicken');
                console.log(`[COLLISION] Type: ${enemyType}, Falling: ${this.character.yVelocity > 0}, yVel: ${this.character.yVelocity.toFixed(2)}`);
                // Check if character is falling onto enemy from above
                // Character must be: falling (positive yVelocity) AND character's bottom is above enemy's center
                const isFalling = this.character.yVelocity > 0;

                // Use collision box positions for accurate detection
                const characterBottom = this.character.yCoordinate + this.character.height - this.character.collisionOffsetHeight;
                const enemyCollisionTop = enemy.yCoordinate + enemy.collisionOffsetY;
                const enemyCollisionHeight = enemy.height - enemy.collisionOffsetY - enemy.collisionOffsetHeight;
                const enemyCollisionCenter = enemyCollisionTop + enemyCollisionHeight / 2;

                // Use <= to handle edge case where character bottom equals enemy center
                const isAboveEnemy = characterBottom <= enemyCollisionCenter;

                if (isFalling && isAboveEnemy && !(enemy instanceof Endboss)) {
                    // Success! Defeat the enemy (but not Endboss)
                    this.level.enemies.splice(i, 1);
                    console.log(`[ACTION] Enemy defeated! ${this.level.enemies.length} enemies remaining.`);

                    // Make character bounce slightly
                    this.character.yVelocity = -ENEMY_BOUNCE_FORCE;
                } else if (isFalling && isAboveEnemy && enemy instanceof Endboss) {
                    // Jumping on Endboss just makes character bounce (no damage to boss)
                    console.log(`[ACTION] Bounced off Endboss`);
                    this.character.yVelocity = -ENEMY_BOUNCE_FORCE;
                } else {
                    // Hit from side or below - take damage (5 damage per hit)
                    console.log(`[ACTION] Character took ${ENEMY_DAMAGE} damage (Health: ${this.character.health})`);
                    this.character.hit(ENEMY_DAMAGE);
                    // Update health bar
                    this.healthBar.setPercentage(this.character.health);
                }
            }
        }
    }

    /**
     * Check and handle bottle-enemy collisions
     * Thrown bottles damage and kill enemies
     */
    checkBottleEnemyCollisions() {
        this.thrownBottles.forEach(bottle => {
            // Skip if bottle is already splashing
            if (bottle.isSplashing) return;

            // Iterate backwards to safely remove enemies during iteration
            for (let i = this.level.enemies.length - 1; i >= 0; i--) {
                const enemy = this.level.enemies[i];

                if (bottle.isColliding(enemy)) {
                    // Bottle hit enemy - splash
                    bottle.splash();

                    // Check if enemy is Endboss (has hit method)
                    if (enemy instanceof Endboss) {
                        // Damage the boss (doesn't die instantly)
                        enemy.hit(THROWABLE_DAMAGE);
                        // Update Endboss health bar
                        this.endbossBar.setPercentage(enemy.health);
                    } else {
                        // Regular enemy (Chicken) - dies instantly
                        this.level.enemies.splice(i, 1);
                    }
                }
            }
        });
    }

    /**
     * Check and handle coin collisions
     */
    checkCoinCollisions() {
        // Iterate backwards to safely remove coins during iteration
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            const coin = this.level.coins[i];

            if (this.character.isColliding(coin)) {
                // Remove coin from array
                this.level.coins.splice(i, 1);

                // Increment counter and update status bar
                this.coinsCollected++;
                const coinPercentage = Math.min(100, (this.coinsCollected / 10) * 100); // 10 coins = 100%
                this.coinBar.setPercentage(coinPercentage);
            }
        }
    }

    /**
     * Check and handle bottle collisions
     */
    checkBottleCollisions() {
        // Iterate backwards to safely remove bottles during iteration
        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            const bottle = this.level.bottles[i];

            if (this.character.isColliding(bottle)) {
                // Remove bottle from array
                this.level.bottles.splice(i, 1);

                // Increment counter and update status bar
                this.bottlesCollected++;
                const bottlePercentage = Math.min(100, (this.bottlesCollected / 10) * 100); // 10 bottles = 100%
                this.bottleBar.setPercentage(bottlePercentage);
            }
        }
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

        // Draw thrown bottles (flying projectiles)
        this.thrownBottles.forEach(bottle => {
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

        // Draw Endboss health bar only when Endboss is visible
        if (this.isEndbossVisible()) {
            this.endbossBar.draw(this.ctx);
        }

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
