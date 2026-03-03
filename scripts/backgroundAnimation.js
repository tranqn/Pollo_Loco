/**
 * @file backgroundAnimation.js
 * @description Interactive particle system and parallax effect for the landing page
 * animated gradient wave background.
 */

/** @type {HTMLCanvasElement} */
let bgCanvas;

/** @type {CanvasRenderingContext2D} */
let bgCtx;

/** @type {{x: number, y: number, radius: number, vx: number, vy: number, opacity: number}[]} */
let bgParticles = [];

/** @type {{x: number, y: number}} */
let bgMousePos = { x: 0, y: 0 };

/** @type {number|null} */
let bgAnimationId = null;

/**
 * Initializes the background animation system
 */
function initBackgroundAnimation() {
    bgCanvas = document.getElementById('bg-particles');
    if (!bgCanvas) return;
    bgCtx = bgCanvas.getContext('2d');
    resizeBgCanvas();
    createBgParticles();
    setupBgMouseTracking();
    startBgAnimation();
    window.addEventListener('resize', handleBgResize, { passive: true });
}

/**
 * Resizes the particle canvas to match its container
 */
function resizeBgCanvas() {
    const container = bgCanvas.parentElement;
    bgCanvas.width = container.offsetWidth;
    bgCanvas.height = container.offsetHeight;
}

/**
 * Handles window resize by resizing canvas and recreating particles
 */
function handleBgResize() {
    if (!bgCanvas || !bgCanvas.parentElement.offsetWidth) return;
    resizeBgCanvas();
    createBgParticles();
}

/**
 * Creates all background particles with random positions and velocities
 */
function createBgParticles() {
    bgParticles = [];
    for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
        bgParticles.push(createSingleBgParticle());
    }
}

/**
 * Creates a single particle with random properties
 * @returns {{x: number, y: number, radius: number, vx: number, vy: number, opacity: number}}
 */
function createSingleBgParticle() {
    const radiusRange = BG_PARTICLE_MAX_RADIUS - BG_PARTICLE_MIN_RADIUS;
    return {
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        radius: BG_PARTICLE_MIN_RADIUS + Math.random() * radiusRange,
        vx: (Math.random() - 0.5) * BG_PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * BG_PARTICLE_SPEED,
        opacity: BG_PARTICLE_MIN_OPACITY + Math.random() * BG_PARTICLE_OPACITY_RANGE,
    };
}

/**
 * Sets up mouse tracking on the document for interactive effects
 */
function setupBgMouseTracking() {
    document.addEventListener('mousemove', handleBgMouseMove, { passive: true });
}

/**
 * Handles mouse movement for parallax and particle interaction
 * @param {MouseEvent} e - The mouse event
 */
function handleBgMouseMove(e) {
    bgMousePos.x = e.clientX;
    bgMousePos.y = e.clientY;
    applyBgParallax();
}

/**
 * Applies parallax shift to gradient spheres based on mouse position
 */
function applyBgParallax() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const deltaX = (bgMousePos.x - w / 2) / (w / 2);
    const deltaY = (bgMousePos.y - h / 2) / (h / 2);
    const spheres = document.querySelectorAll('.bg-gradient-sphere');
    spheres.forEach((sphere, i) => {
        const depth = (i + 1) * BG_PARALLAX_DEPTH_STEP;
        sphere.style.setProperty('--parallax-x', `${deltaX * BG_PARALLAX_STRENGTH * depth}px`);
        sphere.style.setProperty('--parallax-y', `${deltaY * BG_PARALLAX_STRENGTH * depth}px`);
    });
}

/**
 * Starts the background particle animation loop
 */
function startBgAnimation() {
    if (bgAnimationId) return;
    bgAnimationId = requestAnimationFrame(bgAnimationLoop);
}

/**
 * Main animation loop that clears and redraws all particles each frame
 */
function bgAnimationLoop() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgParticles.forEach(updateBgParticle);
    drawBgMouseGlow();
    drawBgParticleLines();
    drawBgMouseLines();
    bgParticles.forEach(drawBgParticle);
    bgAnimationId = requestAnimationFrame(bgAnimationLoop);
}

/**
 * Updates a single particle's position and applies mouse influence
 * @param {{x: number, y: number, radius: number, vx: number, vy: number, opacity: number}} p
 */
function updateBgParticle(p) {
    p.x += p.vx;
    p.y += p.vy;
    applyBgMouseInfluence(p);
    wrapBgParticle(p);
}

/**
 * Draws a soft radial glow around the mouse cursor
 */
function drawBgMouseGlow() {
    if (bgMousePos.x === 0 && bgMousePos.y === 0) return;
    const gradient = bgCtx.createRadialGradient(
        bgMousePos.x, bgMousePos.y, 0,
        bgMousePos.x, bgMousePos.y, BG_MOUSE_GLOW_RADIUS
    );
    gradient.addColorStop(0, `rgba(255, 140, 50, ${BG_MOUSE_GLOW_OPACITY})`);
    gradient.addColorStop(1, 'rgba(255, 140, 50, 0)');
    bgCtx.fillStyle = gradient;
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
}

/**
 * Draws faint connecting lines between nearby particles
 */
function drawBgParticleLines() {
    for (let i = 0; i < bgParticles.length; i++) {
        for (let j = i + 1; j < bgParticles.length; j++) {
            drawLineBetweenParticles(bgParticles[i], bgParticles[j]);
        }
    }
}

/**
 * Draws a line between two particles if they are close enough
 * @param {{x: number, y: number}} a - First particle
 * @param {{x: number, y: number}} b - Second particle
 */
function drawLineBetweenParticles(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distSq = dx * dx + dy * dy;
    const maxDistSq = BG_LINE_DISTANCE * BG_LINE_DISTANCE;
    if (distSq >= maxDistSq) return;
    const dist = Math.sqrt(distSq);
    const alpha = (1 - dist / BG_LINE_DISTANCE) * BG_LINE_OPACITY;
    bgCtx.beginPath();
    bgCtx.moveTo(a.x, a.y);
    bgCtx.lineTo(b.x, b.y);
    bgCtx.strokeStyle = `rgba(255, 160, 60, ${alpha})`;
    bgCtx.lineWidth = 0.5;
    bgCtx.stroke();
}

/**
 * Draws connecting lines from the mouse cursor to nearby particles
 */
function drawBgMouseLines() {
    if (bgMousePos.x === 0 && bgMousePos.y === 0) return;
    bgParticles.forEach(p => drawLineToMouse(p));
}

/**
 * Draws a line from a particle to the mouse if close enough
 * @param {{x: number, y: number}} p - The particle
 */
function drawLineToMouse(p) {
    const dx = p.x - bgMousePos.x;
    const dy = p.y - bgMousePos.y;
    const distSq = dx * dx + dy * dy;
    const maxDistSq = BG_MOUSE_LINE_DISTANCE * BG_MOUSE_LINE_DISTANCE;
    if (distSq >= maxDistSq) return;
    const dist = Math.sqrt(distSq);
    const alpha = (1 - dist / BG_MOUSE_LINE_DISTANCE) * BG_MOUSE_LINE_OPACITY;
    bgCtx.beginPath();
    bgCtx.moveTo(bgMousePos.x, bgMousePos.y);
    bgCtx.lineTo(p.x, p.y);
    bgCtx.strokeStyle = `rgba(255, 160, 60, ${alpha})`;
    bgCtx.lineWidth = 0.8;
    bgCtx.stroke();
}

/**
 * Gently pushes particles away from the mouse cursor
 * @param {{x: number, y: number, vx: number, vy: number}} p - The particle
 */
function applyBgMouseInfluence(p) {
    const dx = p.x - bgMousePos.x;
    const dy = p.y - bgMousePos.y;
    const distSq = dx * dx + dy * dy;
    const maxDistSq = BG_MOUSE_INFLUENCE_RADIUS * BG_MOUSE_INFLUENCE_RADIUS;
    if (distSq >= maxDistSq || distSq === 0) return;
    const dist = Math.sqrt(distSq);
    const force = (1 - dist / BG_MOUSE_INFLUENCE_RADIUS) * BG_MOUSE_INFLUENCE_STRENGTH;
    p.vx += (dx / dist) * force * BG_MOUSE_FORCE_SCALE;
    p.vy += (dy / dist) * force * BG_MOUSE_FORCE_SCALE;
    p.vx *= BG_VELOCITY_DAMPING;
    p.vy *= BG_VELOCITY_DAMPING;
}

/**
 * Wraps particle position to the opposite edge when it moves off-screen
 * @param {{x: number, y: number}} p - The particle
 */
function wrapBgParticle(p) {
    const m = BG_PARTICLE_WRAP_MARGIN;
    if (p.x < -m) p.x = bgCanvas.width + m;
    if (p.x > bgCanvas.width + m) p.x = -m;
    if (p.y < -m) p.y = bgCanvas.height + m;
    if (p.y > bgCanvas.height + m) p.y = -m;
}

/**
 * Draws a single warm-toned particle dot on the canvas
 * @param {{x: number, y: number, radius: number, opacity: number}} p - The particle
 */
function drawBgParticle(p) {
    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(255, 160, 60, ${p.opacity})`;
    bgCtx.fill();
}

/**
 * Stops the background animation loop
 */
function stopBackgroundAnimation() {
    if (bgAnimationId) {
        cancelAnimationFrame(bgAnimationId);
        bgAnimationId = null;
    }
}

/**
 * Remove background event listeners to avoid work during gameplay
 */
function removeBgEventListeners() {
    document.removeEventListener('mousemove', handleBgMouseMove);
    window.removeEventListener('resize', handleBgResize);
}

/**
 * Re-add background event listeners when returning to menu
 */
function addBgEventListeners() {
    document.addEventListener('mousemove', handleBgMouseMove, { passive: true });
    window.addEventListener('resize', handleBgResize, { passive: true });
}

/**
 * Restarts the background animation (used when returning to menu)
 */
function restartBackgroundAnimation() {
    if (!bgCanvas) {
        initBackgroundAnimation();
        return;
    }
    resizeBgCanvas();
    createBgParticles();
    startBgAnimation();
}
