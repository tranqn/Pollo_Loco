/**
 * @class Bottle
 * @extends DrawableObject
 * @description A collectible bottle on the ground that the character can pick up and throw.
 */
class Bottle extends DrawableObject {
    static WIDTH = 60;
    static HEIGHT = 70;

    static COLLISION_OFFSET_X = 10;
    static COLLISION_OFFSET_Y = 10;
    static COLLISION_OFFSET_WIDTH = 10;
    static COLLISION_OFFSET_HEIGHT = 10;

    static IMAGES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    static AUDIO_PICKUP = 'audio/sfx/bottle-pickup.mp3';

    static IMAGES_CACHE = {};

    /**
     * Preloads all Bottle images into the class-level cache
     */
    static loadAllImages() {
        Bottle.IMAGES_GROUND.forEach(p => { Bottle.IMAGES_CACHE[p] = getCachedImage(p); });
    }

    /**
     * @param {number} x - X position in the level
     */
    constructor(x) {
        const bottleY = GROUND_LEVEL + (Character.HEIGHT - Bottle.HEIGHT);
        super(x, bottleY, Bottle.WIDTH, Bottle.HEIGHT);
        this.img = getCachedImage(Bottle.IMAGES_GROUND[0]);
        this.collisionOffsetX = Bottle.COLLISION_OFFSET_X;
        this.collisionOffsetY = Bottle.COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = Bottle.COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = Bottle.COLLISION_OFFSET_HEIGHT;
    }
}
