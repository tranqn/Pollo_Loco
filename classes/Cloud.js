// Cloud - Background clouds

class Cloud extends MovableObject {
    IMAGES_CLOUD = [];
    
    constructor() {
        super();
        this.loadImages(this.IMAGES_CLOUD, ImagePaths);
    }
}
