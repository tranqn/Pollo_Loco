/**
 * @class BackgroundObject
 * @extends DrawableObject
 * @description A background image layer used for parallax scrolling, tiled across the level.
 */
class BackgroundObject extends DrawableObject {
    static IMAGES_LAYER_1 = [
        'img/5_background/layers/1_first_layer/1.png',
        'img/5_background/layers/1_first_layer/2.png'
    ];

    static IMAGES_LAYER_2 = [
        'img/5_background/layers/2_second_layer/1.png',
        'img/5_background/layers/2_second_layer/2.png'
    ];

    static IMAGES_LAYER_3 = [
        'img/5_background/layers/3_third_layer/1.png',
        'img/5_background/layers/3_third_layer/2.png'
    ];

    static IMAGES_CLOUDS = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    static IMAGE_AIR = 'img/5_background/layers/air.png';

    /**
     * @param {string} imagePath - Path to the background image
     * @param {number} x - X position (for tiling multiple backgrounds)
     */
    constructor(imagePath, x) {
        super(x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.img = getCachedImage(imagePath);
    }
}
