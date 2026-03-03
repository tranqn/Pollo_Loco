/**
 * @class StatusBar
 * @extends DrawableObject
 * @description Visual status bar that displays a percentage value using one of six images (0-100%).
 */
class StatusBar extends DrawableObject {
    // #region Static Properties
    static WIDTH = 150;
    static HEIGHT = 45;
    static PADDING = 15;

    static IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    static IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    static IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    static IMAGES_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    static IMAGES_CACHE = {};
    // #endregion

    /**
     * Preloads all StatusBar images into the class-level cache
     */
    static loadAllImages() {
        const allPaths = [
            ...StatusBar.IMAGES_HEALTH, ...StatusBar.IMAGES_COIN,
            ...StatusBar.IMAGES_BOTTLE, ...StatusBar.IMAGES_ENDBOSS
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
        super(x, y, StatusBar.WIDTH, StatusBar.HEIGHT);
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
