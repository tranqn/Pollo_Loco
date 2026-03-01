// DrawableObject - Base class for all drawable game objects

/**
 * @class DrawableObject
 * @description Base class for all objects that can be drawn on the canvas.
 * Provides image loading, drawing, collision detection, and debug frame rendering.
 */
class DrawableObject {
    xCoordinate;
    yCoordinate;
    width;
    height;
    IMAGES_CACHE = {};
    currentImageIndex = 0;
    intervals = []; // To track setInterval IDs for cleanup
    otherDirection = false; // When true, mirror the image horizontally

    // Collision box offsets (default to 0, each class can override)
    collisionOffsetX = 0;
    collisionOffsetY = 0;
    collisionOffsetWidth = 0;
    collisionOffsetHeight = 0;

    /**
     * Create a drawable object
     * @param {number} xCoordinate - X position on the canvas
     * @param {number} yCoordinate - Y position on the canvas
     * @param {number} width - Width of the object
     * @param {number} height - Height of the object
     */
    constructor(xCoordinate, yCoordinate, width, height) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.width = width;
        this.height = height;
    }

    /**
     * Draws the object on the canvas
     * Supports horizontal mirroring when otherDirection is true
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context
     */
    draw(ctx)
    {
        // Only draw if we have an image loaded
        if (!this.img) {
            return;
        }

        // If otherDirection, mirror the image horizontally
        if (this.otherDirection) {
            ctx.save(); // Save current state
            ctx.translate(this.width, 0); // Move origin to right edge
            ctx.scale(-1, 1); // Flip horizontally
            ctx.drawImage(
                this.img,
                -this.xCoordinate,  // Negative because of flip
                this.yCoordinate,
                this.width,
                this.height
            );
            ctx.restore(); // Restore original state
        } else {
            // Draw normally
            ctx.drawImage(
                this.img,           // The image to draw
                this.xCoordinate,   // X position on canvas
                this.yCoordinate,   // Y position on canvas
                this.width,         // Width to draw
                this.height         // Height to draw
            );
        }
    }

    /**
     * Draws a debug frame (hitbox) around the object
     * Useful for visualizing collision boundaries
     * Shows both the visual box (blue) and the actual collision box (red) with offsets
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context
     */
    drawFrame(ctx)
    {
        // Only draw frames for game objects (not UI elements)
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss) {
            // Draw visual bounding box (blue)
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'blue';
            ctx.rect(this.xCoordinate, this.yCoordinate, this.width, this.height);
            ctx.stroke();

            // Draw actual collision box with offsets (red)
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            const collisionX = this.xCoordinate + this.collisionOffsetX;
            const collisionY = this.yCoordinate + this.collisionOffsetY;
            const collisionWidth = this.width - this.collisionOffsetX - this.collisionOffsetWidth;
            const collisionHeight = this.height - this.collisionOffsetY - this.collisionOffsetHeight;
            ctx.rect(collisionX, collisionY, collisionWidth, collisionHeight);
            ctx.stroke();
        }
    }

    /**
     * Load multiple images into cache and storage array
     * @param {Array<HTMLImageElement>} STORAGE - Array to store loaded image elements
     * @param {Array<string>} IMAGES_PATHS - Array of image file paths to load
     */
    loadImages(STORAGE, IMAGES_PATHS)
    {
        IMAGES_PATHS.forEach((path) => {
            let img = new Image();
            img.src = path;
            STORAGE.push(img);
            this.IMAGES_CACHE[path] = img;
        });
    }

    /**
     * Check if this object is colliding with another object
     * Uses AABB (Axis-Aligned Bounding Box) collision detection with offset support
     * @param {DrawableObject} obj - The other object to check collision with
     * @returns {boolean} - True if colliding, false otherwise
     */
    isColliding(obj)
    {
        // Apply collision offsets to create smaller, more accurate hitboxes
        const thisLeft = this.xCoordinate + this.collisionOffsetX;
        const thisRight = this.xCoordinate + this.width - this.collisionOffsetWidth;
        const thisTop = this.yCoordinate + this.collisionOffsetY;
        const thisBottom = this.yCoordinate + this.height - this.collisionOffsetHeight;

        const objLeft = obj.xCoordinate + obj.collisionOffsetX;
        const objRight = obj.xCoordinate + obj.width - obj.collisionOffsetWidth;
        const objTop = obj.yCoordinate + obj.collisionOffsetY;
        const objBottom = obj.yCoordinate + obj.height - obj.collisionOffsetHeight;

        return thisRight > objLeft &&
               thisBottom > objTop &&
               thisLeft < objRight &&
               thisTop < objBottom;
    }

}
