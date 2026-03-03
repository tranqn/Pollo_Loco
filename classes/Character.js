/**
 * @class Character
 * @extends MovableObject
 * @description The player character (Pepe) with movement, jumping, health, and animation states.
 */
class Character extends MovableObject {
    static IMAGES_CACHE = {};

    /**
     * Preloads all Character images into the class-level cache
     */
    static loadAllImages() {
        const allPaths = [
            ...IMAGES_CHARACTER_IDLE, ...IMAGES_CHARACTER_LONG_IDLE,
            ...IMAGES_CHARACTER_WALKING, ...IMAGES_CHARACTER_JUMPING,
            ...IMAGES_CHARACTER_HURT, ...IMAGES_CHARACTER_DEAD
        ];
        allPaths.forEach(p => { Character.IMAGES_CACHE[p] = getCachedImage(p); });
    }

    keyboard;
    currentState = 'idle';
    lastActionTime = Date.now();
    spaceWasPressed = false;
    showDebugFrame = true;

    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL;
    lastAnimationState = '';

    health = CHARACTER_MAX_HEALTH;
    lastHitTime = 0;
    isDead = false;
    isSnoring = false;

    /**
     * @param {Keyboard} keyboard - The keyboard input handler
     */
    constructor(keyboard) {
        super(CHARACTER_WIDTH, CHARACTER_HEIGHT, CHARACTER_SPEED);
        this.keyboard = keyboard;
        this.img = Character.IMAGES_CACHE[IMAGES_CHARACTER_IDLE[0]];
        this.xCoordinate = CHARACTER_START_X;
        this.yCoordinate = GROUND_LEVEL;
        this.collisionOffsetX = CHARACTER_COLLISION_OFFSET_X;
        this.collisionOffsetY = CHARACTER_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = CHARACTER_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = CHARACTER_COLLISION_OFFSET_HEIGHT;
    }

    /**
     * Update character state (called every frame)
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
        if (this.keyboard.RIGHT && this.xCoordinate < LEVEL_END_X - this.width) {
            this.moveRight();
            this.otherDirection = false;
            this.lastActionTime = Date.now();
        }

        if (this.keyboard.LEFT && this.xCoordinate > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastActionTime = Date.now();
        }

        if (this.keyboard.SPACE && !this.isJumping && !this.spaceWasPressed) {
            this.jump();
            this.lastActionTime = Date.now();
            this.spaceWasPressed = true;
            AudioManager.getInstance().playSFX(AUDIO_SFX_JUMP);
        }

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
            this.resolveIdleState();
        }

        if (this.currentState !== 'longIdle' && this.isSnoring) {
            this.stopSnoring();
        }
    }

    /**
     * Determine whether to play idle or long idle animation
     */
    resolveIdleState() {
        if (Date.now() - this.lastActionTime > CHARACTER_IDLE_TIMEOUT) {
            this.currentState = 'longIdle';
            this.startSnoring();
        } else {
            this.currentState = 'idle';
        }
    }

    /**
     * Advance animation frame using delta-time accumulator
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
        const path = IMAGES_CHARACTER_JUMPING[frameIndex];
        this.img = Character.IMAGES_CACHE[path];
        if (this.currentImageIndex < totalFrames - 1) {
            this.currentImageIndex++;
        }
    }
}
