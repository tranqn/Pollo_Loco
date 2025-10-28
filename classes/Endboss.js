// Endboss - Boss enemy class

class Endboss extends MovableObject {
    IMAGES_WALKING = [];
    IMAGES_ALERT = []
    IMAGES_ATTACK = [];
    IMAGES_HURT = [];
    IMAGES_DEAD = [];

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING, ImagePaths);
        this.loadImages(this.IMAGES_ALERT, ImagePaths);
        this.loadImages(this.IMAGES_ATTACK, ImagePaths);
        this.loadImages(this.IMAGES_HURT, ImagePaths);
        this.loadImages(this.IMAGES_DEAD, ImagePaths);
    }
}
