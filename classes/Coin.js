// Coin - Collectible coins

class Coin extends MovableObject {
    IMAGES_COIN = [];


    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN, ImagePath);
    }
}
