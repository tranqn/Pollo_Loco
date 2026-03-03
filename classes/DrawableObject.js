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
    currentImageIndex = 0;
    otherDirection = false;

    collisionOffsetX = 0;
    collisionOffsetY = 0;
    collisionOffsetWidth = 0;
    collisionOffsetHeight = 0;

    /**
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
     * Draws the object on the canvas, mirroring horizontally if otherDirection is true
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context
     */
    draw(ctx) {
        if (!this.img) return;

        if (this.otherDirection) {
            ctx.save();
            ctx.translate(this.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.xCoordinate, this.yCoordinate, this.width, this.height);
            ctx.restore();
        } else {
            ctx.drawImage(this.img, this.xCoordinate, this.yCoordinate, this.width, this.height);
        }
    }

    /**
     * Draws debug hitbox frames around the object
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context
     */
    drawFrame(ctx) {
        if (!this.showDebugFrame) return;

        this.drawVisualBox(ctx);
        this.drawCollisionBox(ctx);
    }

    /**
     * Draws the visual bounding box in blue
     * @param {CanvasRenderingContext2D} ctx
     */
    drawVisualBox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        ctx.rect(this.xCoordinate, this.yCoordinate, this.width, this.height);
        ctx.stroke();
    }

    /**
     * Draws the collision hitbox in red
     * @param {CanvasRenderingContext2D} ctx
     */
    drawCollisionBox(ctx) {
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

    /**
     * Play an animation by cycling through frames using the class-level image cache
     * @param {Array<string>} images - Array of image paths
     */
    playAnimation(images) {
        const i = this.currentImageIndex % images.length;
        const path = images[i];
        this.img = this.constructor.IMAGES_CACHE[path];
        this.currentImageIndex++;
    }

    /**
     * Check if this object is colliding with another object using AABB detection
     * @param {DrawableObject} obj - The other object to check collision with
     * @returns {boolean} True if colliding
     */
    isColliding(obj) {
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
