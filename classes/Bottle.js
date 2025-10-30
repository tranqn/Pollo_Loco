// Bottle - Collectible bottles on the ground (static, no animation)

class Bottle extends DrawableObject {
    /**
     * Create a bottle collectible on the ground
     * @param {number} x - X position in the level
     */
    constructor(x) {
        // Calculate Y position (bottles sit on ground)
        const bottleY = GROUND_LEVEL + (CHARACTER_HEIGHT - BOTTLE_HEIGHT);

        // Initialize with bottle dimensions
        super(x, bottleY, BOTTLE_WIDTH, BOTTLE_HEIGHT);

        // Load static bottle image (no animation)
        this.img = new Image();
        this.img.src = IMAGES_BOTTLE_GROUND[0]; // Use first frame as static image
    }
}
