// Cloud - Moving clouds in the sky

class Cloud extends MovableObject {
    /**
     * Create a cloud that floats slowly across the sky
     */
    constructor() {
        // Initialize with cloud dimensions and speed
        super(CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SPEED);

        // Load cloud image
        this.img = new Image();
        this.img.src = IMAGE_CLOUD;

        // Random starting position
        // X: Start somewhere in the level (random position)
        this.xCoordinate = Math.random() * CLOUD_SPREAD_RANGE;

        // Y: Random height in upper part of sky
        this.yCoordinate = CLOUD_Y_MIN + Math.random() * CLOUD_Y_RANGE;
    }

    /**
     * Update cloud position (called every frame)
     * Clouds drift slowly to the left
     */
    update() {
        // Move cloud left at constant speed
        this.moveLeft();
    }
}
