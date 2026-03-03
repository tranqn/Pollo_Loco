/**
 * @class World
 * @description Main game world that manages all game objects, state, collisions, and rendering.
 */
class World {
    // #region Static Properties
    static CAMERA_OFFSET_X = 100;
    static CAMERA_MAX_X = LEVEL_END_X - CANVAS_WIDTH;
    static THROW_COOLDOWN = 500;
    static THROW_HAND_LEVEL = 170;
    static THROW_INITIAL_VELOCITY = -25;
    static ITEMS_PER_FULL_BAR = 5;
    static GAMEOVER_DELAY = 1000;
    static VICTORY_DELAY = 1500;
    static ENDBOSS_VISIBILITY_BUFFER = 100;

    static IMAGES_GAME_OVER = [
        'img/game_result_screens/you_lost.png',
        'img/game_result_screens/game_over.png',
        'img/You won, you lost/You lost.png',
        'img/You won, you lost/You lost b.png',
        'img/You won, you lost/Game Over.png',
        'img/You won, you lost/Game over A.png'
    ];

    static IMAGES_WIN_SCREEN = [
        'img/game_result_screens/you_won_b.png',
        'img/game_result_screens/you_win_b.png',
        'img/You won, you lost/You Won B.png',
        'img/You won, you lost/You win B.png',
        'img/You won, you lost/You won A.png',
        'img/You won, you lost/You Win A.png'
    ];

    static AUDIO_MUSIC_BG = 'audio/music/game-theme.mp3';
    static AUDIO_MUSIC_GAMEOVER = 'audio/music/game-over-new.mp3';
    static AUDIO_SFX_VICTORY = 'audio/sfx/victory-new.mp3';
    // #endregion

    // #region Instance Fields
    canvas;
    ctx;
    keyboard;
    character;
    level;
    cameraX = 0;
    debugMode = false;

    healthBar;
    coinBar;
    bottleBar;
    endbossBar;

    coinsCollected = 0;
    bottlesCollected = 0;

    thrownBottles = [];
    lastThrowTime = 0;

    isGameOver = false;
    endboss = null;

    renderer;
    collisionHandler;
    // #endregion

    /**
     * @param {HTMLCanvasElement} canvas - The canvas element
     * @param {Keyboard} keyboard - The keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.initializeGame();
    }

    // #region Constructor & Init
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
        AudioManager.getInstance().playSFX(ThrowableObject.AUDIO_SWOOSH);
        AudioManager.getInstance().playMusic(World.AUDIO_MUSIC_BG);
    }

    /**
     * Create and configure all status bars
     */
    createStatusBars() {
        this.healthBar = new StatusBar(StatusBar.PADDING, 10, StatusBar.IMAGES_HEALTH);
        this.coinBar = new StatusBar(StatusBar.PADDING + StatusBar.WIDTH + 10, 10, StatusBar.IMAGES_COIN);
        this.bottleBar = new StatusBar(StatusBar.PADDING, 10 + StatusBar.HEIGHT + 5, StatusBar.IMAGES_BOTTLE);

        const endbossBarX = CANVAS_WIDTH - StatusBar.WIDTH - StatusBar.PADDING;
        this.endbossBar = new StatusBar(endbossBarX, 10, StatusBar.IMAGES_ENDBOSS);
        this.endbossBar.setPercentage(100);

        this.coinBar.setPercentage(0);
        this.bottleBar.setPercentage(0);
    }
    // #endregion

    // #region Game Loop
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

        return endboss.xCoordinate > this.cameraX - World.ENDBOSS_VISIBILITY_BUFFER &&
               endboss.xCoordinate < this.cameraX + CANVAS_WIDTH + World.ENDBOSS_VISIBILITY_BUFFER;
    }
    // #endregion

    // #region Game State
    /**
     * Handle game over - stop game and show game over screen
     */
    gameOver() {
        if (this.isGameOver) return;
        this.isGameOver = true;
        AudioManager.getInstance().stopMusic();
        AudioManager.getInstance().playSFX(World.AUDIO_MUSIC_GAMEOVER);

        if (typeof stopGameLoop === 'function') {
            stopGameLoop();
        }

        this.endScreenTimeout = setTimeout(() => {
            if (!this.isGameOver) return;
            this.setRandomScreenImage(DOM.gameoverBg, World.IMAGES_GAME_OVER);
            if (DOM.gameoverScreen) {
                DOM.gameoverScreen.classList.remove('hidden');
            }
        }, World.GAMEOVER_DELAY);
    }

    /**
     * Handle victory - stop game and show victory screen
     */
    victory() {
        if (this.isGameOver) return;
        this.isGameOver = true;
        AudioManager.getInstance().stopMusic();
        AudioManager.getInstance().playSFX(World.AUDIO_SFX_VICTORY);

        if (typeof stopGameLoop === 'function') {
            stopGameLoop();
        }

        this.endScreenTimeout = setTimeout(() => {
            if (!this.isGameOver) return;
            this.setRandomScreenImage(DOM.winBg, World.IMAGES_WIN_SCREEN);
            if (DOM.winScreen) {
                DOM.winScreen.classList.remove('hidden');
            }
        }, World.VICTORY_DELAY);
    }

    /**
     * Set a random image from an array on an img element
     * @param {HTMLImageElement} imgElement - The img element
     * @param {Array<string>} images - Array of image paths to pick from
     */
    setRandomScreenImage(imgElement, images) {
        if (imgElement && images.length > 0) {
            imgElement.src = images[Math.floor(Math.random() * images.length)];
        }
    }
    // #endregion

    // #region Throwing
    /**
     * Handle bottle throwing when 'D' key is pressed
     */
    handleThrow() {
        const now = Date.now();
        if (!this.canThrow(now)) return;

        const throwX = this.character.xCoordinate + (this.character.otherDirection ? 0 : this.character.width);
        const throwY = this.character.yCoordinate + World.THROW_HAND_LEVEL;
        const direction = this.character.otherDirection ? -1 : 1;

        this.spawnThrowableBottle(throwX, throwY, direction);
        this.updateBottleBarAfterThrow();
        this.lastThrowTime = now;
    }

    /**
     * Check if the player can throw a bottle right now
     * @param {number} now - Current timestamp
     * @returns {boolean}
     */
    canThrow(now) {
        return this.keyboard.D && this.bottlesCollected > 0 && now - this.lastThrowTime > World.THROW_COOLDOWN;
    }

    /**
     * Create and add a throwable bottle to the world
     * @param {number} x - Throw X position
     * @param {number} y - Throw Y position
     * @param {number} direction - 1 for right, -1 for left
     */
    spawnThrowableBottle(x, y, direction) {
        const bottle = new ThrowableObject(x, y, direction);
        this.thrownBottles.push(bottle);
        AudioManager.getInstance().playSFX(ThrowableObject.AUDIO_THROW);
    }

    /**
     * Decrease bottle count and update the status bar
     */
    updateBottleBarAfterThrow() {
        this.bottlesCollected--;
        const bottlePercentage = Math.min(100, (this.bottlesCollected / World.ITEMS_PER_FULL_BAR) * 100);
        this.bottleBar.setPercentage(bottlePercentage);
    }

    /**
     * Update all thrown bottles (physics and animations)
     */
    updateThrownBottles() {
        this.thrownBottles.forEach(bottle => bottle.update());
        this.thrownBottles = this.thrownBottles.filter(bottle => !bottle.markForRemoval);
    }
    // #endregion

    // #region Camera
    /**
     * Update camera position to follow character
     */
    updateCamera() {
        this.cameraX = this.character.xCoordinate - World.CAMERA_OFFSET_X;
        if (this.cameraX < 0) {
            this.cameraX = 0;
        }
        if (this.cameraX > World.CAMERA_MAX_X) {
            this.cameraX = World.CAMERA_MAX_X;
        }
    }
    // #endregion
}
