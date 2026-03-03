/**
 * @class Endboss
 * @extends MovableObject
 * @description Final boss enemy with health, patrol, alert, attack, hurt, and dead states.
 */
class Endboss extends MovableObject {
    static IMAGES_CACHE = {};

    /**
     * Preloads all Endboss images into the class-level cache
     */
    static loadAllImages() {
        const allPaths = [
            ...IMAGES_ENDBOSS_WALKING, ...IMAGES_ENDBOSS_ALERT,
            ...IMAGES_ENDBOSS_ATTACK, ...IMAGES_ENDBOSS_HURT,
            ...IMAGES_ENDBOSS_DEAD
        ];
        allPaths.forEach(p => { Endboss.IMAGES_CACHE[p] = getCachedImage(p); });
    }

    health = ENDBOSS_MAX_HEALTH;
    lastHitTime = 0;
    isDead = false;
    deathAnimationComplete = false;
    currentState = 'walking';
    previousState = 'walking';
    showDebugFrame = true;

    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL;

    patrolStartX = 1600;
    patrolEndX = 1850;
    movingRight = true;

    isChasing = true;
    cycleStartTime = 0;
    wanderDirection = -1;

    characterX = 0;

    /**
     * Create the endboss enemy
     */
    constructor() {
        super(ENDBOSS_WIDTH, ENDBOSS_HEIGHT, ENDBOSS_SPEED);
        this.img = Endboss.IMAGES_CACHE[IMAGES_ENDBOSS_WALKING[0]];
        this.otherDirection = true;
        this.xCoordinate = this.patrolStartX;
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - ENDBOSS_HEIGHT);
        this.collisionOffsetX = ENDBOSS_COLLISION_OFFSET_X;
        this.collisionOffsetY = ENDBOSS_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = ENDBOSS_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = ENDBOSS_COLLISION_OFFSET_HEIGHT;
    }

    /**
     * Update endboss state (called every frame)
     */
    update() {
        this.updateState();
        if (this.currentState === 'walking') {
            this.patrol();
        } else if (this.currentState === 'alert' || this.currentState === 'attack') {
            this.updateChaseCycle();
        }
        this.clampPosition();
        this.updateAnimation();
    }

    /**
     * Prevent the endboss from walking too far left
     */
    clampPosition() {
        if (this.xCoordinate < ENDBOSS_MIN_X) {
            this.xCoordinate = ENDBOSS_MIN_X;
        }
    }

    /**
     * Alternate between chasing the player and wandering randomly
     */
    updateChaseCycle() {
        const now = Date.now();
        const elapsed = now - this.cycleStartTime;
        const duration = this.isChasing ? ENDBOSS_CHASE_DURATION : ENDBOSS_WANDER_DURATION;

        if (elapsed >= duration) {
            this.isChasing = !this.isChasing;
            this.cycleStartTime = now;
            if (!this.isChasing) {
                this.pickWanderDirection();
            }
        }

        if (this.isChasing) {
            this.chaseCharacter();
        } else {
            this.wander();
        }
    }

    /**
     * Pick a random direction for the wander phase
     */
    pickWanderDirection() {
        this.wanderDirection = Math.random() < 0.5 ? -1 : 1;
    }

    /**
     * Move toward the character's position
     */
    chaseCharacter() {
        if (this.characterX < this.xCoordinate) {
            this.moveLeft();
            this.otherDirection = false;
        } else {
            this.moveRight();
            this.otherDirection = true;
        }
    }

    /**
     * Walk in the current wander direction
     */
    wander() {
        if (this.wanderDirection < 0) {
            this.moveLeft();
            this.otherDirection = false;
        } else {
            this.moveRight();
            this.otherDirection = true;
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
        this.resetAnimationOnStateChange();
    }

    /**
     * Reset animation index when state changes for clean transitions
     */
    resetAnimationOnStateChange() {
        if (this.currentState !== this.previousState) {
            this.currentImageIndex = 0;
            this.previousState = this.currentState;
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
     * Advance animation frame using delta-time accumulator
     */
    updateAnimation() {
        this.animationTimer += FRAME_INTERVAL;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationTimer -= this.animationSpeed;
            this.advanceFrame();
        }
    }

    /**
     * Advance to the next animation frame based on current state
     */
    advanceFrame() {
        if (this.currentState === 'dead') {
            this.playDeathAnimation();
        } else if (this.currentState === 'hurt') {
            this.playAnimation(IMAGES_ENDBOSS_HURT);
        } else if (this.currentState === 'attack') {
            this.playAnimation(IMAGES_ENDBOSS_ATTACK);
        } else if (this.currentState === 'alert') {
            this.playAnimation(IMAGES_ENDBOSS_ALERT);
        } else {
            this.playAnimation(IMAGES_ENDBOSS_WALKING);
        }
    }

    /**
     * Play death animation once, then freeze on last frame
     */
    playDeathAnimation() {
        const lastFrame = IMAGES_ENDBOSS_DEAD.length - 1;
        if (this.currentImageIndex <= lastFrame) {
            const path = IMAGES_ENDBOSS_DEAD[this.currentImageIndex];
            this.img = Endboss.IMAGES_CACHE[path];
            this.currentImageIndex++;
        }
        if (this.currentImageIndex > lastFrame) {
            this.deathAnimationComplete = true;
        }
    }
}
