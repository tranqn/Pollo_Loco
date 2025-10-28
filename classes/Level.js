// Level - Level data and configuration

class Level 
{
    clouds = [];
    chickens = [];
    backgroundObjects = []
    bottles = [];
    coins = [];
    endboss = null;
    levelEndX = WORLD_END_X;

    constructor(clouds, chickens, backgroundObjects, bottles, coins, endboss) {
        this.clouds = clouds;
        this.chickens = chickens;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
    }
}
