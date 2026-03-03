/**
 * @class Character
 * @extends MovableObject
 * @description The player character (Pepe) with movement, jumping, health, and animation states.
 */
class Character extends MovableObject {
    // #region Static Properties
    static WIDTH = 120;
    static HEIGHT = 280;
    static SPEED = 5;
    static JUMP_FORCE = 9;
    static MAX_HEALTH = 100;
    static DEFAULT_DAMAGE = 20;
    static IDLE_TIMEOUT = 5000;
    static START_X = 100;

    static COLLISION_OFFSET_X = 20;
    static COLLISION_OFFSET_Y = 100;
    static COLLISION_OFFSET_WIDTH = 20;
    static COLLISION_OFFSET_HEIGHT = 30;

    static IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    static IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    static IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    static IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    static IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    static IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    static AUDIO_JUMP = 'audio/sfx/jump.mp3';
    static AUDIO_HURT = 'audio/sfx/hurt.mp3';
    static AUDIO_SNORING = 'audio/sfx/snoring.mp3';

    static IMAGES_CACHE = {};
    // #endregion

    /**
     * Preloads all Character images into the class-level cache
     */
    static loadAllImages() {
        const allPaths = [
            ...Character.IMAGES_IDLE, ...Character.IMAGES_LONG_IDLE,
            ...Character.IMAGES_WALKING, ...Character.IMAGES_JUMPING,
            ...Character.IMAGES_HURT, ...Character.IMAGES_DEAD
        ];
        allPaths.forEach(p => { Character.IMAGES_CACHE[p] = getCachedImage(p); });
    }

    // #region Instance Fields
    keyboard;
    currentState = 'idle';
    lastActionTime = Date.now();
    spaceWasPressed = false;
    showDebugFrame = true;

    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL;
    lastAnimationState = '';

    health = Character.MAX_HEALTH;
    lastHitTime = 0;
    isDead = false;
    isSnoring = false;
    // #endregion

    /**
     * @param {Keyboard} keyboard - The keyboard input handler
     */
    constructor(keyboard) {
        super(Character.WIDTH, Character.HEIGHT, Character.SPEED);
        this.keyboard = keyboard;
        this.img = Character.IMAGES_CACHE[Character.IMAGES_IDLE[0]];
        this.xCoordinate = Character.START_X;
        this.yCoordinate = GROUND_LEVEL;
        this.collisionOffsetX = Character.COLLISION_OFFSET_X;
        this.collisionOffsetY = Character.COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = Character.COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = Character.COLLISION_OFFSET_HEIGHT;
    }

    // #region Update
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
        this.handleHorizontalMovement();
        this.handleJumpInput();
    }

    /**
     * Handle left/right movement input
     */
    handleHorizontalMovement() {
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
    }

    /**
     * Handle jump input with press-and-release detection
     */
    handleJumpInput() {
        if (this.keyboard.SPACE && !this.isJumping && !this.spaceWasPressed) {
            this.jump();
            this.lastActionTime = Date.now();
            this.spaceWasPressed = true;
            AudioManager.getInstance().playSFX(Character.AUDIO_JUMP);
        }
        if (!this.keyboard.SPACE) {
            this.spaceWasPressed = false;
        }
    }
    // #endregion

    // #region State Management
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
        if (Date.now() - this.lastActionTime > Character.IDLE_TIMEOUT) {
            this.currentState = 'longIdle';
            this.startSnoring();
        } else {
            this.currentState = 'idle';
        }
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
    hit(damage = Character.DEFAULT_DAMAGE) {
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
     * Start playing the snoring sound on loop
     */
    startSnoring() {
        if (this.isSnoring) return;
        this.isSnoring = true;
        const sound = AudioManager.getInstance().getSound(Character.AUDIO_SNORING);
        sound.loop = true;
        AudioManager.getInstance().playSFX(Character.AUDIO_SNORING);
    }

    /**
     * Stop the snoring sound
     */
    stopSnoring() {
        this.isSnoring = false;
        const sound = AudioManager.getInstance().getSound(Character.AUDIO_SNORING);
        sound.loop = false;
        sound.pause();
        sound.currentTime = 0;
    }
    // #endregion

    // #region Animation
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
            this.playJumpFrame(Character.IMAGES_JUMPING.length);
        } else if (this.currentState === 'dead') {
            this.playAnimation(Character.IMAGES_DEAD);
        } else if (this.currentState === 'hurt') {
            this.playAnimation(Character.IMAGES_HURT);
        } else if (this.currentState === 'walking') {
            this.playAnimation(Character.IMAGES_WALKING);
        } else if (this.currentState === 'longIdle') {
            this.playAnimation(Character.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(Character.IMAGES_IDLE);
        }
    }

    /**
     * Play a single jump frame, cycling through once then freezing on last
     * @param {number} totalFrames - Total number of jump animation frames
     */
    playJumpFrame(totalFrames) {
        const frameIndex = Math.min(this.currentImageIndex, totalFrames - 1);
        const path = Character.IMAGES_JUMPING[frameIndex];
        this.img = Character.IMAGES_CACHE[path];
        if (this.currentImageIndex < totalFrames - 1) {
            this.currentImageIndex++;
        }
    }
    // #endregion
}
