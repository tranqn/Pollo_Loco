/**
 * @class CollisionHandler
 * @description Handles all collision detection and responses between the character, enemies, and collectibles.
 */
class CollisionHandler {
    static CULLING_RANGE = 500;
    static ENEMY_DAMAGE = 20;
    static ENEMY_BOUNCE_FORCE = 6;

    /** @type {World} */
    world;

    /**
     * @param {World} world - Reference to the game world
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Check all collisions between character and game objects
     */
    checkCollisions() {
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkEnemyCollisions();
        this.checkBottleEnemyCollisions();
    }

    /**
     * Check if an object is near the character (within collision range)
     * @param {DrawableObject} obj - Object to check
     * @returns {boolean}
     */
    isNearCharacter(obj) {
        return Math.abs(obj.xCoordinate - this.world.character.xCoordinate) < CollisionHandler.CULLING_RANGE;
    }

    /**
     * Check and handle enemy collisions
     */
    checkEnemyCollisions() {
        for (let i = this.world.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.world.level.enemies[i];
            if (!this.isNearCharacter(enemy)) continue;
            if (this.world.character.isColliding(enemy)) {
                this.handleEnemyHit(enemy, i);
            }
        }
    }

    /**
     * Handle a collision between the character and an enemy
     * @param {MovableObject} enemy - The enemy that was hit
     * @param {number} index - Index of the enemy in the array
     */
    handleEnemyHit(enemy, index) {
        const isStomp = this.isStomp(enemy);

        if (isStomp && !(enemy instanceof Endboss)) {
            this.world.level.enemies.splice(index, 1);
            this.world.character.yVelocity = -CollisionHandler.ENEMY_BOUNCE_FORCE;
            const sfx = enemy instanceof SmallChicken ? SmallChicken.AUDIO_SMALL_CHICKEN : Chicken.AUDIO_CHICKEN;
            AudioManager.getInstance().playSFX(sfx);
        } else if (isStomp && enemy instanceof Endboss) {
            this.world.character.yVelocity = -CollisionHandler.ENEMY_BOUNCE_FORCE;
        } else {
            const wasHurt = this.world.character.hit(CollisionHandler.ENEMY_DAMAGE);
            if (wasHurt) {
                this.world.healthBar.setPercentage(this.world.character.health);
                AudioManager.getInstance().playSFX(Character.AUDIO_HURT);
            }
        }
    }

    /**
     * Check if the collision is a stomp (character landed on enemy from above)
     * @param {MovableObject} enemy - The enemy to check against
     * @returns {boolean}
     */
    isStomp(enemy) {
        const character = this.world.character;
        const wasMovingDown = character.yCoordinate > character.previousY;
        const previousBottom = character.previousY + character.height - character.collisionOffsetHeight;
        const enemyTop = enemy.yCoordinate + enemy.collisionOffsetY;
        return wasMovingDown && previousBottom <= enemyTop;
    }

    /**
     * Check and handle bottle-enemy collisions
     */
    checkBottleEnemyCollisions() {
        this.world.thrownBottles.forEach(bottle => {
            if (bottle.isSplashing) return;
            this.checkSingleBottleAgainstEnemies(bottle);
        });
    }

    /**
     * Check a single thrown bottle against all enemies
     * @param {ThrowableObject} bottle - The thrown bottle
     */
    checkSingleBottleAgainstEnemies(bottle) {
        for (let i = this.world.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.world.level.enemies[i];
            if (Math.abs(bottle.xCoordinate - enemy.xCoordinate) > CollisionHandler.CULLING_RANGE) continue;
            if (bottle.isColliding(enemy)) {
                this.applyBottleHit(bottle, enemy, i);
                break;
            }
        }
    }

    /**
     * Apply the effect of a bottle hitting an enemy
     * @param {ThrowableObject} bottle - The thrown bottle
     * @param {MovableObject} enemy - The enemy that was hit
     * @param {number} index - Index of the enemy in the array
     */
    applyBottleHit(bottle, enemy, index) {
        bottle.splash();
        if (enemy instanceof Endboss) {
            enemy.hit(ThrowableObject.DAMAGE);
            this.world.endbossBar.setPercentage((enemy.health / Endboss.MAX_HEALTH) * 100);
            AudioManager.getInstance().playSFX(Endboss.AUDIO_BOSS);
        } else {
            this.world.level.enemies.splice(index, 1);
        }
    }

    /**
     * Check and handle coin collisions
     */
    checkCoinCollisions() {
        for (let i = this.world.level.coins.length - 1; i >= 0; i--) {
            const coin = this.world.level.coins[i];
            if (this.world.coinsCollected >= World.ITEMS_PER_FULL_BAR) continue;
            if (!this.isNearCharacter(coin)) continue;
            if (this.world.character.isColliding(coin)) {
                this.world.level.coins.splice(i, 1);
                this.world.coinsCollected++;
                AudioManager.getInstance().playSFX(Coin.AUDIO_COIN);
                const coinPercentage = Math.min(100, (this.world.coinsCollected / World.ITEMS_PER_FULL_BAR) * 100);
                this.world.coinBar.setPercentage(coinPercentage);
            }
        }
    }

    /**
     * Check and handle bottle pickup collisions
     */
    checkBottleCollisions() {
        for (let i = this.world.level.bottles.length - 1; i >= 0; i--) {
            const bottle = this.world.level.bottles[i];
            if (this.world.bottlesCollected >= World.ITEMS_PER_FULL_BAR) continue;
            if (!this.isNearCharacter(bottle)) continue;
            if (this.world.character.isColliding(bottle)) {
                this.world.level.bottles.splice(i, 1);
                this.world.bottlesCollected++;
                AudioManager.getInstance().playSFX(Bottle.AUDIO_PICKUP);
                const bottlePercentage = Math.min(100, (this.world.bottlesCollected / World.ITEMS_PER_FULL_BAR) * 100);
                this.world.bottleBar.setPercentage(bottlePercentage);
            }
        }
    }
}
