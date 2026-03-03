/**
 * @class Coin
 * @extends DrawableObject
 * @description A collectible coin with a spinning animation that updates the coin status bar.
 */
class Coin extends DrawableObject {
    static WIDTH = 60;
    static HEIGHT = 60;

    static COLLISION_OFFSET_X = 10;
    static COLLISION_OFFSET_Y = 10;
    static COLLISION_OFFSET_WIDTH = 10;
    static COLLISION_OFFSET_HEIGHT = 10;

    static IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    static AUDIO_COIN = 'audio/sfx/coin-pickup-new.mp3';

    static IMAGES_CACHE = {};

    /**
     * Preloads all Coin images into the class-level cache
     */
    static loadAllImages() {
        Coin.IMAGES_COIN.forEach(p => { Coin.IMAGES_CACHE[p] = getCachedImage(p); });
    }

    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL * 2;

    /**
     * @param {number} x - X position in the level
     * @param {number} y - Y position (height) - defaults to ground level
     */
    constructor(x, y = GROUND_LEVEL) {
        super(x, y, Coin.WIDTH, Coin.HEIGHT);
        this.img = Coin.IMAGES_CACHE[Coin.IMAGES_COIN[0]];
        this.collisionOffsetX = Coin.COLLISION_OFFSET_X;
        this.collisionOffsetY = Coin.COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = Coin.COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = Coin.COLLISION_OFFSET_HEIGHT;
    }

    /**
     * Update coin state (called every frame)
     */
    update() {
        this.updateAnimation();
    }

    /**
     * Advance animation frame using delta-time accumulator
     */
    updateAnimation() {
        this.animationTimer += FRAME_INTERVAL;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationTimer -= this.animationSpeed;
            this.playAnimation(Coin.IMAGES_COIN);
        }
    }
}
