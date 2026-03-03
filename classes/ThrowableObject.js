/**
 * @class ThrowableObject
 * @extends MovableObject
 * @description A bottle that can be thrown at enemies, following a parabolic arc with rotation and splash animations.
 */
class ThrowableObject extends MovableObject {
    static IMAGES_CACHE = {};

    /**
     * Preloads all ThrowableObject images into the class-level cache
     */
    static loadAllImages() {
        [...IMAGES_BOTTLE_ROTATION, ...IMAGES_BOTTLE_SPLASH].forEach(p => {
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
        super(BOTTLE_WIDTH, BOTTLE_HEIGHT, THROWABLE_SPEED);
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.throwDirection = direction;
        this.img = ThrowableObject.IMAGES_CACHE[IMAGES_BOTTLE_ROTATION[0]];
        this.collisionOffsetX = THROWABLE_COLLISION_OFFSET_X;
        this.collisionOffsetY = THROWABLE_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = THROWABLE_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = THROWABLE_COLLISION_OFFSET_HEIGHT;
        this.throw();
    }

    /**
     * Sets initial velocity for throwing arc
     */
    throw() {
        this.yVelocity = THROW_INITIAL_VELOCITY;
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
        this.yVelocity += THROWABLE_GRAVITY;
        this.yCoordinate += this.yVelocity;

        const bottleGroundLevel = GROUND_LEVEL + (CHARACTER_HEIGHT - BOTTLE_HEIGHT);
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
            AudioManager.getInstance().playSFX(AUDIO_SFX_BOTTLE_BREAK);
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
                this.playAnimation(IMAGES_BOTTLE_SPLASH);
            } else {
                this.playAnimation(IMAGES_BOTTLE_ROTATION);
            }
        }
    }
}
