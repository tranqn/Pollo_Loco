/**
 * @class ThrowableObject
 * @extends MovableObject
 * @description A bottle that can be thrown at enemies, following a parabolic arc with rotation and splash animations.
 */
class ThrowableObject extends MovableObject {
    static SPEED = 15;
    static THROW_GRAVITY = 2;
    static DAMAGE = 20;

    static COLLISION_OFFSET_X = 5;
    static COLLISION_OFFSET_Y = 5;
    static COLLISION_OFFSET_WIDTH = 5;
    static COLLISION_OFFSET_HEIGHT = 5;

    static IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    static IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    static AUDIO_SWOOSH = 'audio/sfx/swoosh.mp3';
    static AUDIO_BREAK = 'audio/sfx/bottle-break.mp3';
    static AUDIO_THROW = 'audio/sfx/bottle-throw.mp3';

    static IMAGES_CACHE = {};

    /**
     * Preloads all ThrowableObject images into the class-level cache
     */
    static loadAllImages() {
        [...ThrowableObject.IMAGES_ROTATION, ...ThrowableObject.IMAGES_SPLASH].forEach(p => {
            ThrowableObject.IMAGES_CACHE[p] = getCachedImage(p);
        });
    }

    throwDirection = 1;
    isSplashing = false;
    hasHit = false;
    splashStartTime = 0;

    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_FAST;

    /**
     * @param {number} x - Starting X position
     * @param {number} y - Starting Y position
     * @param {number} direction - Throw direction (1 = right, -1 = left)
     */
    constructor(x, y, direction) {
        super(Bottle.WIDTH, Bottle.HEIGHT, ThrowableObject.SPEED);
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.throwDirection = direction;
        this.img = getCachedImage(ThrowableObject.IMAGES_ROTATION[0]);
        this.collisionOffsetX = ThrowableObject.COLLISION_OFFSET_X;
        this.collisionOffsetY = ThrowableObject.COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = ThrowableObject.COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = ThrowableObject.COLLISION_OFFSET_HEIGHT;
        this.throw();
    }

    /**
     * Sets initial velocity for throwing arc
     */
    throw() {
        this.yVelocity = World.THROW_INITIAL_VELOCITY;
    }

    /**
     * Update bottle position, physics, and animation
     */
    update() {
        if (this.isSplashing) {
            if (Date.now() - this.splashStartTime > SPLASH_DURATION) {
                this.markForRemoval = true;
            }
            this.updateAnimation();
            return;
        }

        this.xCoordinate += this.OBJECT_SPEED * this.throwDirection;
        this.yVelocity += ThrowableObject.THROW_GRAVITY;
        this.yCoordinate += this.yVelocity;

        const bottleGroundLevel = GROUND_LEVEL + (Character.HEIGHT - Bottle.HEIGHT);
        if (this.yCoordinate >= bottleGroundLevel) {
            this.yCoordinate = bottleGroundLevel;
            this.splash();
        }

        this.updateAnimation();
    }

    /**
     * Trigger splash animation (when hitting ground or enemy)
     */
    splash() {
        if (!this.isSplashing) {
            this.isSplashing = true;
            this.hasHit = true;
            this.splashStartTime = Date.now();
            AudioManager.getInstance().playSFX(ThrowableObject.AUDIO_BREAK);
            this.animationTimer = 0;
            this.currentImageIndex = 0;
        }
    }

    /**
     * Advance animation frame using delta-time accumulator
     */
    updateAnimation() {
        this.animationTimer += FRAME_INTERVAL;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationTimer -= this.animationSpeed;
            if (this.isSplashing) {
                this.playAnimation(ThrowableObject.IMAGES_SPLASH);
            } else {
                this.playAnimation(ThrowableObject.IMAGES_ROTATION);
            }
        }
    }
}
