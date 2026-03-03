/**
 * @class Coin
 * @extends DrawableObject
 * @description A collectible coin with a spinning animation that updates the coin status bar.
 */
class Coin extends DrawableObject {
    static IMAGES_CACHE = {};

    /**
     * Preloads all Coin images into the class-level cache
     */
    static loadAllImages() {
        IMAGES_COIN.forEach(p => { Coin.IMAGES_CACHE[p] = getCachedImage(p); });
    }

    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL * 2;

    /**
     * @param {number} x - X position in the level
     * @param {number} y - Y position (height) - defaults to ground level
     */
    constructor(x, y = GROUND_LEVEL) {
        super(x, y, COIN_WIDTH, COIN_HEIGHT);
        this.img = Coin.IMAGES_CACHE[IMAGES_COIN[0]];
        this.collisionOffsetX = COIN_COLLISION_OFFSET_X;
        this.collisionOffsetY = COIN_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = COIN_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = COIN_COLLISION_OFFSET_HEIGHT;
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
            this.playAnimation(IMAGES_COIN);
        }
    }
}
