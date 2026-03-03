/**
 * @class Chicken
 * @extends MovableObject
 * @description Regular chicken enemy that patrols back and forth within a set range.
 */
class Chicken extends MovableObject {
    static IMAGES_CACHE = {};

    /**
     * Preloads all Chicken images into the class-level cache
     */
    static loadAllImages() {
        [...IMAGES_CHICKEN_WALKING, ...IMAGES_CHICKEN_DEAD].forEach(p => {
            Chicken.IMAGES_CACHE[p] = getCachedImage(p);
        });
    }

    currentState = 'walking';
    showDebugFrame = true;

    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL;

    patrolStartX;
    patrolEndX;
    movingRight = Math.random() < 0.5;

    /**
     * Create a chicken enemy
     */
    constructor() {
        super(CHICKEN_WIDTH, CHICKEN_HEIGHT, CHICKEN_SPEED * 0.5);
        this.img = Chicken.IMAGES_CACHE[IMAGES_CHICKEN_WALKING[0]];
        this.xCoordinate = CHICKEN_SPAWN_MIN_X + Math.random() * CHICKEN_SPAWN_RANGE;
        this.patrolStartX = this.xCoordinate;
        this.patrolEndX = this.xCoordinate + CHICKEN_PATROL_WIDTH;
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - CHICKEN_HEIGHT);
        this.otherDirection = !this.movingRight;
        this.collisionOffsetX = CHICKEN_COLLISION_OFFSET_X;
        this.collisionOffsetY = CHICKEN_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = CHICKEN_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = CHICKEN_COLLISION_OFFSET_HEIGHT;
    }

    /**
     * Update chicken state (called every frame)
     */
    update() {
        if (this.currentState === 'walking') {
            this.patrol();
        }
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
            if (this.currentState === 'walking') {
                this.playAnimation(IMAGES_CHICKEN_WALKING);
            }
        }
    }
}
