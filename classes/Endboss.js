// Endboss - Final boss enemy

class Endboss extends MovableObject {
    IMAGES_WALKING = [];
    IMAGES_ALERT = [];
    IMAGES_ATTACK = [];
    IMAGES_HURT = [];
    IMAGES_DEAD = [];

    health = ENDBOSS_MAX_HEALTH;
    lastHitTime = 0; // Track last time hit
    isDead = false;
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

        // Starts moving right, so mirror image (images face left by default)
        this.otherDirection = true;

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
        // Update state based on health
        this.updateState();

        // Only move if alive and walking
        if (this.currentState === 'walking') {
            // Patrol back and forth
            // Endboss images face LEFT by default
            if (this.movingRight) {
                this.moveRight();
                this.otherDirection = true; // Face right (mirror image since default is left)
                // Turn around at patrol end
                if (this.xCoordinate >= this.patrolEndX) {
                    this.movingRight = false;
                }
            } else {
                this.moveLeft();
                this.otherDirection = false; // Face left (default direction, no mirror)
                // Turn around at patrol start
                if (this.xCoordinate <= this.patrolStartX) {
                    this.movingRight = true;
                }
            }
        }
    }

    /**
     * Update endboss state based on health
     */
    updateState() {
        // Dead state has highest priority
        if (this.isDead) {
            this.currentState = 'dead';
        }
        // Hurt state (recently damaged)
        else if (this.isHurt()) {
            this.currentState = 'hurt';
        } else {
            this.currentState = 'walking';
        }
    }

    /**
     * Check if endboss is currently hurt (within damage cooldown)
     * @returns {boolean}
     */
    isHurt() {
        const timeSinceHit = Date.now() - this.lastHitTime;
        return timeSinceHit < 1000; // Hurt animation lasts 1 second
    }

    /**
     * Endboss takes damage from bottle
     * @param {number} damage - Amount of damage to take
     */
    hit(damage = THROWABLE_DAMAGE) {
        if (this.isDead) return; // Can't damage dead boss

        // Only take damage if not recently hit (invincibility frames)
        if (!this.isHurt()) {
            this.health -= damage;
            this.lastHitTime = Date.now();

            console.log(`Endboss hit! Health: ${this.health}`);

            // Check if endboss died
            if (this.health <= 0) {
                this.health = 0;
                this.isDead = true;
                console.log('Endboss defeated!');
            }
        }
    }

    /**
     * Start animation loop
     */
    startAnimation() {
        this.animationInterval = setInterval(() => {
            // Play animation based on current state
            if (this.currentState === 'dead') {
                this.playAnimation(IMAGES_ENDBOSS_DEAD);
            } else if (this.currentState === 'hurt') {
                this.playAnimation(IMAGES_ENDBOSS_HURT);
            } else if (this.currentState === 'walking') {
                this.playAnimation(IMAGES_ENDBOSS_WALKING);
            }
            // Other states (alert, attack) can be added later
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
