// Level 1 data

const level1 = {
    // Enemies - chickens that walk across the level
    enemies: [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken()
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

    // Coins - collectibles scattered throughout the level
    coins: [
        new Coin(400, 200),  // Floating in air
        new Coin(600, 150),  // Higher in air
        new Coin(800, 200),  // Floating
        new Coin(1000, GROUND_LEVEL), // On ground
        new Coin(1200, 180), // Mid-height
        new Coin(1400, 150), // Higher
        new Coin(1600, GROUND_LEVEL), // On ground
        new Coin(1800, 200)  // Floating
    ],

    // Bottles - collectibles on the ground (can be thrown later)
    bottles: [
        new Bottle(500),
        new Bottle(700),
        new Bottle(900),
        new Bottle(1300),
        new Bottle(1700),
        new Bottle(1900)
    ]
};

