// World - Game world that contains all objects

/**
 * @class World
 * @description Main game world that manages all game objects, state, collisions, and rendering.
 */
class World {
    canvas;
    ctx;
    keyboard;
    character;
    level;
    cameraX = 0;
    debugMode = false;

    // Status bars
    healthBar;
    coinBar;
    bottleBar;
    endbossBar;

    // Collectible counters
    coinsCollected = 0;
    bottlesCollected = 0;

    // Throwable objects
    thrownBottles = [];
    lastThrowTime = 0;

    // Game state
    isGameOver = false;

    // Cached references
    endboss = null;

    // Delegates
    renderer;
    collisionHandler;

    /**
     * Create the game world
     * @param {HTMLCanvasElement} canvas - The canvas element
     * @param {Keyboard} keyboard - The keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.initializeGame();
    }

    /**
     * Initialize game objects and delegates
     */
    initializeGame() {
        this.level = level1;
        this.character = new Character(this.keyboard);
        this.endboss = this.level.enemies.find(e => e instanceof Endboss) || null;
        this.createStatusBars();
        this.renderer = new WorldRenderer(this);
        this.collisionHandler = new CollisionHandler(this);
        AudioManager.getInstance().playSFX(AUDIO_SFX_SWOOSH);
        AudioManager.getInstance().playMusic(AUDIO_MUSIC_BG);
    }

    /**
     * Create and configure all status bars
     */
    createStatusBars() {
        this.healthBar = new StatusBar(STATUSBAR_PADDING, 10, IMAGES_STATUSBAR_HEALTH);
        this.coinBar = new StatusBar(STATUSBAR_PADDING + STATUSBAR_WIDTH + 10, 10, IMAGES_STATUSBAR_COIN);
        this.bottleBar = new StatusBar(STATUSBAR_PADDING, 10 + STATUSBAR_HEIGHT + 5, IMAGES_STATUSBAR_BOTTLE);

        const endbossBarX = CANVAS_WIDTH - STATUSBAR_WIDTH - STATUSBAR_PADDING;
        this.endbossBar = new StatusBar(endbossBarX, 10, IMAGES_STATUSBAR_ENDBOSS);
        this.endbossBar.setPercentage(100);

        this.coinBar.setPercentage(0);
        this.bottleBar.setPercentage(0);
    }

    /**
     * Update game state - called every frame
     */
    update() {
        if (this.character.isDead) {
            this.gameOver();
            return;
        }

        const endboss = this.getEndboss();
        if (endboss && endboss.deathAnimationComplete) {
            this.victory();
            return;
        }

        this.character.update();
        this.handleThrow();
        this.level.clouds.forEach(cloud => cloud.update());
        this.level.enemies.forEach(enemy => {
            if (enemy === this.endboss) {
                enemy.characterX = this.character.xCoordinate;
            }
            enemy.update();
        });
        this.level.coins.forEach(coin => coin.update());
        this.updateThrownBottles();
        this.collisionHandler.checkCollisions();
        this.updateCamera();
    }

    /**
     * Draw all game objects - called every frame
     */
    draw() {
        this.renderer.draw();
    }

    /**
     * Get the endboss from the enemies array
     * @returns {Endboss|null}
     */
    getEndboss() {
        return this.endboss;
    }

    /**
     * Check if Endboss is visible on screen
     * @returns {boolean}
     */
    isEndbossVisible() {
        const endboss = this.getEndboss();
        if (!endboss) return false;

        return endboss.xCoordinate > this.cameraX - ENDBOSS_VISIBILITY_BUFFER &&
               endboss.xCoordinate < this.cameraX + CANVAS_WIDTH + ENDBOSS_VISIBILITY_BUFFER;
    }

    /**
     * Handle game over - stop game and show game over screen
     */
    gameOver() {
        if (this.isGameOver) return;
        this.isGameOver = true;
        AudioManager.getInstance().stopMusic();
        AudioManager.getInstance().playSFX(AUDIO_MUSIC_GAMEOVER);

        if (typeof stopGameLoop === 'function') {
            stopGameLoop();
        }

        this.endScreenTimeout = setTimeout(() => {
            if (!this.isGameOver) return;
            this.setRandomScreenImage(DOM.gameoverBg, IMAGES_GAME_OVER);
            if (DOM.gameoverScreen) {
                DOM.gameoverScreen.classList.remove('hidden');
            }
        }, GAMEOVER_DELAY);
    }

    /**
     * Handle victory - stop game and show victory screen
     */
    victory() {
        if (this.isGameOver) return;
        this.isGameOver = true;
        AudioManager.getInstance().stopMusic();
        AudioManager.getInstance().playSFX(AUDIO_SFX_VICTORY);

        if (typeof stopGameLoop === 'function') {
            stopGameLoop();
        }

        this.endScreenTimeout = setTimeout(() => {
            if (!this.isGameOver) return;
            this.setRandomScreenImage(DOM.winBg, IMAGES_WIN_SCREEN);
            if (DOM.winScreen) {
                DOM.winScreen.classList.remove('hidden');
            }
        }, VICTORY_DELAY);
    }

    /**
     * Set a random image from an array on an img element
     * @param {HTMLImageElement} imgElement - The img element
     * @param {Array} images - Array of image paths to pick from
     */
    setRandomScreenImage(imgElement, images) {
        if (imgElement && images.length > 0) {
            imgElement.src = images[Math.floor(Math.random() * images.length)];
        }
    }

    /**
     * Handle bottle throwing when 'D' key is pressed
     */
    handleThrow() {
        const now = Date.now();

        if (this.keyboard.D && this.bottlesCollected > 0 && now - this.lastThrowTime > THROW_COOLDOWN) {
            const throwX = this.character.xCoordinate + (this.character.otherDirection ? 0 : this.character.width);
            const throwY = this.character.yCoordinate + THROW_HAND_LEVEL;
            const direction = this.character.otherDirection ? -1 : 1;

            const bottle = new ThrowableObject(throwX, throwY, direction);
            this.thrownBottles.push(bottle);
            AudioManager.getInstance().playSFX(AUDIO_SFX_BOTTLE_THROW);

            this.bottlesCollected--;
            const bottlePercentage = Math.min(100, (this.bottlesCollected / ITEMS_PER_FULL_BAR) * 100);
            this.bottleBar.setPercentage(bottlePercentage);

            this.lastThrowTime = now;
        }
    }

    /**
     * Update all thrown bottles (physics and animations)
     */
    updateThrownBottles() {
        this.thrownBottles.forEach(bottle => bottle.update());
        this.thrownBottles = this.thrownBottles.filter(bottle => !bottle.markForRemoval);
    }

    /**
     * Update camera position to follow character
     */
    updateCamera() {
        this.cameraX = this.character.xCoordinate - CAMERA_OFFSET_X;

        if (this.cameraX < 0) {
            this.cameraX = 0;
        }
        if (this.cameraX > CAMERA_MAX_X) {
            this.cameraX = CAMERA_MAX_X;
        }
    }
}
