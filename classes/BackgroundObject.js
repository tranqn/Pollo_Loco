// BackgroundObject - Background images (parallax layers)

class BackgroundObject extends DrawableObject {
    /**
     * Create a background layer object
     * @param {string} imagePath - Path to the background image
     * @param {number} x - X position (for tiling multiple backgrounds)
     */
    constructor(imagePath, x) {
        // Background images are always 720x480 (full canvas size)
        super(x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Load the image
        this.img = new Image();
        this.img.src = imagePath;
    }
}
