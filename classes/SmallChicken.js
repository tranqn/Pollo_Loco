// SmallChicken - Smaller, faster enemy variant

class SmallChicken extends MovableObject {
    IMAGES_WALKING = [];
    animationInterval;

    /**
     * Create a small chicken enemy
     * Smaller and faster than regular chickens
     */
    constructor() {
        // Initialize with small chicken dimensions and faster speed
        super(SMALL_CHICKEN_WIDTH, SMALL_CHICKEN_HEIGHT, SMALL_CHICKEN_SPEED);

        // Load walking animation
        this.loadImages(this.IMAGES_WALKING, IMAGES_SMALL_CHICKEN_WALKING);

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_SMALL_CHICKEN_WALKING[0]];

        // Random starting position (spread across level)
        this.xCoordinate = 300 + Math.random() * 1500;

        // Y: On the ground (accounting for small chicken height)
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - SMALL_CHICKEN_HEIGHT);

        // Start animation
        this.startAnimation();
    }

    /**
     * Update small chicken state (called every frame)
     * Moves left continuously
     */
    update() {
        this.moveLeft();
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
