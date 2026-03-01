/**
 * ============================================
 * GAME CONSTANTS
 * ============================================
 * All magic numbers and image paths centralized here for clean code
 */

// ============================================
// DOM ELEMENTS
// ============================================
let START_SCREEN = document.getElementById('start-screen');

// ============================================
// CANVAS SETTINGS
// ============================================
const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 480;
const CANVAS_ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT;

// ============================================
// GAME SETTINGS
// ============================================
const FPS = 60;
const FRAME_INTERVAL = 1000 / FPS;
// Level boundaries based on background tiles
// Last background starts at 719*2=1438, width is 720, so ends at 1438+720=2158
const LEVEL_END_X = 2158; // End of the level (where last background ends)
const CAMERA_MAX_X = LEVEL_END_X - CANVAS_WIDTH; // 2158 - 720 = 1438 (max camera position)

// ============================================
// PHYSICS CONSTANTS
// ============================================
const GRAVITY = 2.5;
const GROUND_LEVEL = 180; // Y-position where characters stand
const ENEMY_BOUNCE_FORCE = 15; // Bounce when jumping on enemy (half of jump force)

// ============================================
// CHARACTER CONSTANTS
// ============================================
const CHARACTER_WIDTH = 120;
const CHARACTER_HEIGHT = 280;
const CHARACTER_SPEED = 5;
const CHARACTER_JUMP_FORCE = 30;
const CHARACTER_MAX_HEALTH = 100;
const CHARACTER_DEFAULT_DAMAGE = 20; // Default damage value for hit() function
const CHARACTER_IDLE_TIMEOUT = 15000; // Time before long idle animation (15 seconds)

// Character collision box offsets (smaller hitbox for fairer gameplay)
// Character sprite: 120×280 → Effective hitbox: 80×150
const CHARACTER_COLLISION_OFFSET_X = 20;      // Left side inset (20px from left)
const CHARACTER_COLLISION_OFFSET_Y = 100;     // Top side inset (100px from top - excludes hat)
const CHARACTER_COLLISION_OFFSET_WIDTH = 20;  // Right side inset (20px from right)
const CHARACTER_COLLISION_OFFSET_HEIGHT = 30; // Bottom side inset (30px from bottom)

// ============================================
// ENEMY CONSTANTS
// ============================================
const CHICKEN_WIDTH = 60;
const CHICKEN_HEIGHT = 70;
const CHICKEN_SPEED = 3;

// Chicken collision box offsets
// Chicken sprite: 60×70 → Effective hitbox: 50×60
const CHICKEN_COLLISION_OFFSET_X = 5;        // Left inset
const CHICKEN_COLLISION_OFFSET_Y = 5;        // Top inset
const CHICKEN_COLLISION_OFFSET_WIDTH = 5;    // Right inset
const CHICKEN_COLLISION_OFFSET_HEIGHT = 5;   // Bottom inset

const SMALL_CHICKEN_WIDTH = 50;
const SMALL_CHICKEN_HEIGHT = 60;
const SMALL_CHICKEN_SPEED = 4;

// Small chicken collision box offsets
// Small chicken sprite: 50×60 → Effective hitbox: 40×50
const SMALL_CHICKEN_COLLISION_OFFSET_X = 5;        // Left inset
const SMALL_CHICKEN_COLLISION_OFFSET_Y = 5;        // Top inset
const SMALL_CHICKEN_COLLISION_OFFSET_WIDTH = 5;    // Right inset
const SMALL_CHICKEN_COLLISION_OFFSET_HEIGHT = 5;   // Bottom inset

const ENDBOSS_WIDTH = 250;
const ENDBOSS_HEIGHT = 400;
const ENDBOSS_SPEED = 2;
const ENDBOSS_MAX_HEALTH = 100; // Dies in 5 hits (5 x 20 damage = 100)
const ENDBOSS_ALERT_DISTANCE = 500;

// Enemy damage
const ENEMY_DAMAGE = 5; // Damage dealt by regular enemies to character

// Endboss collision box offsets
// Endboss sprite: 250×400 → Effective hitbox: 170×230
const ENDBOSS_COLLISION_OFFSET_X = 40;       // Left inset
const ENDBOSS_COLLISION_OFFSET_Y = 70;       // Top inset
const ENDBOSS_COLLISION_OFFSET_WIDTH = 40;   // Right inset
const ENDBOSS_COLLISION_OFFSET_HEIGHT = 100; // Bottom inset

// ============================================
// COLLECTIBLE CONSTANTS
// ============================================
const COIN_WIDTH = 60;  // Increased from 40 for better visibility
const COIN_HEIGHT = 60; // Increased from 40 for better visibility
const COIN_VALUE = 10;

// Coin collision box offsets (keep generous for easier collection)
// Coin sprite: 60×60 → Effective hitbox: 40×40
const COIN_COLLISION_OFFSET_X = 10;        // Left inset
const COIN_COLLISION_OFFSET_Y = 10;        // Top inset
const COIN_COLLISION_OFFSET_WIDTH = 10;    // Right inset
const COIN_COLLISION_OFFSET_HEIGHT = 10;   // Bottom inset

const BOTTLE_WIDTH = 60;
const BOTTLE_HEIGHT = 70;
const BOTTLE_Y = GROUND_LEVEL + (CHARACTER_HEIGHT - BOTTLE_HEIGHT); // Y position for bottles on ground

// Bottle collision box offsets (keep generous for easier collection)
// Bottle sprite: 60×70 → Effective hitbox: 40×50
const BOTTLE_COLLISION_OFFSET_X = 10;        // Left inset
const BOTTLE_COLLISION_OFFSET_Y = 10;        // Top inset
const BOTTLE_COLLISION_OFFSET_WIDTH = 10;    // Right inset
const BOTTLE_COLLISION_OFFSET_HEIGHT = 10;   // Bottom inset

// ============================================
// THROWABLE OBJECT CONSTANTS
// ============================================
const THROWABLE_SPEED = 15;
const THROWABLE_GRAVITY = 2;
const THROWABLE_DAMAGE = 20;

// Throwable collision box offsets (keep tight for precise hits)
// Throwable sprite: 60×70 → Effective hitbox: 50×60
const THROWABLE_COLLISION_OFFSET_X = 5;        // Left inset
const THROWABLE_COLLISION_OFFSET_Y = 5;        // Top inset
const THROWABLE_COLLISION_OFFSET_WIDTH = 5;    // Right inset
const THROWABLE_COLLISION_OFFSET_HEIGHT = 5;   // Bottom inset

// ============================================
// ANIMATION SPEEDS (in milliseconds)
// ============================================
const ANIMATION_SPEED_FAST = 50;
const ANIMATION_SPEED_NORMAL = 100;
const ANIMATION_SPEED_SLOW = 200;

// Jump animation timing - calculated to sync with jump physics
// Jump duration = 2 * JUMP_FORCE / GRAVITY = 2 * 30 / 2.5 = 24 frames = 400ms at 60 FPS
// Jump animation has 9 frames, so: 400ms / 9 ≈ 44ms per frame
const ANIMATION_SPEED_JUMP = 45;

// ============================================
// STATUS BAR CONSTANTS
// ============================================
const STATUSBAR_WIDTH = 200;
const STATUSBAR_HEIGHT = 60;
const STATUSBAR_PADDING = 20;

// ============================================
// IMAGE PATHS - CHARACTER (PEPE)
// ============================================
const IMAGES_CHARACTER_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
];

const IMAGES_CHARACTER_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
];

const IMAGES_CHARACTER_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
];

const IMAGES_CHARACTER_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
];

const IMAGES_CHARACTER_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
];

const IMAGES_CHARACTER_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
];

// ============================================
// IMAGE PATHS - ENEMIES (CHICKENS)
// ============================================
const IMAGES_CHICKEN_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
];

const IMAGES_CHICKEN_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
];

const IMAGES_SMALL_CHICKEN_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
];

const IMAGES_SMALL_CHICKEN_DEAD = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
];

// ============================================
// IMAGE PATHS - ENDBOSS
// ============================================
const IMAGES_ENDBOSS_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
];

const IMAGES_ENDBOSS_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
];

const IMAGES_ENDBOSS_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
];

const IMAGES_ENDBOSS_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
];

const IMAGES_ENDBOSS_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
];

// ============================================
// IMAGE PATHS - COLLECTIBLES
// ============================================
const IMAGES_COIN = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
];

const IMAGES_BOTTLE_GROUND = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
];

const IMAGES_BOTTLE_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
];

const IMAGES_BOTTLE_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
];

// ============================================
// IMAGE PATHS - BACKGROUND
// ============================================
const IMAGES_BACKGROUND_LAYER_1 = [
    'img/5_background/layers/1_first_layer/1.png',
    'img/5_background/layers/1_first_layer/2.png'
];

const IMAGES_BACKGROUND_LAYER_2 = [
    'img/5_background/layers/2_second_layer/1.png',
    'img/5_background/layers/2_second_layer/2.png'
];

const IMAGES_BACKGROUND_LAYER_3 = [
    'img/5_background/layers/3_third_layer/1.png',
    'img/5_background/layers/3_third_layer/2.png'
];

const IMAGES_BACKGROUND_CLOUDS = [
    'img/5_background/layers/4_clouds/1.png',
    'img/5_background/layers/4_clouds/2.png'
];

const IMAGE_BACKGROUND_AIR = 'img/5_background/layers/air.png';

// Moving cloud object (not background layer)
const IMAGE_CLOUD = 'img/5_background/layers/4_clouds/1.png';

// ============================================
// IMAGE PATHS - STATUS BARS (GREEN THEME)
// ============================================
const IMAGES_STATUSBAR_HEALTH = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
];

const IMAGES_STATUSBAR_COIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
];

const IMAGES_STATUSBAR_BOTTLE = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
];

const IMAGES_STATUSBAR_ENDBOSS = [
    'img/7_statusbars/2_statusbar_endboss/green/green0.png',
    'img/7_statusbars/2_statusbar_endboss/green/green20.png',
    'img/7_statusbars/2_statusbar_endboss/green/green40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png'
];

// ============================================
// IMAGE PATHS - ICONS
// ============================================
const IMAGE_ICON_COIN = 'img/7_statusbars/3_icons/icon_coin.png';
const IMAGE_ICON_HEALTH = 'img/7_statusbars/3_icons/icon_health.png';
const IMAGE_ICON_BOTTLE = 'img/7_statusbars/3_icons/icon_salsa_bottle.png';
const IMAGE_ICON_ENDBOSS_HEALTH = 'img/7_statusbars/3_icons/icon_health_endboss.png';

// ============================================
// IMAGE PATHS - GAME SCREENS
// ============================================
const IMAGES_START_SCREEN = [
    'img/9_intro_outro_screens/start/startscreen_1.png',
    'img/9_intro_outro_screens/start/startscreen_2.png'
];

const IMAGES_GAME_OVER = [
    'img/You won, you lost/You lost.png',
    'img/You won, you lost/Game Over.png'
];

const IMAGES_WIN_SCREEN = [
    'img/You won, you lost/You Won B.png',
    'img/You won, you lost/You win B.png'
];

// ============================================
// CLOUD CONSTANTS
// ============================================
const CLOUD_WIDTH = 500;
const CLOUD_HEIGHT = 250;
const CLOUD_SPEED = 0.5;
const CLOUD_SPREAD_RANGE = 2000;
const CLOUD_Y_MIN = 20;
const CLOUD_Y_RANGE = 130;

// ============================================
// GAMEPLAY CONSTANTS
// ============================================
const CHARACTER_START_X = 100;
const HURT_DURATION = 2000;
const THROW_COOLDOWN = 500;
const THROW_HAND_LEVEL = 170;
const THROW_INITIAL_VELOCITY = -25;
const SPLASH_DURATION = 500;
const ITEMS_PER_FULL_BAR = 10;
const CAMERA_OFFSET_X = 100;
const ENDBOSS_VISIBILITY_BUFFER = 100;
const GAMEOVER_DELAY = 1000;
const VICTORY_DELAY = 1500;
const CHICKEN_SPAWN_MIN_X = 300;
const CHICKEN_SPAWN_RANGE = 1200;
const CHICKEN_PATROL_WIDTH = 500;

// ============================================
// AUDIO PATHS
// ============================================
const AUDIO_MUSIC_BG = 'audio/music/desert-theme.mp3';
const AUDIO_MUSIC_GAMEOVER = 'audio/music/game-over.mp3';
const AUDIO_SFX_WALK = 'audio/sfx/walk.mp3';
const AUDIO_SFX_JUMP = 'audio/sfx/jump.mp3';
const AUDIO_SFX_HURT = 'audio/sfx/hurt.mp3';
const AUDIO_SFX_DEATH = 'audio/sfx/death.mp3';
const AUDIO_SFX_CHICKEN = 'audio/sfx/chicken-cluck.mp3';
const AUDIO_SFX_BOSS = 'audio/sfx/chicken-boss.mp3';
const AUDIO_SFX_COIN = 'audio/sfx/coin-pickup.mp3';
const AUDIO_SFX_BOTTLE_PICKUP = 'audio/sfx/bottle-pickup.mp3';
const AUDIO_SFX_BOTTLE_THROW = 'audio/sfx/bottle-throw.mp3';
const AUDIO_SFX_BOTTLE_BREAK = 'audio/sfx/bottle-break.mp3';
const AUDIO_SFX_VICTORY = 'audio/sfx/victory.mp3';
const AUDIO_SFX_SNORING = 'audio/sfx/snoring.mp3';
