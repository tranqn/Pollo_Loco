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

// ============================================
// PHYSICS CONSTANTS
// ============================================
const GRAVITY = 2.5;
const GROUND_LEVEL = 180; // Y-position where characters stand

// ============================================
// CHARACTER CONSTANTS
// ============================================
const CHARACTER_WIDTH = 120;
const CHARACTER_HEIGHT = 280;
const CHARACTER_SPEED = 5;
const CHARACTER_JUMP_FORCE = 30;
const CHARACTER_MAX_HEALTH = 100;
const CHARACTER_IDLE_TIMEOUT = 5000; // Time before long idle animation (5 seconds)

// ============================================
// ENEMY CONSTANTS
// ============================================
const CHICKEN_WIDTH = 60;
const CHICKEN_HEIGHT = 70;
const CHICKEN_SPEED = 3;

const SMALL_CHICKEN_WIDTH = 50;
const SMALL_CHICKEN_HEIGHT = 60;
const SMALL_CHICKEN_SPEED = 4;

const ENDBOSS_WIDTH = 250;
const ENDBOSS_HEIGHT = 400;
const ENDBOSS_SPEED = 2;
const ENDBOSS_MAX_HEALTH = 100;
const ENDBOSS_ALERT_DISTANCE = 500;

// ============================================
// COLLECTIBLE CONSTANTS
// ============================================
const COIN_WIDTH = 40;
const COIN_HEIGHT = 40;
const COIN_VALUE = 10;

const BOTTLE_WIDTH = 60;
const BOTTLE_HEIGHT = 70;

// ============================================
// THROWABLE OBJECT CONSTANTS
// ============================================
const THROWABLE_SPEED = 15;
const THROWABLE_GRAVITY = 2;
const THROWABLE_DAMAGE = 20;

// ============================================
// ANIMATION SPEEDS (in milliseconds)
// ============================================
const ANIMATION_SPEED_FAST = 50;
const ANIMATION_SPEED_NORMAL = 100;
const ANIMATION_SPEED_SLOW = 200;

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
