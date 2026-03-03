/**
 * @class Bottle
 * @extends DrawableObject
 * @description A collectible bottle on the ground that the character can pick up and throw.
 */
class Bottle extends DrawableObject {
    static IMAGES_CACHE = {};

    /**
     * Preloads all Bottle images into the class-level cache
     */
    static loadAllImages() {
        IMAGES_BOTTLE_GROUND.forEach(p => { Bottle.IMAGES_CACHE[p] = getCachedImage(p); });
    }

    /**
     * @param {number} x - X position in the level
     */
    constructor(x) {
        super(x, BOTTLE_Y, BOTTLE_WIDTH, BOTTLE_HEIGHT);
        this.img = Bottle.IMAGES_CACHE[IMAGES_BOTTLE_GROUND[0]];
        this.collisionOffsetX = BOTTLE_COLLISION_OFFSET_X;
        this.collisionOffsetY = BOTTLE_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = BOTTLE_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = BOTTLE_COLLISION_OFFSET_HEIGHT;
    }
}
