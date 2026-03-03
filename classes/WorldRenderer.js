/**
 * @class WorldRenderer
 * @description Handles all canvas drawing and rendering for the game world.
 */
class WorldRenderer {
    static VIEWPORT_CULLING_BUFFER = 200;

    /** @type {World} */
    world;

    fps = 0;
    frameCount = 0;
    lastFpsUpdate = Date.now();

    /**
     * @param {World} world - Reference to the game world
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Main drawing function - called every frame
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
     * @returns {boolean}
     */
    isInViewport(obj) {
        const camX = this.world.cameraX;
        return obj.xCoordinate + obj.width > camX - WorldRenderer.VIEWPORT_CULLING_BUFFER &&
               obj.xCoordinate < camX + CANVAS_WIDTH + WorldRenderer.VIEWPORT_CULLING_BUFFER;
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
     * Draw UI elements (status bars, debug info)
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
     * Draw debug information overlay
     */
    drawDebugInfo() {
        this.world.ctx.save();
        this.drawDebugBackground();
        this.drawDebugStats();
        this.world.ctx.restore();
    }

    /**
     * Draw the semi-transparent debug background
     */
    drawDebugBackground() {
        this.world.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.world.ctx.fillRect(5, 5, 280, 110);
    }

    /**
     * Draw all debug statistics text
     */
    drawDebugStats() {
        const ctx = this.world.ctx;
        const char = this.world.character;

        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(`FPS: ${this.fps}`, 10, 25);

        ctx.fillStyle = 'yellow';
        ctx.font = '16px Arial';
        ctx.fillText(`Character: (${Math.round(char.xCoordinate)}, ${Math.round(char.yCoordinate)})`, 10, 50);

        this.drawHealthStat(ctx, char);

        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText('Debug Mode: ON', 10, 90);
        ctx.fillText('Red box = hitbox', 10, 105);
    }

    /**
     * Draw the health stat with color based on health level
     * @param {CanvasRenderingContext2D} ctx
     * @param {Character} char
     */
    drawHealthStat(ctx, char) {
        const healthColor = char.health > 50 ? '#00ff00' : char.health > 20 ? 'orange' : 'red';
        ctx.fillStyle = healthColor;
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`Health: ${char.health} HP`, 10, 70);
    }
}
