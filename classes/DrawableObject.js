// DrawableObject - Base class for all drawable game objects

class DrawableObject {
    xCoordinate;
    yCoordinate;
    width;
    height;
    IMAGES_CACHE = {};
    currentImageIndex = 0;
    intervals = []; // To track setInterval IDs for cleanup
    
    constructor(xCoordinate, yCoordinate, width, height) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.width = width;
        this.height = height;
    }

    draw()
    {
        
    }

    loadImages(STORAGE, IMAGES_PATHS)
    {
        IMAGES_PATHS.forEach((path) => {
            let img = new Image();
            img.src = path;
            STORAGE.push(img);
            this.IMAGES_CACHE[path] = img;
        });
    }

}
