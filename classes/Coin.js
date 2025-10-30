// Coin - Collectible coins (animated)

class Coin extends DrawableObject {
    IMAGES_COIN = [];
    animationInterval;

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

        // Start spinning animation
        this.startAnimation();
    }

    /**
     * Start coin spinning animation
     */
    startAnimation() {
        this.animationInterval = setInterval(() => {
            this.playAnimation(IMAGES_COIN);
        }, ANIMATION_SPEED_NORMAL * 2); // Slower animation (200ms per frame)
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
