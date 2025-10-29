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

    /**
     * Draws the object on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context
     */
    draw(ctx)
    {
        // Only draw if we have an image loaded
        if (!this.img) {
            console.warn(`No image loaded for ${this.constructor.name} at (${this.xCoordinate}, ${this.yCoordinate})`);
            return;
        }

        // Draw the image at the object's position
        ctx.drawImage(
            this.img,           // The image to draw
            this.xCoordinate,   // X position on canvas
            this.yCoordinate,   // Y position on canvas
            this.width,         // Width to draw
            this.height         // Height to draw
        );
    }

    /**
     * Draws a debug frame (hitbox) around the object
     * Useful for visualizing collision boundaries
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context
     */
    drawFrame(ctx)
    {
        // Only draw frames for game objects (not UI elements)
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.rect(this.xCoordinate, this.yCoordinate, this.width, this.height);
            ctx.stroke();
        }
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
