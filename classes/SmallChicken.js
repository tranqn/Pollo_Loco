/**
 * @class SmallChicken
 * @extends MovableObject
 * @description Smaller and faster chicken enemy variant that patrols back and forth.
 */
class SmallChicken extends MovableObject {
    static WIDTH = 50;
    static HEIGHT = 60;
    static SPEED = 4;

    static COLLISION_OFFSET_X = 5;
    static COLLISION_OFFSET_Y = 5;
    static COLLISION_OFFSET_WIDTH = 5;
    static COLLISION_OFFSET_HEIGHT = 5;

    static IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    static IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    static AUDIO_SMALL_CHICKEN = 'audio/sfx/small-chicken.mp3';

    static IMAGES_CACHE = {};

    /**
     * Preloads all SmallChicken images into the class-level cache
     */
    static loadAllImages() {
        [...SmallChicken.IMAGES_WALKING, ...SmallChicken.IMAGES_DEAD].forEach(p => {
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
        super(SmallChicken.WIDTH, SmallChicken.HEIGHT, SmallChicken.SPEED * 0.5);
        this.img = SmallChicken.IMAGES_CACHE[SmallChicken.IMAGES_WALKING[0]];
        this.xCoordinate = Chicken.SPAWN_MIN_X + Math.random() * Chicken.SPAWN_RANGE;
        this.patrolStartX = this.xCoordinate;
        this.patrolEndX = this.xCoordinate + Chicken.PATROL_WIDTH;
        this.yCoordinate = GROUND_LEVEL + (Character.HEIGHT - SmallChicken.HEIGHT);
        this.otherDirection = !this.movingRight;
        this.collisionOffsetX = SmallChicken.COLLISION_OFFSET_X;
        this.collisionOffsetY = SmallChicken.COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = SmallChicken.COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = SmallChicken.COLLISION_OFFSET_HEIGHT;
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
            this.playAnimation(SmallChicken.IMAGES_WALKING);
        }
    }
}
