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
    animationInterval;

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

        // Load animation images
        this.loadImages(this.IMAGES_ROTATION, IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_SPLASH, IMAGES_BOTTLE_SPLASH);

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_BOTTLE_ROTATION[0]];

        // Set collision box offsets (tight for precise hits)
        this.collisionOffsetX = THROWABLE_COLLISION_OFFSET_X;
        this.collisionOffsetY = THROWABLE_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = THROWABLE_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = THROWABLE_COLLISION_OFFSET_HEIGHT;

        // Start the throw
        this.throw();

        // Start rotation animation
        this.startRotationAnimation();
    }

    /**
     * Throw the bottle
     * Sets initial velocity for throwing arc
     */
    throw() {
        // Initial upward velocity (creates arc)
        this.yVelocity = THROW_INITIAL_VELOCITY;

        // Set horizontal movement based on direction
        // (handled in update method)
    }

    /**
     * Update bottle position and physics
     */
    update() {
        if (this.isSplashing) {
            // Check if splash animation is complete (500ms)
            if (Date.now() - this.splashStartTime > SPLASH_DURATION) {
                this.markForRemoval = true; // Flag for removal from world
            }
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

            // Stop rotation animation and start splash animation
            clearInterval(this.animationInterval);
            this.startSplashAnimation();
        }
    }

    /**
     * Start rotation animation (while bottle is flying)
     */
    startRotationAnimation() {
        this.animationInterval = setInterval(() => {
            if (!this.isSplashing) {
                this.playAnimation(IMAGES_BOTTLE_ROTATION);
            }
        }, ANIMATION_SPEED_FAST);
    }

    /**
     * Start splash animation (when bottle hits something)
     */
    startSplashAnimation() {
        this.currentImageIndex = 0; // Reset to start of splash animation
        this.animationInterval = setInterval(() => {
            this.playAnimation(IMAGES_BOTTLE_SPLASH);
        }, ANIMATION_SPEED_FAST);
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

    /**
     * Load multiple images into cache
     * @param {Array} targetArray - Array to store loaded images
     * @param {Array} imagePaths - Array of image file paths
     */
    loadImages(targetArray, imagePaths) {
        imagePaths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.IMAGES_CACHE[path] = img;
            targetArray.push(img);
        });
    }
}
