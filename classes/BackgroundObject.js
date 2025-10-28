// BackgroundObject - Background images

class BackgroundObject extends DrawableObject {
    BACKGROUND_IMAGE_PATH;


    constructor(imagePaths, x) {
        super(x, 0, 720, 480);
        this.loadImages(BACKGROUND_IMAGE_PATH, imagePaths);
    }

}
