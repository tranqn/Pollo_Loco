// WorldRenderer - Handles all drawing/rendering for the game world

/**
 * @class WorldRenderer
 * @description Handles all canvas drawing and rendering for the game world including backgrounds, objects, UI, and debug info.
 */
class WorldRenderer {
    /** @type {World} */
    world;

    // FPS tracking
    fps = 0;
    frameCount = 0;
    lastFpsUpdate = Date.now();

    /**
     * Create the world renderer
     * @param {World} world - Reference to the game world
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Main drawing function - called every frame
     * Clears canvas and draws all objects
     */
    draw() {
        this.clearCanvas();
        this.drawWorldObjects();
        this.drawUI();
    }

    /**
     * Clear the entire canvas
     */
    clearCanvas() {
        this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    }

    /**
     * Draw all world objects (affected by camera translation)
     */
    drawWorldObjects() {
        this.world.ctx.save();
        this.world.ctx.translate(-this.world.cameraX, 0);

        this.drawBackground();
        this.drawGameObjects();
        this.drawDebugHitboxes();

        this.world.ctx.restore();
    }

    /**
     * Check if an object is within the visible viewport
     * @param {DrawableObject} obj - The object to check
     * @returns {boolean} True if the object is visible on screen
     */
    isInViewport(obj) {
        const camX = this.world.cameraX;
        return obj.xCoordinate + obj.width > camX - VIEWPORT_CULLING_BUFFER &&
               obj.xCoordinate < camX + CANVAS_WIDTH + VIEWPORT_CULLING_BUFFER;
    }

    /**
     * Draw background layers and clouds
     */
    drawBackground() {
        this.world.level.backgroundObjects.forEach(bg => {
            if (this.isInViewport(bg)) bg.draw(this.world.ctx);
        });

        this.world.level.clouds.forEach(cloud => {
            if (this.isInViewport(cloud)) cloud.draw(this.world.ctx);
        });
    }

    /**
     * Draw all game objects (enemies, collectibles, character)
     */
    drawGameObjects() {
        this.world.level.coins.forEach(coin => {
            if (this.isInViewport(coin)) coin.draw(this.world.ctx);
        });

        this.world.level.bottles.forEach(bottle => {
            if (this.isInViewport(bottle)) bottle.draw(this.world.ctx);
        });

        this.world.level.enemies.forEach(enemy => {
            if (this.isInViewport(enemy)) enemy.draw(this.world.ctx);
        });

        this.world.thrownBottles.forEach(bottle => {
            if (this.isInViewport(bottle)) bottle.draw(this.world.ctx);
        });

        this.world.character.draw(this.world.ctx);
    }

    /**
     * Draw debug hitboxes if debug mode is enabled
     */
    drawDebugHitboxes() {
        if (!this.world.debugMode) return;

        this.world.level.enemies.forEach(enemy => {
            enemy.drawFrame(this.world.ctx);
        });
        this.world.character.drawFrame(this.world.ctx);
    }

    /**
     * Draw UI elements (status bars, debug info - not affected by camera)
     */
    drawUI() {
        this.world.healthBar.draw(this.world.ctx);
        this.world.coinBar.draw(this.world.ctx);
        this.world.bottleBar.draw(this.world.ctx);

        if (this.world.isEndbossVisible()) {
            this.world.endbossBar.draw(this.world.ctx);
        }

        if (this.world.debugMode) {
            this.updateFPS();
            this.drawDebugInfo();
        }
    }

    /**
     * Update FPS counter
     */
    updateFPS() {
        this.frameCount++;
        const now = Date.now();

        if (now - this.lastFpsUpdate >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsUpdate = now;
        }
    }

    /**
     * Draw debug information (FPS, positions, etc.)
     */
    drawDebugInfo() {
        this.world.ctx.save();

        this.world.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.world.ctx.fillRect(5, 5, 280, 110);

        this.world.ctx.fillStyle = '#00ff00';
        this.world.ctx.font = 'bold 18px Arial';
        this.world.ctx.fillText(`FPS: ${this.fps}`, 10, 25);

        this.world.ctx.fillStyle = 'yellow';
        this.world.ctx.font = '16px Arial';
        this.world.ctx.fillText(
            `Character: (${Math.round(this.world.character.xCoordinate)}, ${Math.round(this.world.character.yCoordinate)})`,
            10, 50
        );

        const healthColor = this.world.character.health > 50 ? '#00ff00' : this.world.character.health > 20 ? 'orange' : 'red';
        this.world.ctx.fillStyle = healthColor;
        this.world.ctx.font = 'bold 16px Arial';
        this.world.ctx.fillText(`Health: ${this.world.character.health} HP`, 10, 70);

        this.world.ctx.fillStyle = 'white';
        this.world.ctx.font = '14px Arial';
        this.world.ctx.fillText('Debug Mode: ON', 10, 90);
        this.world.ctx.fillText('Red box = hitbox', 10, 105);

        this.world.ctx.restore();
    }
}
