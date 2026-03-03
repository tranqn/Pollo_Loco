/**
 * @class StatusBar
 * @extends DrawableObject
 * @description Visual status bar that displays a percentage value using one of six images (0-100%).
 */
class StatusBar extends DrawableObject {
    static IMAGES_CACHE = {};

    /**
     * Preloads all StatusBar images into the class-level cache
     */
    static loadAllImages() {
        const allPaths = [
            ...IMAGES_STATUSBAR_HEALTH, ...IMAGES_STATUSBAR_COIN,
            ...IMAGES_STATUSBAR_BOTTLE, ...IMAGES_STATUSBAR_ENDBOSS
        ];
        allPaths.forEach(p => { StatusBar.IMAGES_CACHE[p] = getCachedImage(p); });
    }

    percentage = 100;
    imagePaths = [];

    /**
     * @param {number} x - X position on screen
     * @param {number} y - Y position on screen
     * @param {Array<string>} imagePaths - Array of 6 image paths (0%, 20%, 40%, 60%, 80%, 100%)
     */
    constructor(x, y, imagePaths) {
        super(x, y, STATUSBAR_WIDTH, STATUSBAR_HEIGHT);
        this.imagePaths = imagePaths;
        this.setPercentage(100);
    }

    /**
     * Update the status bar to show a new percentage
     * @param {number} percentage - Value from 0 to 100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        const imageIndex = this.resolveImageIndex(percentage);
        const path = this.imagePaths[imageIndex];
        this.img = StatusBar.IMAGES_CACHE[path];
    }

    /**
     * Determine which image index to use based on the percentage value
     * @param {number} percentage - Value from 0 to 100
     * @returns {number} Index into the imagePaths array (0-5)
     */
    resolveImageIndex(percentage) {
        if (percentage >= 100) return 5;
        if (percentage >= 80) return 4;
        if (percentage >= 60) return 3;
        if (percentage >= 40) return 2;
        if (percentage >= 20) return 1;
        return 0;
    }
}
