// Bottle - Collectible bottles on the ground (static, no animation)

class Bottle extends DrawableObject {
    /**
     * Create a bottle collectible on the ground
     * @param {number} x - X position in the level
     */
    constructor(x) {
        // Initialize with bottle dimensions and ground position
        super(x, BOTTLE_Y, BOTTLE_WIDTH, BOTTLE_HEIGHT);

        // Load static bottle image (no animation)
        this.img = new Image();
        this.img.src = IMAGES_BOTTLE_GROUND[0]; // Use first frame as static image

        // Set collision box offsets (generous for easier collection)
        this.collisionOffsetX = BOTTLE_COLLISION_OFFSET_X;
        this.collisionOffsetY = BOTTLE_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = BOTTLE_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = BOTTLE_COLLISION_OFFSET_HEIGHT;
    }
}
