/**
 * @class Cloud
 * @extends MovableObject
 * @description Decorative cloud that drifts slowly to the left across the sky.
 */
class Cloud extends MovableObject {
    static WIDTH = 500;
    static HEIGHT = 250;
    static SPEED = 0.5;
    static SPREAD_RANGE = 2000;
    static Y_MIN = 20;
    static Y_RANGE = 130;

    static IMAGE = 'img/5_background/layers/4_clouds/1.png';

    /**
     * Create a cloud that floats slowly across the sky
     */
    constructor() {
        super(Cloud.WIDTH, Cloud.HEIGHT, Cloud.SPEED);
        this.img = getCachedImage(Cloud.IMAGE);
        this.xCoordinate = Math.random() * Cloud.SPREAD_RANGE;
        this.yCoordinate = Cloud.Y_MIN + Math.random() * Cloud.Y_RANGE;
    }

    /**
     * Update cloud position (called every frame)
     */
    update() {
        this.moveLeft();
    }
}
