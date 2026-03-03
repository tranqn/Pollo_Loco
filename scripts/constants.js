/**
 * @file constants.js
 * @description Shared global constants used across multiple classes.
 */

// #region Global Image Cache
const GLOBAL_IMAGE_CACHE = {};

/**
 * Get a cached Image object for a given path, creating it if needed
 * @param {string} path - Image file path
 * @returns {HTMLImageElement} Cached image element
 */
function getCachedImage(path) {
    if (!GLOBAL_IMAGE_CACHE[path]) {
        const img = new Image();
        img.src = path;
        GLOBAL_IMAGE_CACHE[path] = img;
    }
    return GLOBAL_IMAGE_CACHE[path];
}
// #endregion

// #region Canvas Settings
const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 480;
// #endregion

// #region Physics
const FPS = 60;
const FRAME_INTERVAL = 1000 / FPS;
const GRAVITY = 0.3;
const GROUND_LEVEL = 180;
const LEVEL_END_X = 2158;
// #endregion

// #region Animation Speeds
const ANIMATION_SPEED_FAST = 50;
const ANIMATION_SPEED_NORMAL = 100;

// Jump duration = 2 * JUMP_FORCE / GRAVITY = 2 * 9 / 0.3 ≈ 60 frames = 1000ms at 60 FPS
// 1000ms / 9 frames ≈ 111ms per frame
const ANIMATION_SPEED_JUMP = 111;
// #endregion

// #region Gameplay Timing
const HURT_DURATION = 1000;
const SPLASH_DURATION = 500;
// #endregion

// #region Background Animation
const BG_PARTICLE_COUNT = 120;
const BG_PARTICLE_MAX_RADIUS = 2.5;
const BG_PARTICLE_MIN_RADIUS = 0.5;
const BG_PARTICLE_SPEED = 0.3;
const BG_PARTICLE_MIN_OPACITY = 0.15;
const BG_PARTICLE_OPACITY_RANGE = 0.4;
const BG_PARTICLE_WRAP_MARGIN = 10;
const BG_MOUSE_INFLUENCE_RADIUS = 250;
const BG_MOUSE_INFLUENCE_STRENGTH = 2;
const BG_MOUSE_FORCE_SCALE = 0.08;
const BG_VELOCITY_DAMPING = 0.97;
const BG_PARALLAX_STRENGTH = 20;
const BG_PARALLAX_DEPTH_STEP = 0.3;
const BG_LINE_DISTANCE = 120;
const BG_LINE_OPACITY = 0.15;
const BG_MOUSE_LINE_DISTANCE = 180;
const BG_MOUSE_LINE_OPACITY = 0.25;
const BG_MOUSE_GLOW_RADIUS = 200;
const BG_MOUSE_GLOW_OPACITY = 0.04;
// #endregion
