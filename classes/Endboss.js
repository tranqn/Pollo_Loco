/**
 * @class Endboss
 * @extends MovableObject
 * @description Final boss enemy with health, patrol, alert, attack, hurt, and dead states.
 */
class Endboss extends MovableObject {
    // #region Static Properties
    static WIDTH = 250;
    static HEIGHT = 400;
    static SPEED = 6;
    static MAX_HEALTH = 100;
    static ALERT_DISTANCE = 500;
    static MIN_X = 500;
    static CHASE_DURATION = 1500;
    static WANDER_DURATION = 1500;

    static COLLISION_OFFSET_X = 40;
    static COLLISION_OFFSET_Y = 70;
    static COLLISION_OFFSET_WIDTH = 40;
    static COLLISION_OFFSET_HEIGHT = 100;

    static IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    static IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    static IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    static IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    static IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    static AUDIO_BOSS = 'audio/sfx/endboss-hit.mp3';

    static IMAGES_CACHE = {};
    // #endregion

    /**
     * Preloads all Endboss images into the class-level cache
     */
    static loadAllImages() {
        const allPaths = [
            ...Endboss.IMAGES_WALKING, ...Endboss.IMAGES_ALERT,
            ...Endboss.IMAGES_ATTACK, ...Endboss.IMAGES_HURT,
            ...Endboss.IMAGES_DEAD
        ];
        allPaths.forEach(p => { Endboss.IMAGES_CACHE[p] = getCachedImage(p); });
    }

    // #region Instance Fields
    health = Endboss.MAX_HEALTH;
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
    // #endregion

    /**
     * Create the endboss enemy
     */
    constructor() {
        super(Endboss.WIDTH, Endboss.HEIGHT, Endboss.SPEED);
        this.img = Endboss.IMAGES_CACHE[Endboss.IMAGES_WALKING[0]];
        this.otherDirection = true;
        this.xCoordinate = this.patrolStartX;
        this.yCoordinate = GROUND_LEVEL + (Character.HEIGHT - Endboss.HEIGHT);
        this.collisionOffsetX = Endboss.COLLISION_OFFSET_X;
        this.collisionOffsetY = Endboss.COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = Endboss.COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = Endboss.COLLISION_OFFSET_HEIGHT;
    }

    // #region Update
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
        if (this.xCoordinate < Endboss.MIN_X) {
            this.xCoordinate = Endboss.MIN_X;
        }
    }
    // #endregion

    // #region Movement
    /**
     * Alternate between chasing the player and wandering randomly
     */
    updateChaseCycle() {
        const now = Date.now();
        const elapsed = now - this.cycleStartTime;
        const duration = this.isChasing ? Endboss.CHASE_DURATION : Endboss.WANDER_DURATION;

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
    // #endregion

    // #region State Management
    /**
     * Update endboss state based on health and character proximity
     */
    updateState() {
        if (this.isDead) {
            this.currentState = 'dead';
        } else if (this.isHurt()) {
            this.currentState = 'hurt';
        } else if (this.getDistanceToCharacter() < Endboss.ALERT_DISTANCE / 2) {
            this.currentState = 'attack';
        } else if (this.getDistanceToCharacter() < Endboss.ALERT_DISTANCE) {
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
    // #endregion

    // #region Combat
    /**
     * Endboss takes damage from bottle
     * @param {number} damage - Amount of damage to take
     */
    hit(damage = ThrowableObject.DAMAGE) {
        if (this.isDead) return;
        this.health -= damage;
        this.lastHitTime = Date.now();
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }
    }
    // #endregion

    // #region Animation
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
            this.playAnimation(Endboss.IMAGES_HURT);
        } else if (this.currentState === 'attack') {
            this.playAnimation(Endboss.IMAGES_ATTACK);
        } else if (this.currentState === 'alert') {
            this.playAnimation(Endboss.IMAGES_ALERT);
        } else {
            this.playAnimation(Endboss.IMAGES_WALKING);
        }
    }

    /**
     * Play death animation once, then freeze on last frame
     */
    playDeathAnimation() {
        const lastFrame = Endboss.IMAGES_DEAD.length - 1;
        if (this.currentImageIndex <= lastFrame) {
            const path = Endboss.IMAGES_DEAD[this.currentImageIndex];
            this.img = Endboss.IMAGES_CACHE[path];
            this.currentImageIndex++;
        }
        if (this.currentImageIndex > lastFrame) {
            this.deathAnimationComplete = true;
        }
    }
    // #endregion
}
