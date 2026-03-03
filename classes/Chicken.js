// Chicken - Enemy class (normal chicken)

/**
 * @class Chicken
 * @extends MovableObject
 * @description Regular chicken enemy that patrols back and forth within a set range.
 */
class Chicken extends MovableObject {
    IMAGES_WALKING = [];
    IMAGES_DEAD = [];
    currentState = 'walking'; // walking, dead

    // Animation accumulator (replaces setInterval)
    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL;

    // Patrol behavior
    patrolStartX;
    patrolEndX;
    movingRight = Math.random() < 0.5; // Random initial direction

    /**
     * Create a chicken enemy
     */
    constructor() {
        // Initialize with chicken dimensions and slower speed
        super(CHICKEN_WIDTH, CHICKEN_HEIGHT, CHICKEN_SPEED * 0.5);

        // Load animation images
        this.loadImages(this.IMAGES_WALKING, IMAGES_CHICKEN_WALKING);
        this.loadImages(this.IMAGES_DEAD, IMAGES_CHICKEN_DEAD);

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_CHICKEN_WALKING[0]];

        // Random starting position between character and endboss
        this.xCoordinate = CHICKEN_SPAWN_MIN_X + Math.random() * CHICKEN_SPAWN_RANGE;

        // Set patrol range
        this.patrolStartX = this.xCoordinate;
        this.patrolEndX = this.xCoordinate + CHICKEN_PATROL_WIDTH;

        // Y: On the ground (accounting for chicken height)
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - CHICKEN_HEIGHT);

        // Set initial direction based on random
        this.otherDirection = !this.movingRight; // Images face left, so mirror if going right

        // Set collision box offsets for more accurate hitbox
        this.collisionOffsetX = CHICKEN_COLLISION_OFFSET_X;
        this.collisionOffsetY = CHICKEN_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = CHICKEN_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = CHICKEN_COLLISION_OFFSET_HEIGHT;
    }

    /**
     * Update chicken state (called every frame)
     * Patrols back and forth in a 500px range
     */
    update() {
        if (this.currentState === 'walking') {
            // Patrol back and forth
            if (this.movingRight) {
                this.moveRight();
                this.otherDirection = true; // Face right (mirror image)
                if (this.xCoordinate >= this.patrolEndX) {
                    this.movingRight = false;
                }
            } else {
                this.moveLeft();
                this.otherDirection = false; // Face left (default)
                if (this.xCoordinate <= this.patrolStartX) {
                    this.movingRight = true;
                }
            }
        }

        this.updateAnimation();
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

    /**
     * Play an animation by cycling through frames
     * @param {Array} images - Array of image paths
     */
    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.IMAGES_CACHE[path];
        this.currentImageIndex++;
    }
}
