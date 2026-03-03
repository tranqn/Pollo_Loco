// Character - The player character (Pepe)

/**
 * @class Character
 * @extends MovableObject
 * @description The player character (Pepe) with movement, jumping, health, and animation states.
 */
class Character extends MovableObject {
    IMAGES_IDLE = [];
    IMAGES_LONG_IDLE = [];
    IMAGES_WALKING = [];
    IMAGES_JUMPING = [];
    IMAGES_HURT = [];
    IMAGES_DEAD = [];

    keyboard;
    currentState = 'idle'; // idle, walking, jumping, hurt, dead
    lastActionTime = Date.now();
    spaceWasPressed = false; // Track if space was pressed (for jump release detection)

    // Animation accumulator (replaces setInterval)
    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL;
    lastAnimationState = '';

    // Health system
    health = CHARACTER_MAX_HEALTH; // 100 HP
    lastHitTime = 0; // Track last time character was hit
    isDead = false;
    isSnoring = false;

    /**
     * Create the player character
     * @param {Keyboard} keyboard - The keyboard input handler
     */
    constructor(keyboard) {
        super(CHARACTER_WIDTH, CHARACTER_HEIGHT, CHARACTER_SPEED);

        this.keyboard = keyboard;

        // Load all animation images into cache
        this.loadImages(this.IMAGES_IDLE, IMAGES_CHARACTER_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE, IMAGES_CHARACTER_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING, IMAGES_CHARACTER_WALKING);
        this.loadImages(this.IMAGES_JUMPING, IMAGES_CHARACTER_JUMPING);
        this.loadImages(this.IMAGES_HURT, IMAGES_CHARACTER_HURT);
        this.loadImages(this.IMAGES_DEAD, IMAGES_CHARACTER_DEAD);

        // Set initial image (first frame of idle animation)
        this.img = this.IMAGES_CACHE[IMAGES_CHARACTER_IDLE[0]];

        // Set initial position
        this.xCoordinate = CHARACTER_START_X;
        this.yCoordinate = GROUND_LEVEL;  // Start on ground (180px)

        // Set collision box offsets for more accurate hitbox
        this.collisionOffsetX = CHARACTER_COLLISION_OFFSET_X;
        this.collisionOffsetY = CHARACTER_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = CHARACTER_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = CHARACTER_COLLISION_OFFSET_HEIGHT;
    }

    /**
     * Update character state (called every frame)
     * Handles movement, physics, state changes, and animation
     */
    update() {
        this.handleMovement();
        this.applyGravity();
        this.updateState();
        this.updateAnimation();
    }

    /**
     * Handle keyboard input for movement
     */
    handleMovement() {
        // Move right (can move to end of level)
        if (this.keyboard.RIGHT && this.xCoordinate < LEVEL_END_X - this.width) {
            this.moveRight();
            this.otherDirection = false; // Face right (default direction)
            this.lastActionTime = Date.now();
        }

        // Move left (can move to start of level)
        if (this.keyboard.LEFT && this.xCoordinate > 0) {
            this.moveLeft();
            this.otherDirection = true; // Face left (mirror image)
            this.lastActionTime = Date.now();
        }

        // Jump - only if space pressed AND was released before
        // This prevents "holding spacebar" from causing double jumps
        if (this.keyboard.SPACE && !this.isJumping && !this.spaceWasPressed) {
            this.jump();
            this.lastActionTime = Date.now();
            this.spaceWasPressed = true;
            AudioManager.getInstance().playSFX(AUDIO_SFX_JUMP);
        }

        // Reset when spacebar is released
        if (!this.keyboard.SPACE) {
            this.spaceWasPressed = false;
        }
    }

    /**
     * Update character state based on actions and health
     */
    updateState() {
        if (this.isDead) {
            this.currentState = 'dead';
        } else if (this.isHurt()) {
            this.currentState = 'hurt';
        } else if (this.isJumping) {
            this.currentState = 'jumping';
        } else if (this.keyboard.LEFT || this.keyboard.RIGHT) {
            this.currentState = 'walking';
        } else {
            if (Date.now() - this.lastActionTime > CHARACTER_IDLE_TIMEOUT) {
                this.currentState = 'longIdle';
                this.startSnoring();
            } else {
                this.currentState = 'idle';
            }
        }

        if (this.currentState !== 'longIdle' && this.isSnoring) {
            this.stopSnoring();
        }
    }

    /**
     * Advance animation frame using delta-time accumulator
     * Handles jump animation with separate speed and one-shot playback
     */
    updateAnimation() {
        if (this.lastAnimationState !== this.currentState && this.currentState === 'jumping') {
            this.currentImageIndex = 0;
            this.animationSpeed = ANIMATION_SPEED_JUMP;
            this.animationTimer = 0;
        } else if (this.lastAnimationState === 'jumping' && this.currentState !== 'jumping') {
            this.currentImageIndex = 0;
            this.animationSpeed = ANIMATION_SPEED_NORMAL;
            this.animationTimer = 0;
        }
        this.lastAnimationState = this.currentState;

        this.animationTimer += FRAME_INTERVAL;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationTimer -= this.animationSpeed;
            this.advanceFrame();
        }
    }

    /**
     * Advance to the next animation frame based on current state
     */
    advanceFrame() {
        if (this.currentState === 'jumping') {
            this.playJumpFrame(IMAGES_CHARACTER_JUMPING.length);
        } else if (this.currentState === 'dead') {
            this.playAnimation(IMAGES_CHARACTER_DEAD);
        } else if (this.currentState === 'hurt') {
            this.playAnimation(IMAGES_CHARACTER_HURT);
        } else if (this.currentState === 'walking') {
            this.playAnimation(IMAGES_CHARACTER_WALKING);
        } else if (this.currentState === 'longIdle') {
            this.playAnimation(IMAGES_CHARACTER_LONG_IDLE);
        } else {
            this.playAnimation(IMAGES_CHARACTER_IDLE);
        }
    }

    /**
     * Start playing the snoring sound on loop
     */
    startSnoring() {
        if (this.isSnoring) return;
        this.isSnoring = true;
        const sound = AudioManager.getInstance().getSound(AUDIO_SFX_SNORING);
        sound.loop = true;
        AudioManager.getInstance().playSFX(AUDIO_SFX_SNORING);
    }

    /**
     * Stop the snoring sound
     */
    stopSnoring() {
        this.isSnoring = false;
        const sound = AudioManager.getInstance().getSound(AUDIO_SFX_SNORING);
        sound.loop = false;
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Check if character is currently hurt (within damage cooldown)
     * @returns {boolean}
     */
    isHurt() {
        const timeSinceHit = Date.now() - this.lastHitTime;
        return timeSinceHit < HURT_DURATION;
    }

    /**
     * Character takes damage from enemy
     * @param {number} damage - Amount of damage to take
     * @returns {boolean} True if damage was applied
     */
    hit(damage = CHARACTER_DEFAULT_DAMAGE) {
        if (this.isDead) return false;

        if (!this.isHurt()) {
            this.health -= damage;
            this.lastHitTime = Date.now();

            if (this.health <= 0) {
                this.health = 0;
                this.isDead = true;
            }
            return true;
        }
        return false;
    }

    /**
     * Play a single jump frame, cycling through once then freezing on last
     * @param {number} totalFrames - Total number of jump animation frames
     */
    playJumpFrame(totalFrames) {
        const frameIndex = Math.min(this.currentImageIndex, totalFrames - 1);
        let path = IMAGES_CHARACTER_JUMPING[frameIndex];
        this.img = this.IMAGES_CACHE[path];

        if (this.currentImageIndex < totalFrames - 1) {
            this.currentImageIndex++;
        }
    }

    /**
     * Play an animation by cycling through frames
     * @param {Array} images - Array of image paths
     */
    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.IMAGES_CACHE[path];
        this.currentImageIndex++;
    }
}
