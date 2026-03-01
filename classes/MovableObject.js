// MovableObject - Base class for objects that can move

class MovableObject extends DrawableObject {
    OBJECT_SPEED;
    yVelocity = 0;
    isJumping = false;
    previousY = 0;

    /**
     * Create a movable object
     * @param {number} width - Width of the object
     * @param {number} height - Height of the object
     * @param {number} speed - Movement speed
     */
    constructor(width, height, speed) {
        super(0, 0, width, height);
        this.OBJECT_SPEED = speed;
    }

    /**
     * Move the object to the left by its speed
     */
    moveLeft() {
        this.xCoordinate -= this.OBJECT_SPEED;
    }

    /**
     * Move the object to the right by its speed
     */
    moveRight() {
        this.xCoordinate += this.OBJECT_SPEED;
    }

    /**
     * Make the object jump by setting vertical velocity
     */
    jump() {
        if (!this.isJumping) {
            this.yVelocity = -CHARACTER_JUMP_FORCE;
            this.isJumping = true;
        }
    }

    /**
     * Apply gravity to the object, pulling it down each frame
     * Stops the object at ground level
     */
    applyGravity() {
        this.previousY = this.yCoordinate;
        this.yVelocity += GRAVITY;
        this.yCoordinate += this.yVelocity;

        // Stop at ground level
        if (this.yCoordinate >= GROUND_LEVEL) {
            this.yCoordinate = GROUND_LEVEL;
            this.yVelocity = 0;
            this.isJumping = false;
        }
    }
}
