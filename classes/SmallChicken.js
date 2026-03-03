/**
 * @class SmallChicken
 * @extends MovableObject
 * @description Smaller and faster chicken enemy variant that patrols back and forth.
 */
class SmallChicken extends MovableObject {
    static IMAGES_CACHE = {};

    /**
     * Preloads all SmallChicken images into the class-level cache
     */
    static loadAllImages() {
        [...IMAGES_SMALL_CHICKEN_WALKING, ...IMAGES_SMALL_CHICKEN_DEAD].forEach(p => {
            SmallChicken.IMAGES_CACHE[p] = getCachedImage(p);
        });
    }

    showDebugFrame = true;

    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL;

    patrolStartX;
    patrolEndX;
    movingRight = Math.random() < 0.5;

    /**
     * Create a small chicken enemy
     */
    constructor() {
        super(SMALL_CHICKEN_WIDTH, SMALL_CHICKEN_HEIGHT, SMALL_CHICKEN_SPEED * 0.5);
        this.img = SmallChicken.IMAGES_CACHE[IMAGES_SMALL_CHICKEN_WALKING[0]];
        this.xCoordinate = CHICKEN_SPAWN_MIN_X + Math.random() * CHICKEN_SPAWN_RANGE;
        this.patrolStartX = this.xCoordinate;
        this.patrolEndX = this.xCoordinate + CHICKEN_PATROL_WIDTH;
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - SMALL_CHICKEN_HEIGHT);
        this.otherDirection = !this.movingRight;
        this.collisionOffsetX = SMALL_CHICKEN_COLLISION_OFFSET_X;
        this.collisionOffsetY = SMALL_CHICKEN_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = SMALL_CHICKEN_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = SMALL_CHICKEN_COLLISION_OFFSET_HEIGHT;
    }

    /**
     * Update small chicken state (called every frame)
     */
    update() {
        this.patrol();
        this.updateAnimation();
    }

    /**
     * Patrol back and forth within the set range
     */
    patrol() {
        if (this.movingRight) {
            this.moveRight();
            this.otherDirection = true;
            if (this.xCoordinate >= this.patrolEndX) {
                this.movingRight = false;
            }
        } else {
            this.moveLeft();
            this.otherDirection = false;
            if (this.xCoordinate <= this.patrolStartX) {
                this.movingRight = true;
            }
        }
    }

    /**
     * Advance animation frame using delta-time accumulator
     */
    updateAnimation() {
        this.animationTimer += FRAME_INTERVAL;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationTimer -= this.animationSpeed;
            this.playAnimation(IMAGES_SMALL_CHICKEN_WALKING);
        }
    }
}
