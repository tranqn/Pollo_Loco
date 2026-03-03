// Coin - Collectible coins (animated)

/**
 * @class Coin
 * @extends DrawableObject
 * @description A collectible coin with a spinning animation that updates the coin status bar.
 */
class Coin extends DrawableObject {
    IMAGES_COIN = [];

    // Animation accumulator (replaces setInterval)
    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL * 2; // Slower animation (200ms per frame)

    /**
     * Create a coin collectible
     * @param {number} x - X position in the level
     * @param {number} y - Y position (height) - defaults to ground level
     */
    constructor(x, y = GROUND_LEVEL) {
        // Initialize with coin dimensions
        super(x, y, COIN_WIDTH, COIN_HEIGHT);

        // Load coin animation images
        this.loadImages(this.IMAGES_COIN, IMAGES_COIN);

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_COIN[0]];

        // Set collision box offsets (generous for easier collection)
        this.collisionOffsetX = COIN_COLLISION_OFFSET_X;
        this.collisionOffsetY = COIN_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = COIN_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = COIN_COLLISION_OFFSET_HEIGHT;
    }

    /**
     * Update coin state (called every frame from World)
     */
    update() {
        this.updateAnimation();
    }

    /**
     * Advance animation frame using delta-time accumulator
     */
    updateAnimation() {
        this.animationTimer += FRAME_INTERVAL;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationTimer -= this.animationSpeed;
            this.playAnimation(IMAGES_COIN);
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
