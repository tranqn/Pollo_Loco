// ThrowableObject - Bottles that can be thrown at enemies

/**
 * @class ThrowableObject
 * @extends MovableObject
 * @description A bottle that can be thrown at enemies, following a parabolic arc with rotation and splash animations.
 */
class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [];
    IMAGES_SPLASH = [];

    throwDirection = 1; // 1 = right, -1 = left
    isSplashing = false; // Is the bottle currently splashing?
    hasHit = false; // Has the bottle hit something?
    splashStartTime = 0; // When did the splash animation start?

    // Animation accumulator (replaces setInterval)
    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_FAST;

    /**
     * Create a throwable bottle
     * @param {number} x - Starting X position
     * @param {number} y - Starting Y position
     * @param {number} direction - Throw direction (1 = right, -1 = left)
     */
    constructor(x, y, direction) {
        super(BOTTLE_WIDTH, BOTTLE_HEIGHT, THROWABLE_SPEED);

        this.xCoordinate = x;
        this.yCoordinate = y;
        this.throwDirection = direction;

        // Populate cache from global preloaded images
        IMAGES_BOTTLE_ROTATION.forEach(path => {
            this.IMAGES_CACHE[path] = getCachedImage(path);
        });
        IMAGES_BOTTLE_SPLASH.forEach(path => {
            this.IMAGES_CACHE[path] = getCachedImage(path);
        });

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_BOTTLE_ROTATION[0]];

        // Set collision box offsets (tight for precise hits)
        this.collisionOffsetX = THROWABLE_COLLISION_OFFSET_X;
        this.collisionOffsetY = THROWABLE_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = THROWABLE_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = THROWABLE_COLLISION_OFFSET_HEIGHT;

        // Start the throw
        this.throw();
    }

    /**
     * Throw the bottle
     * Sets initial velocity for throwing arc
     */
    throw() {
        // Initial upward velocity (creates arc)
        this.yVelocity = THROW_INITIAL_VELOCITY;
    }

    /**
     * Update bottle position, physics, and animation
     */
    update() {
        if (this.isSplashing) {
            // Check if splash animation is complete (500ms)
            if (Date.now() - this.splashStartTime > SPLASH_DURATION) {
                this.markForRemoval = true; // Flag for removal from world
            }
            this.updateAnimation();
            return; // Don't move while splashing
        }

        // Move horizontally based on throw direction
        this.xCoordinate += this.OBJECT_SPEED * this.throwDirection;

        // Apply gravity (makes bottle fall)
        this.yVelocity += THROWABLE_GRAVITY;
        this.yCoordinate += this.yVelocity;

        // Check if bottle hit the ground (bottles rest at same level as collectible bottles)
        const bottleGroundLevel = GROUND_LEVEL + (CHARACTER_HEIGHT - BOTTLE_HEIGHT);
        if (this.yCoordinate >= bottleGroundLevel) {
            // Position at ground level before splashing
            this.yCoordinate = bottleGroundLevel;
            this.splash();
        }

        this.updateAnimation();
    }

    /**
     * Trigger splash animation (when hitting ground or enemy)
     * Splashes at current position (don't change coordinates)
     */
    splash() {
        if (!this.isSplashing) {
            this.isSplashing = true;
            this.hasHit = true;
            this.splashStartTime = Date.now();
            AudioManager.getInstance().playSFX(AUDIO_SFX_BOTTLE_BREAK);

            // Reset animation for splash
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
