// Level - Level data and configuration

/**
 * @class Level
 * @description Holds all data for a game level including enemies, clouds, backgrounds, and collectibles.
 */
class Level
{
    clouds = [];
    chickens = [];
    backgroundObjects = []
    bottles = [];
    coins = [];
    endboss = null;
    levelEndX = LEVEL_END_X;

    /**
     * Create a game level
     * @param {Array<Cloud>} clouds - Array of cloud objects
     * @param {Array<MovableObject>} chickens - Array of enemy objects
     * @param {Array<BackgroundObject>} backgroundObjects - Array of background layer objects
     * @param {Array<Bottle>} bottles - Array of collectible bottle objects
     * @param {Array<Coin>} coins - Array of collectible coin objects
     * @param {Endboss} endboss - The endboss object
     */
    constructor(clouds, chickens, backgroundObjects, bottles, coins, endboss) {
        this.clouds = clouds;
        this.chickens = chickens;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
    }
}
