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
        this.xCoordinate = Math.random() * 2000; // Spread across level

        // Y: Random height in upper part of sky (20 to 150 pixels from top)
        this.yCoordinate = 20 + Math.random() * 130;
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
