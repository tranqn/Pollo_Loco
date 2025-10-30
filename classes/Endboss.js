// Endboss - Final boss enemy

class Endboss extends MovableObject {
    IMAGES_WALKING = [];
    IMAGES_ALERT = [];
    IMAGES_ATTACK = [];
    IMAGES_HURT = [];
    IMAGES_DEAD = [];

    health = ENDBOSS_MAX_HEALTH;
    currentState = 'walking'; // walking, alert, attack, hurt, dead
    animationInterval;

    // Patrol behavior - stays within last background section (1438 to 2158)
    patrolStartX = 1600;  // Start of patrol area (within last background)
    patrolEndX = 1850;    // End of patrol area (within last background)
    movingRight = true;   // Current direction

    /**
     * Create the endboss enemy
     */
    constructor() {
        // Initialize with endboss dimensions and speed
        super(ENDBOSS_WIDTH, ENDBOSS_HEIGHT, ENDBOSS_SPEED);

        // Load all animation images
        this.loadImages(this.IMAGES_WALKING, IMAGES_ENDBOSS_WALKING);
        this.loadImages(this.IMAGES_ALERT, IMAGES_ENDBOSS_ALERT);
        this.loadImages(this.IMAGES_ATTACK, IMAGES_ENDBOSS_ATTACK);
        this.loadImages(this.IMAGES_HURT, IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_DEAD, IMAGES_ENDBOSS_DEAD);

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_ENDBOSS_WALKING[0]];

        // Position at end of level
        this.xCoordinate = this.patrolStartX;

        // Y: On the ground (accounting for endboss height)
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - ENDBOSS_HEIGHT);

        // Start animation
        this.startAnimation();
    }

    /**
     * Update endboss state (called every frame)
     */
    update() {
        if (this.currentState === 'walking') {
            // Patrol back and forth
            if (this.movingRight) {
                this.moveRight();
                // Turn around at patrol end
                if (this.xCoordinate >= this.patrolEndX) {
                    this.movingRight = false;
                }
            } else {
                this.moveLeft();
                // Turn around at patrol start
                if (this.xCoordinate <= this.patrolStartX) {
                    this.movingRight = true;
                }
            }
        }
    }

    /**
     * Start walking animation
     */
    startAnimation() {
        this.animationInterval = setInterval(() => {
            if (this.currentState === 'walking') {
                this.playAnimation(IMAGES_ENDBOSS_WALKING);
            }
            // Other states can be added here later (alert, attack, hurt, dead)
        }, ANIMATION_SPEED_NORMAL); // Same speed as other animations
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
