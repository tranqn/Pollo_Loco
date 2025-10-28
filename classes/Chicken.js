// Chicken - Enemy class

class Chicken extends MovableObject {
    IMAGES_WALKING = [];
    
    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING, ImagePaths);
    }
}
