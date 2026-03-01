// Keyboard - Keyboard input handling

/**
 * Stores the current state of keyboard inputs
 * Each property is true when the corresponding key is held down
 */
class Keyboard {
    /** @type {boolean} Left arrow key state */
    LEFT = false;
    /** @type {boolean} Right arrow key state */
    RIGHT = false;
    /** @type {boolean} Space bar state (jump) */
    SPACE = false;
    /** @type {boolean} D key state (throw bottle) */
    D = false;
}
