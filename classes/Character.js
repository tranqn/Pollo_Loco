// Character - The player character (Pepe)

class Character extends MovableObject {
    IMAGES_IDLE = [];
    IMAGES_LONG_IDLE = [];
    IMAGES_WALKING = [];
    IMAGES_JUMPING = [];
    IMAGES_HURT = [];
    IMAGES_DEAD = [];

    keyboard;
    currentState = 'idle'; // idle, walking, jumping
    lastActionTime = Date.now();
    animationInterval;
    spaceWasPressed = false; // Track if space was pressed (for jump release detection)

    constructor(keyboard) {
        super(CHARACTER_WIDTH, CHARACTER_HEIGHT, CHARACTER_SPEED);

        this.keyboard = keyboard;

        // Load all animation images into cache
        this.loadImages(this.IMAGES_IDLE, IMAGES_CHARACTER_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE, IMAGES_CHARACTER_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING, IMAGES_CHARACTER_WALKING);
        this.loadImages(this.IMAGES_JUMPING, IMAGES_CHARACTER_JUMPING);
        this.loadImages(this.IMAGES_HURT, IMAGES_CHARACTER_HURT);
        this.loadImages(this.IMAGES_DEAD, IMAGES_CHARACTER_DEAD);

        // Set initial image (first frame of idle animation)
        this.img = this.IMAGES_CACHE[IMAGES_CHARACTER_IDLE[0]];

        // Set initial position
        this.xCoordinate = 100;  // Start position X
        this.yCoordinate = GROUND_LEVEL;  // Start on ground (180px)

        // Start animation loop
        this.startAnimation();
    }

    /**
     * Update character state (called every frame)
     * Handles movement, physics, and state changes
     */
    update() {
        // Handle keyboard input for movement
        this.handleMovement();

        // Apply gravity (makes character fall and stay on ground)
        this.applyGravity();

        // Update state based on actions
        this.updateState();
    }

    /**
     * Handle keyboard input for movement
     */
    handleMovement() {
        // Move right (can move to end of level)
        if (this.keyboard.RIGHT && this.xCoordinate < LEVEL_END_X - this.width) {
            this.moveRight();
            this.lastActionTime = Date.now();
        }

        // Move left (can move to start of level)
        if (this.keyboard.LEFT && this.xCoordinate > 0) {
            this.moveLeft();
            this.lastActionTime = Date.now();
        }

        // Jump - only if space pressed AND was released before
        // This prevents "holding spacebar" from causing double jumps
        if (this.keyboard.SPACE && !this.isJumping && !this.spaceWasPressed) {
            this.jump();
            this.lastActionTime = Date.now();
            this.spaceWasPressed = true; // Mark as pressed
        }

        // Reset when spacebar is released
        if (!this.keyboard.SPACE) {
            this.spaceWasPressed = false;
        }
    }

    /**
     * Update character state based on actions
     */
    updateState() {
        if (this.isJumping) {
            this.currentState = 'jumping';
        } else if (this.keyboard.LEFT || this.keyboard.RIGHT) {
            this.currentState = 'walking';
        } else {
            // Check if idle for long time
            if (Date.now() - this.lastActionTime > CHARACTER_IDLE_TIMEOUT) {
                this.currentState = 'longIdle';
            } else {
                this.currentState = 'idle';
            }
        }
    }

    /**
     * Start animation loop (separate from game loop)
     * Switches animation frames at set interval
     * Uses different speeds for different animations
     */
    startAnimation() {
        let lastState = '';

        this.animationInterval = setInterval(() => {
            // If state changed to jumping, switch to fast animation
            if (lastState !== this.currentState && this.currentState === 'jumping') {
                clearInterval(this.animationInterval);
                this.startFastJumpAnimation();
                return;
            }
            lastState = this.currentState;

            // Play animation based on current state
            if (this.currentState === 'walking') {
                this.playAnimation(IMAGES_CHARACTER_WALKING);
            } else if (this.currentState === 'jumping') {
                this.playAnimation(IMAGES_CHARACTER_JUMPING);
            } else if (this.currentState === 'longIdle') {
                this.playAnimation(IMAGES_CHARACTER_LONG_IDLE);
            } else {
                // Default idle
                this.playAnimation(IMAGES_CHARACTER_IDLE);
            }
        }, ANIMATION_SPEED_NORMAL);
    }

    /**
     * Fast animation specifically for jumping
     * Runs at 45ms to sync all 9 frames with jump duration
     */
    startFastJumpAnimation() {
        this.animationInterval = setInterval(() => {
            // Play animation based on current state
            if (this.currentState === 'walking') {
                this.playAnimation(IMAGES_CHARACTER_WALKING);
            } else if (this.currentState === 'jumping') {
                this.playAnimation(IMAGES_CHARACTER_JUMPING);
            } else if (this.currentState === 'longIdle') {
                this.playAnimation(IMAGES_CHARACTER_LONG_IDLE);
            } else {
                // Default idle
                this.playAnimation(IMAGES_CHARACTER_IDLE);
            }

            // Switch back to normal speed when no longer jumping
            if (this.currentState !== 'jumping') {
                clearInterval(this.animationInterval);
                this.startAnimation();
            }
        }, ANIMATION_SPEED_JUMP);
    }

    /**
     * Play an animation by cycling through frames
     * @param {Array} images - Array of image paths
     */
    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.IMAGES_CACHE[path];
        this.currentImageIndex++;
    }
}
