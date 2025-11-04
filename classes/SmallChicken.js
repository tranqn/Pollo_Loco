// SmallChicken - Smaller, faster enemy variant

class SmallChicken extends MovableObject {
    IMAGES_WALKING = [];
    animationInterval;

    // Patrol behavior
    patrolStartX;
    patrolEndX;
    movingRight = Math.random() < 0.5; // Random initial direction

    /**
     * Create a small chicken enemy
     * Smaller and faster than regular chickens
     */
    constructor() {
        // Initialize with small chicken dimensions and slower speed
        super(SMALL_CHICKEN_WIDTH, SMALL_CHICKEN_HEIGHT, SMALL_CHICKEN_SPEED * 0.5);

        // Load walking animation
        this.loadImages(this.IMAGES_WALKING, IMAGES_SMALL_CHICKEN_WALKING);

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_SMALL_CHICKEN_WALKING[0]];

        // Random starting position between character and endboss
        this.xCoordinate = 300 + Math.random() * 1200;

        // Set patrol range (500px wide area)
        this.patrolStartX = this.xCoordinate;
        this.patrolEndX = this.xCoordinate + 500;

        // Y: On the ground (accounting for small chicken height)
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - SMALL_CHICKEN_HEIGHT);

        // Set initial direction based on random
        this.otherDirection = !this.movingRight; // Images face left, so mirror if going right

        // Set collision box offsets for more accurate hitbox
        this.collisionOffsetX = SMALL_CHICKEN_COLLISION_OFFSET_X;
        this.collisionOffsetY = SMALL_CHICKEN_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = SMALL_CHICKEN_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = SMALL_CHICKEN_COLLISION_OFFSET_HEIGHT;

        // Start animation
        this.startAnimation();
    }

    /**
     * Update small chicken state (called every frame)
     * Patrols back and forth in a 500px range
     */
    update() {
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

    /**
     * Start walking animation
     */
    startAnimation() {
        this.animationInterval = setInterval(() => {
            this.playAnimation(IMAGES_SMALL_CHICKEN_WALKING);
        }, ANIMATION_SPEED_NORMAL);
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
