// Bottle - Collectible bottles on the ground

class Bottle extends DrawableObject {
    IMAGES_BOTTLE = [];
    animationInterval;

    /**
     * Create a bottle collectible on the ground
     * @param {number} x - X position in the level
     */
    constructor(x) {
        // Calculate Y position (bottles sit on ground)
        const bottleY = GROUND_LEVEL + (CHARACTER_HEIGHT - BOTTLE_HEIGHT);

        // Initialize with bottle dimensions
        super(x, bottleY, BOTTLE_WIDTH, BOTTLE_HEIGHT);

        // Load bottle animation images
        this.loadImages(this.IMAGES_BOTTLE, IMAGES_BOTTLE_GROUND);

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_BOTTLE_GROUND[0]];

        // Start animation
        this.startAnimation();
    }

    /**
     * Start bottle animation (subtle movement)
     */
    startAnimation() {
        this.animationInterval = setInterval(() => {
            this.playAnimation(IMAGES_BOTTLE_GROUND);
        }, ANIMATION_SPEED_NORMAL * 3); // Slower animation (300ms per frame)
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
