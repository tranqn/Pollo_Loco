// Chicken - Enemy class (normal chicken)

class Chicken extends MovableObject {
    IMAGES_WALKING = [];
    IMAGES_DEAD = [];
    currentState = 'walking'; // walking, dead
    animationInterval;

    /**
     * Create a chicken enemy
     */
    constructor() {
        // Initialize with chicken dimensions and speed
        super(CHICKEN_WIDTH, CHICKEN_HEIGHT, CHICKEN_SPEED);

        // Load animation images
        this.loadImages(this.IMAGES_WALKING, IMAGES_CHICKEN_WALKING);
        this.loadImages(this.IMAGES_DEAD, IMAGES_CHICKEN_DEAD);

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_CHICKEN_WALKING[0]];

        // Chickens walk left - images face left by default, so no mirroring needed
        // otherDirection stays false (default)

        // Random starting position
        // X: Start somewhere in the level (beyond the visible area)
        this.xCoordinate = 400 + Math.random() * 1500; // Spread across level

        // Y: On the ground (accounting for chicken height)
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - CHICKEN_HEIGHT);

        // Start animation
        this.startAnimation();
    }

    /**
     * Update chicken state (called every frame)
     */
    update() {
        if (this.currentState === 'walking') {
            // Walk left at constant speed
            this.moveLeft();
        }
    }

    /**
     * Start walking animation
     */
    startAnimation() {
        this.animationInterval = setInterval(() => {
            if (this.currentState === 'walking') {
                this.playAnimation(IMAGES_CHICKEN_WALKING);
            }
        }, ANIMATION_SPEED_NORMAL); // Same speed as character animation
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
