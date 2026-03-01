// Endboss - Final boss enemy

class Endboss extends MovableObject {
    IMAGES_WALKING = [];
    IMAGES_ALERT = [];
    IMAGES_ATTACK = [];
    IMAGES_HURT = [];
    IMAGES_DEAD = [];

    health = ENDBOSS_MAX_HEALTH;
    lastHitTime = 0;
    isDead = false;
    currentState = 'walking';
    animationInterval;

    // Patrol behavior
    patrolStartX = 1600;
    patrolEndX = 1850;
    movingRight = true;

    // Character tracking (set by World each frame)
    characterX = 0;

    /**
     * Create the endboss enemy
     */
    constructor() {
        super(ENDBOSS_WIDTH, ENDBOSS_HEIGHT, ENDBOSS_SPEED);

        this.loadImages(this.IMAGES_WALKING, IMAGES_ENDBOSS_WALKING);
        this.loadImages(this.IMAGES_ALERT, IMAGES_ENDBOSS_ALERT);
        this.loadImages(this.IMAGES_ATTACK, IMAGES_ENDBOSS_ATTACK);
        this.loadImages(this.IMAGES_HURT, IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_DEAD, IMAGES_ENDBOSS_DEAD);

        this.img = this.IMAGES_CACHE[IMAGES_ENDBOSS_WALKING[0]];
        this.otherDirection = true;
        this.xCoordinate = this.patrolStartX;
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - ENDBOSS_HEIGHT);

        this.collisionOffsetX = ENDBOSS_COLLISION_OFFSET_X;
        this.collisionOffsetY = ENDBOSS_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = ENDBOSS_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = ENDBOSS_COLLISION_OFFSET_HEIGHT;

        this.startAnimation();
    }

    /**
     * Update endboss state (called every frame)
     */
    update() {
        this.updateState();

        if (this.currentState === 'walking') {
            this.patrol();
        }
    }

    /**
     * Patrol back and forth within the patrol area
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
     * Update endboss state based on health and character proximity
     */
    updateState() {
        if (this.isDead) {
            this.currentState = 'dead';
        } else if (this.isHurt()) {
            this.currentState = 'hurt';
        } else if (this.getDistanceToCharacter() < ENDBOSS_ALERT_DISTANCE / 2) {
            this.currentState = 'attack';
        } else if (this.getDistanceToCharacter() < ENDBOSS_ALERT_DISTANCE) {
            this.currentState = 'alert';
        } else {
            this.currentState = 'walking';
        }
    }

    /**
     * Get horizontal distance to the character
     * @returns {number} Distance in pixels
     */
    getDistanceToCharacter() {
        return Math.abs(this.xCoordinate - this.characterX);
    }

    /**
     * Check if endboss is currently hurt (within damage cooldown)
     * @returns {boolean}
     */
    isHurt() {
        const timeSinceHit = Date.now() - this.lastHitTime;
        return timeSinceHit < HURT_DURATION;
    }

    /**
     * Endboss takes damage from bottle
     * @param {number} damage - Amount of damage to take
     */
    hit(damage = THROWABLE_DAMAGE) {
        if (this.isDead) return;

        this.health -= damage;
        this.lastHitTime = Date.now();

        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }
    }

    /**
     * Start animation loop
     */
    startAnimation() {
        this.animationInterval = setInterval(() => {
            if (this.currentState === 'dead') {
                this.playAnimation(IMAGES_ENDBOSS_DEAD);
            } else if (this.currentState === 'hurt') {
                this.playAnimation(IMAGES_ENDBOSS_HURT);
            } else if (this.currentState === 'attack') {
                this.playAnimation(IMAGES_ENDBOSS_ATTACK);
            } else if (this.currentState === 'alert') {
                this.playAnimation(IMAGES_ENDBOSS_ALERT);
            } else {
                this.playAnimation(IMAGES_ENDBOSS_WALKING);
            }
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
