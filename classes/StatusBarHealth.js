// StatusBar - Base class for status bars

class StatusBarHealth extends StatusBar {
    IMAGES_STATUSBAR = [];

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR, ImagePaths);
    }
}
