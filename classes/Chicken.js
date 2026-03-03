/**
 * @class Chicken
 * @extends MovableObject
 * @description Regular chicken enemy that patrols back and forth within a set range.
 */
class Chicken extends MovableObject {
    static WIDTH = 60;
    static HEIGHT = 70;
    static SPEED = 3;
    static SPAWN_MIN_X = 300;
    static SPAWN_RANGE = 1200;
    static PATROL_WIDTH = 500;

    static COLLISION_OFFSET_X = 5;
    static COLLISION_OFFSET_Y = 5;
    static COLLISION_OFFSET_WIDTH = 5;
    static COLLISION_OFFSET_HEIGHT = 5;

    static IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    static IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    static AUDIO_CHICKEN = 'audio/sfx/chicken-cluck.mp3';

    static IMAGES_CACHE = {};

    /**
     * Preloads all Chicken images into the class-level cache
     */
    static loadAllImages() {
        [...Chicken.IMAGES_WALKING, ...Chicken.IMAGES_DEAD].forEach(p => {
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
        super(Chicken.WIDTH, Chicken.HEIGHT, Chicken.SPEED * 0.5);
        this.img = Chicken.IMAGES_CACHE[Chicken.IMAGES_WALKING[0]];
        this.xCoordinate = Chicken.SPAWN_MIN_X + Math.random() * Chicken.SPAWN_RANGE;
        this.patrolStartX = this.xCoordinate;
        this.patrolEndX = this.xCoordinate + Chicken.PATROL_WIDTH;
        this.yCoordinate = GROUND_LEVEL + (Character.HEIGHT - Chicken.HEIGHT);
        this.otherDirection = !this.movingRight;
        this.collisionOffsetX = Chicken.COLLISION_OFFSET_X;
        this.collisionOffsetY = Chicken.COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = Chicken.COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = Chicken.COLLISION_OFFSET_HEIGHT;
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
                this.playAnimation(Chicken.IMAGES_WALKING);
            }
        }
    }
}
