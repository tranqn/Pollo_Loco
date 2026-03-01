// StatusBar - Visual status indicator for health, coins, bottles, etc.

/**
 * @class StatusBar
 * @extends DrawableObject
 * @description Visual status bar that displays a percentage value using one of six images (0-100%).
 */
class StatusBar extends DrawableObject {
    percentage = 100; // Current value (0-100)
    images = []; // Array of 6 images for different percentages
    imagePaths = []; // Store image paths

    /**
     * Create a status bar
     * @param {number} x - X position on screen (fixed, not affected by camera)
     * @param {number} y - Y position on screen
     * @param {Array} imagePaths - Array of 6 image paths (0%, 20%, 40%, 60%, 80%, 100%)
     */
    constructor(x, y, imagePaths) {
        super(x, y, STATUSBAR_WIDTH, STATUSBAR_HEIGHT);

        this.imagePaths = imagePaths;

        // Load all status bar images
        this.loadImages(imagePaths);

        // Set initial image (100%)
        this.setPercentage(100);
    }

    /**
     * Update the status bar to show a new percentage
     * @param {number} percentage - Value from 0 to 100
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        // Determine which image to show based on percentage
        // Images array: [0%, 20%, 40%, 60%, 80%, 100%]
        let imageIndex;
        if (percentage >= 100) {
            imageIndex = 5; // 100%
        } else if (percentage >= 80) {
            imageIndex = 4; // 80%
        } else if (percentage >= 60) {
            imageIndex = 3; // 60%
        } else if (percentage >= 40) {
            imageIndex = 2; // 40%
        } else if (percentage >= 20) {
            imageIndex = 1; // 20%
        } else {
            imageIndex = 0; // 0%
        }

        // Get the image from cache
        let path = this.imagePaths[imageIndex];
        this.img = this.IMAGES_CACHE[path];
    }

    /**
     * Load multiple images into cache
     * @param {Array} imagePaths - Array of image file paths
     */
    loadImages(imagePaths) {
        imagePaths.forEach(path => {
            let img = new Image();
            img.src = path;
            this.IMAGES_CACHE[path] = img;
            this.images.push(img);
        });
    }
}
