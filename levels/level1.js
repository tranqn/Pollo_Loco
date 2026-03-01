// Level 1 data

/**
 * Creates a fresh level1 object with all enemies, coins, and bottles
 * Used for initial load and when restarting the game
 */
function createLevel1() {
    return {
    // Enemies - mix of regular chickens, small chickens, and endboss
    enemies: [
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Endboss()  // Final boss at end of level
    ],

    // Clouds - floating decorative elements
    clouds: [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],

    // Background layers - tiled across the level
    // Each position (x-coordinate) has all 4 layers stacked for depth
    backgroundObjects: [
        // Position -719 (left offscreen for scrolling)
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719),

        // Position 0 (visible at start)
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 0),

        // Position 719 (visible at start)
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719),

        // Position 1438 (right offscreen for scrolling)
        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 2)
    ],

    // Coins - between character (x=100) and before Endboss (x=1500)
    coins: [
        new Coin(350, 200),  // Floating in air
        new Coin(500, 150),  // Higher in air
        new Coin(650, 180),  // Mid-height
        new Coin(800, 200),  // Floating
        new Coin(950, GROUND_LEVEL), // On ground
        new Coin(1050, 150), // Higher
        new Coin(1150, 180), // Mid-height
        new Coin(1250, 150), // Higher
        new Coin(1350, GROUND_LEVEL), // On ground
        new Coin(1450, 200)  // Floating
    ],

    // Bottles - between character and before Endboss
    bottles: [
        new Bottle(400),
        new Bottle(550),
        new Bottle(700),
        new Bottle(850),
        new Bottle(1000),
        new Bottle(1150),
        new Bottle(1300),
        new Bottle(1400),
        new Bottle(1500),
        new Bottle(1600)
    ]
    };
}

// Initialize level1 on first load
let level1 = createLevel1();

