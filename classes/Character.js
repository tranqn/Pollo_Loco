// Character - The player character (Pepe)

class Character extends MovableObject {
    IMAGES_IDLE = [];
    IMAGES_LONG_IDLE = [];
    IMAGES_WALKING = [];
    IMAGES_JUMPING = [];
    IMAGES_HURT = [];
    IMAGES_DEAD = [];

    constructor() {
        super(CHARACTER_WIDTH, CHARACTER_HEIGHT, CHARACTER_SPEED);

        // Load all animation images into cache
        this.loadImages(this.IMAGES_IDLE, IMAGES_CHARACTER_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE, IMAGES_CHARACTER_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING, IMAGES_CHARACTER_WALKING);
        this.loadImages(this.IMAGES_JUMPING, IMAGES_CHARACTER_JUMPING);
        this.loadImages(this.IMAGES_HURT, IMAGES_CHARACTER_HURT);
        this.loadImages(this.IMAGES_DEAD, IMAGES_CHARACTER_DEAD);

        // Set initial image (first frame of idle animation)
        // This ensures the character has an image to draw immediately
        this.img = this.IMAGES_CACHE[IMAGES_CHARACTER_IDLE[0]];

        // Set initial position
        this.xCoordinate = 100;  // Start position X
        this.yCoordinate = GROUND_LEVEL;  // Start on ground (180px)
    }
}
