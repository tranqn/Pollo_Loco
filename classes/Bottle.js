// Bottle - Collectible and throwable bottles

class Bottle extends ThrowableObject {
    xCoordinate;
    yCoordinate;
    width;
    height;

    IMAGES_BOTTLE = [];

    constructor(xCoordinate) {
        super();
        this.xCoordinate = xCoordinate;
        this.yCoordinate = GROUND_LEVEL;
        this.width = 50;
        this.height = 100;
        this.loadImages(this.IMAGES_BOTTLE, ImagePaths);
    }
}
