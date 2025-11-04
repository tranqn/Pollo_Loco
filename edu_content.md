# El Pollo Loco - Complete Educational Video Guide

> **🎥 Video-Optimized Learning Guide**
> This guide is structured for video learning with NotebookLM. Each section includes clear explanations, practical examples, and checkpoints to verify your understanding.

---

## 📺 Video Chapter Guide

### Chapter 1: Welcome to Game Development (0:00-5:00)
### Chapter 2: Understanding the Big Picture (5:00-15:00)
### Chapter 3: The Foundation - HTML, CSS, and Setup (15:00-25:00)
### Chapter 4: Object-Oriented Game Architecture (25:00-40:00)
### Chapter 5: Building the Character (40:00-55:00)
### Chapter 6: Creating Enemies and AI (55:00-70:00)
### Chapter 7: Physics and Collision Detection (70:00-85:00)
### Chapter 8: The Game World and Camera (85:00-100:00)
### Chapter 9: Bringing It All Together (100:00-115:00)
### Chapter 10: Polish, Debug, and Deploy (115:00-130:00)

---

## Chapter 1: Welcome to Game Development

### What We're Building Today

Welcome! Today we're going to build a complete 2D platformer game called **El Pollo Loco** using nothing but vanilla JavaScript. No frameworks, no game engines - just you, JavaScript, and the HTML5 Canvas.

**Here's what makes this project special:**

Think of this game as your introduction to three major programming concepts that professional developers use every day:

1. **Object-Oriented Programming** - You'll learn why companies like Google organize code into classes
2. **Game Loop Architecture** - The same pattern used in games from Candy Crush to Call of Duty
3. **Real-time Rendering** - How to draw and update graphics 60 times per second

### What You'll Actually Build

By the end of this guide, you'll have a working game where:
- A character named Pepe runs, jumps, and throws bottles
- Chickens patrol back and forth (yes, you're fighting chickens!)
- A giant boss chicken appears at the end
- Bottles fly through the air with realistic physics
- Health bars show damage
- You can win or lose

**Pause and Ask Yourself:** Have you ever wondered how Mario jumps? Or how enemies in games know where to go? You're about to learn exactly that.

### Who Is This For?

**You should watch this if you:**
- Know basic JavaScript (variables, functions, loops)
- Understand HTML and CSS fundamentals
- Want to learn how games actually work
- Are ready to write about 1000 lines of code (we'll do it together!)

**You DON'T need to:**
- Be an expert programmer
- Know advanced math or physics
- Have built a game before
- Understand game engines

---

## Chapter 2: Understanding the Big Picture

### The Game Loop - The Heart of Every Game

Let me ask you something: How does a game know to keep running? Why doesn't it just show one image and stop?

The answer is something called a **game loop**. Here's the simplest explanation:

```
Every 16 milliseconds (60 times per second):
    1. Check what keys are pressed
    2. Update positions of everything (player, enemies, bullets)
    3. Check for collisions (did player hit enemy?)
    4. Draw everything in new positions
    5. Repeat forever
```

**Think of it like a flipbook:**
- Each page is one frame
- Flip fast enough (60 pages per second) and it looks like smooth motion
- Your game loop draws each "page"

### Why Object-Oriented Programming?

Imagine you're building with LEGO blocks. You wouldn't create a unique, one-of-a-kind piece for every single brick in your castle, right? You'd have a few types of bricks (2x4, 1x2, etc.) and reuse them.

That's exactly what classes do in programming:

```
DrawableObject (basic block)
    ↓
MovableObject (block that can move)
    ↓
Character (specific type: the player)
Chicken (specific type: an enemy)
```

**The benefit?** Write the "drawing" code once in DrawableObject, and every character, enemy, and coin can use it. Change one line there, and everything updates.

### The Canvas: Your Drawing Board

Think of the HTML canvas like a blank TV screen. It's 720 pixels wide and 480 pixels tall. That's your stage.

But here's the trick: **The game world is bigger than the screen**. The full level is 2158 pixels wide. So how do players see everything?

**Answer:** A camera follows the player. Imagine holding a camera that slides left and right as the player moves. That's exactly what we'll build.

**Coordinate System (This is Important!):**
```
(0,0) is the TOP-LEFT corner
X increases going RIGHT →
Y increases going DOWN ↓
```

So if your character is at position (100, 180):
- They're 100 pixels from the left edge
- They're 180 pixels from the top (standing on the ground)

**Quick Check:** If something moves from X=50 to X=75, did it move left or right? (Answer: Right! X increased)

---

## Chapter 3: The Foundation - HTML, CSS, and Setup

### Step 1: Creating the HTML Structure

Let's start simple. Every game needs a canvas to draw on. Here's our HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>El Pollo Loco</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="game-container">
        <!-- This is where the game lives -->
        <canvas id="canvas" width="720" height="480"></canvas>

        <!-- Start screen overlay -->
        <div id="start-screen" class="overlay">
            <h1>EL POLLO LOCO</h1>
            <button onclick="init()">START GAME</button>
        </div>
    </div>

    <!-- Scripts load at the bottom -->
    <script src="scripts/constants.js"></script>
    <script src="classes/DrawableObject.js"></script>
    <!-- More scripts... -->
</body>
</html>
```

**What's happening here?**
1. We create a 720x480 canvas (our game screen)
2. We add a start screen overlay (that welcome screen you see)
3. We load scripts at the bottom (so HTML loads first)

**The Script Loading Order MATTERS.** Here's why:

```
constants.js must load FIRST
    ↓ (defines CANVAS_WIDTH, GROUND_LEVEL, etc.)
DrawableObject.js loads SECOND
    ↓ (uses constants, provides base for other classes)
Character.js loads THIRD
    ↓ (extends DrawableObject, uses constants)
script.js loads LAST
    ↓ (uses everything above)
```

Think of it like building a house: foundation first, walls second, roof last. You can't put the roof on before the walls exist!

### Step 2: Styling the Game

Our CSS has three jobs:
1. Center the game on screen
2. Make it look pretty
3. Handle different screen sizes

```css
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

#canvas {
    background-color: #87CEEB;  /* Sky blue */
    border: 3px solid #333;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
```

**Why this CSS?**
- `display: flex` centers everything perfectly
- Gradient background looks professional
- Box shadow gives depth (makes canvas "pop")

### Step 3: The Constants File - Your Game's DNA

This is where we store EVERY number in the game. Why? Two reasons:

1. **Easy to balance the game** - Want to make the character jump higher? Change ONE number
2. **Self-documenting code** - `GROUND_LEVEL` is clearer than `180`

```javascript
// Physics
const GRAVITY = 2.5;
const GROUND_LEVEL = 180;
const CHARACTER_JUMP_FORCE = 30;

// Character
const CHARACTER_WIDTH = 120;
const CHARACTER_HEIGHT = 280;
const CHARACTER_SPEED = 5;
const CHARACTER_MAX_HEALTH = 100;

// Game settings
const FPS = 60;
const FRAME_INTERVAL = 1000 / 60;  // ~16.67ms per frame
```

**Pro Tip:** Professional game developers spend hours tweaking these numbers. That's called "game balancing." You might find that JUMP_FORCE = 30 feels too floaty, so you change it to 25. Having it in one place means you change it once, not in 50 different files.

**Checkpoint Question:** If we want the character to move twice as fast, which constant do we change? (Answer: CHARACTER_SPEED, change from 5 to 10)

---

## Chapter 4: Object-Oriented Game Architecture

### The Class Hierarchy - Building Blocks

Let me show you the most important concept in this entire game: **class inheritance**.

Imagine you're organizing a zoo:
- All animals can breathe and eat (Animal class)
- Some animals can fly (Bird class extends Animal)
- Some animals can swim (Fish class extends Animal)

Our game works the same way:

```
DrawableObject
├── Can be drawn on canvas
├── Has position (x, y)
├── Has size (width, height)
└── Can flip horizontally

    ↓ EXTENDS

MovableObject
├── Everything from DrawableObject PLUS:
├── Can move left/right
├── Has velocity
├── Can jump
└── Can detect collisions

    ↓ EXTENDS

Character, Chicken, Endboss, ThrowableObject
└── Each adds specific behavior
```

### DrawableObject - The Foundation

This is the parent class for EVERYTHING visible in the game. Let's break it down piece by piece:

```javascript
class DrawableObject {
    xCoordinate;     // Horizontal position
    yCoordinate;     // Vertical position
    width;           // How wide?
    height;          // How tall?
    img;             // The image to display
    IMAGES_CACHE = {}; // Store loaded images
    otherDirection = false; // Flip image?

    constructor(xCoordinate, yCoordinate, width, height) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.width = width;
        this.height = height;
    }
```

**Let's understand each part:**

**Image Caching** - Why it matters:
```javascript
// BAD: Loading image every frame (60 times per second!)
draw() {
    let img = new Image();
    img.src = 'character.png';  // Downloads image again!
    ctx.drawImage(img, x, y);   // Game will lag!
}

// GOOD: Load once, reuse forever
constructor() {
    this.img = new Image();
    this.img.src = 'character.png';  // Downloads once
    this.IMAGES_CACHE['character.png'] = this.img;
}

draw() {
    ctx.drawImage(this.img, x, y);  // Uses cached version
}
```

**Horizontal Flipping** - Making characters face left or right:

```javascript
draw(ctx) {
    if (this.otherDirection) {
        // Flip image horizontally
        ctx.save();                    // Save current state
        ctx.translate(this.width, 0);  // Move origin to right edge
        ctx.scale(-1, 1);               // Mirror horizontally
        ctx.drawImage(this.img, -this.xCoordinate, this.yCoordinate,
                      this.width, this.height);
        ctx.restore();                 // Restore original state
    } else {
        // Draw normally
        ctx.drawImage(this.img, this.xCoordinate, this.yCoordinate,
                      this.width, this.height);
    }
}
```

**Why is flipping important?** Most sprite sheets have characters facing ONE direction (usually left). When your character walks right, you need to mirror the image. This is way more efficient than creating separate left/right images for every animation frame.

### MovableObject - Adding Physics

Now we add movement and physics to DrawableObject:

```javascript
class MovableObject extends DrawableObject {
    OBJECT_SPEED;    // How fast does it move?
    yVelocity = 0;   // Vertical speed (for jumping/falling)
    isJumping = false;

    constructor(width, height, speed) {
        super(0, 0, width, height);  // Call parent constructor
        this.OBJECT_SPEED = speed;
    }

    moveLeft() {
        this.xCoordinate -= this.OBJECT_SPEED;
    }

    moveRight() {
        this.xCoordinate += this.OBJECT_SPEED;
    }

    applyGravity() {
        this.yVelocity += GRAVITY;        // Gravity pulls down
        this.yCoordinate += this.yVelocity; // Update position

        if (this.yCoordinate >= GROUND_LEVEL) {
            this.yCoordinate = GROUND_LEVEL;
            this.yVelocity = 0;
            this.isJumping = false;
        }
    }
}
```

**Understanding Gravity Simulation:**

Let's walk through a jump frame-by-frame:

```
Frame 1 (Player presses space):
    yVelocity = -30 (negative = upward)
    yCoordinate = 180 + (-30) = 150 (moved UP 30 pixels)

Frame 2:
    yVelocity = -30 + 2.5 (gravity) = -27.5
    yCoordinate = 150 + (-27.5) = 122.5 (still going up, but slower)

Frame 3:
    yVelocity = -27.5 + 2.5 = -25
    yCoordinate = 122.5 + (-25) = 97.5 (slowing down)

...frames 4-12: velocity decreases...

Frame 13:
    yVelocity = 0 (apex of jump)
    yCoordinate = 60 (highest point)

Frame 14:
    yVelocity = 0 + 2.5 = 2.5 (now falling)
    yCoordinate = 60 + 2.5 = 62.5 (moving down)

...frames 15-25: falling faster and faster...

Frame 26:
    yVelocity = 30 (falling fast)
    yCoordinate = 190 (past ground!)
    → Reset to GROUND_LEVEL (180)
```

**This creates a perfect parabolic arc** - exactly like real-world physics!

**Collision Detection - The AABB Algorithm:**

AABB stands for "Axis-Aligned Bounding Box." It's a fancy way of saying "rectangle collision."

```javascript
isColliding(obj) {
    return this.xCoordinate + this.width > obj.xCoordinate &&      // My right edge past their left edge?
           this.yCoordinate + this.height > obj.yCoordinate &&     // My bottom edge past their top edge?
           this.xCoordinate < obj.xCoordinate + obj.width &&       // My left edge before their right edge?
           this.yCoordinate < obj.yCoordinate + obj.height;        // My top edge before their bottom edge?
}
```

**Visual explanation:**
```
    Character (50, 100) [120x280]
    ┌─────────┐
    │         │
    │    C    │
    │         │
    └─────────┘
         ↓
    Enemy (150, 100) [60x70]
    ┌───┐
    │ E │
    └───┘

Check: 50 + 120 > 150? YES (170 > 150) ✓
Check: 100 + 280 > 100? YES (380 > 100) ✓
Check: 50 < 150 + 60? YES (50 < 210) ✓
Check: 100 < 100 + 70? YES (100 < 170) ✓

All four checks passed → COLLISION!
```

**Checkpoint:** Draw two rectangles on paper. Can you identify the 4 checks needed to detect if they overlap?

---

## Chapter 5: Building the Character

### The Character Class - A State Machine

Your character isn't just a moving image. It has **states**. Think of states like moods:
- **idle** = standing still, breathing
- **walking** = moving left or right
- **jumping** = in the air
- **hurt** = just took damage (flashing red)
- **dead** = game over

**Here's the crucial part:** States have priorities.

```javascript
updateState() {
    if (this.isDead) {
        this.currentState = 'dead';      // Highest priority
    } else if (this.isHurt()) {
        this.currentState = 'hurt';       // Second priority
    } else if (this.isJumping) {
        this.currentState = 'jumping';    // Third priority
    } else if (this.keyboard.LEFT || this.keyboard.RIGHT) {
        this.currentState = 'walking';
    } else if (Date.now() - this.lastActionTime > 15000) {
        this.currentState = 'longIdle';   // 15 seconds of inactivity
    } else {
        this.currentState = 'idle';       // Default state
    }
}
```

**Why priorities matter:**

Imagine you're playing and:
1. You press RIGHT (walking)
2. An enemy hits you (hurt)
3. You die (dead)

Without priorities, the game might try to play walking animation while you're dead! Priorities ensure dead state ALWAYS overrides everything else.

### Animation System - Two Loops

Here's something that confuses beginners: **The game loop and animation loop are separate**.

```javascript
// Game loop: 60 FPS (updates every ~16ms)
setInterval(() => {
    world.update();  // Update positions, physics, collisions
    world.draw();    // Draw everything
}, 16.67);

// Animation loop: 10 FPS (updates every 100ms)
setInterval(() => {
    if (this.currentState === 'walking') {
        this.playAnimation(IMAGES_CHARACTER_WALKING);
    }
}, 100);
```

**Why separate them?**
- Moving at 60 FPS makes motion smooth
- Changing animation frames at 60 FPS makes it look too fast
- Solution: Update position 60x/sec, change sprite 10x/sec

**Analogy:** Think of a real person walking. Their legs move at one speed (animation), but they can glide smoothly across the ground (position updates).

### The Jump Mechanic - Feeling Right

Getting jump to "feel right" is one of the hardest parts of game dev. Here's what we do:

```javascript
handleMovement() {
    // Jump - only if space pressed AND was released before
    if (this.keyboard.SPACE && !this.isJumping && !this.spaceWasPressed) {
        this.jump();
        this.spaceWasPressed = true;  // Prevent double-jump
    }

    // Reset when spacebar released
    if (!this.keyboard.SPACE) {
        this.spaceWasPressed = false;
    }
}

jump() {
    this.yVelocity = -CHARACTER_JUMP_FORCE;  // -30 = shoot upward
    this.isJumping = true;
}
```

**Why the spaceWasPressed flag?**

Without it:
```
Frame 1: Space down → Jump!
Frame 2: Space still down → Jump again! (DOUBLE JUMP BUG)
Frame 3: Space still down → Jump again!
```

With the flag:
```
Frame 1: Space down + not pressed before → Jump! Set flag.
Frame 2: Space down + flag is set → Don't jump
Frame 3: Space released → Clear flag
Frame 4: Space down + flag clear → Jump! Set flag.
```

**Pro tip:** This pattern (checking "was pressed" vs "is pressed") is used in EVERY platformer game.

### Health System - Taking Damage

```javascript
hit(damage = 20) {
    if (this.isDead) return;  // Can't damage dead character

    if (!this.isHurt()) {  // Invincibility frames
        this.health -= damage;
        this.lastHitTime = Date.now();

        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }
    }
}

isHurt() {
    const timeSinceHit = Date.now() - this.lastHitTime;
    return timeSinceHit < 1000;  // 1 second invincibility
}
```

**Understanding invincibility frames:**

Without them, if you touch an enemy:
```
Frame 1: Hit! -20 health
Frame 2: Still touching! -20 health
Frame 3: Still touching! -20 health
→ You'd lose 60 health from one touch!
```

With invincibility:
```
Frame 1: Hit! -20 health, start 1-second timer
Frames 2-60: isHurt() returns true → ignore damage
Frame 61: Timer expired, can take damage again
```

**This is standard in ALL games** - notice in Mario how you flash after getting hit? That's invincibility frames.

---

## Chapter 6: Creating Enemies and AI

### Chicken Class - Patrol Behavior

Let's create an enemy that walks back and forth in a defined area:

```javascript
class Chicken extends MovableObject {
    patrolStartX;      // Left boundary
    patrolEndX;        // Right boundary
    movingRight = Math.random() < 0.5;  // Random start direction

    constructor() {
        super(CHICKEN_WIDTH, CHICKEN_HEIGHT, CHICKEN_SPEED * 0.5);

        // Random position between player and boss
        this.xCoordinate = 300 + Math.random() * 1200;

        // Define 500px patrol zone
        this.patrolStartX = this.xCoordinate;
        this.patrolEndX = this.xCoordinate + 500;

        // Place on ground
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - CHICKEN_HEIGHT);

        // Face initial direction
        this.otherDirection = !this.movingRight;

        this.startAnimation();
    }

    update() {
        if (this.movingRight) {
            this.moveRight();
            this.otherDirection = true;  // Face right

            // Reached right boundary?
            if (this.xCoordinate >= this.patrolEndX) {
                this.movingRight = false;  // Turn around
            }
        } else {
            this.moveLeft();
            this.otherDirection = false;  // Face left

            // Reached left boundary?
            if (this.xCoordinate <= this.patrolStartX) {
                this.movingRight = true;  // Turn around
            }
        }
    }
}
```

**What makes this AI work?**

1. **Random starting position** - Makes each chicken unique
2. **Random starting direction** - Unpredictable behavior
3. **Boundary checking** - Turns around at edges
4. **Face movement direction** - Visual feedback

**State diagram:**
```
Moving Right →→→ Reach Right Edge
       ↑                ↓
       └──── Turn Around ←───┘
       ↓                ↑
Moving Left ←←← Reach Left Edge
```

### Endboss - The Final Challenge

The boss is similar to chickens but with KEY differences:

```javascript
class Endboss extends MovableObject {
    health = 80;  // Takes 4 hits (20 damage each)
    isDead = false;
    patrolStartX = 1600;  // At end of level
    patrolEndX = 1850;

    hit(damage = 20) {
        if (this.isDead) return;

        if (!this.isHurt()) {
            this.health -= damage;
            this.lastHitTime = Date.now();

            if (this.health <= 0) {
                this.health = 0;
                this.isDead = true;
            }
        }
    }
}
```

**Why 80 health?**
- Player has 10 bottles in the level
- Each bottle does 20 damage
- 80 health = 4 hits to win
- Margin of error: 6 bottles to spare

**This is game balancing:** Make it challenging but not impossible.

### Collision Response - Jump-on-Enemy Mechanic

One of the coolest features: jumping on enemies defeats them (like Mario!).

```javascript
checkEnemyCollisions() {
    this.level.enemies.forEach((enemy, index) => {
        if (this.character.isColliding(enemy)) {
            const isFalling = this.character.yVelocity > 0;  // Going down?
            const isAboveEnemy = this.character.yCoordinate <
                                 enemy.yCoordinate + enemy.height / 2;

            if (isFalling && isAboveEnemy && !(enemy instanceof Endboss)) {
                // SUCCESS! Jump-kill the enemy
                this.level.enemies.splice(index, 1);
                this.character.yVelocity = -15;  // Bounce up
            }
            else if (isFalling && isAboveEnemy && enemy instanceof Endboss) {
                // Can't kill boss by jumping, just bounce
                this.character.yVelocity = -15;
            }
            else {
                // Hit from side = take damage
                this.character.hit(20);
                this.healthBar.setPercentage(this.character.health);
            }
        }
    });
}
```

**Breaking down the logic:**

```
Collision detected!
    ↓
Is character falling? (yVelocity > 0)
    YES → Is character above enemy's midpoint?
        YES → Is it the Endboss?
            NO → Kill enemy, bounce character ✓
            YES → Just bounce, no kill
        NO → Side collision, take damage ✗
    NO → Character is rising/standing, take damage ✗
```

**Why check midpoint?** Prevents exploits where brushing the enemy's head counts as a jump-kill.

---

## Chapter 7: Physics and Collision Detection

### Throwable Objects - Projectile Motion

This is where physics gets fun. When you throw a bottle, it follows a parabolic arc:

```javascript
class ThrowableObject extends MovableObject {
    throwDirection = 1;  // 1 = right, -1 = left

    constructor(x, y, direction) {
        super(BOTTLE_WIDTH, BOTTLE_HEIGHT, THROWABLE_SPEED);
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.throwDirection = direction;
        this.throw();
    }

    throw() {
        this.yVelocity = -25;  // Shoot upward
    }

    update() {
        if (this.isSplashing) return;  // Don't move while splashing

        // Horizontal movement (constant speed)
        this.xCoordinate += THROWABLE_SPEED * this.throwDirection;

        // Vertical movement (affected by gravity)
        this.yVelocity += THROWABLE_GRAVITY;
        this.yCoordinate += this.yVelocity;

        // Ground collision
        const bottleGroundLevel = GROUND_LEVEL + (CHARACTER_HEIGHT - BOTTLE_HEIGHT);
        if (this.yCoordinate >= bottleGroundLevel) {
            this.yCoordinate = bottleGroundLevel;
            this.splash();
        }
    }
}
```

**Understanding the trajectory:**

```
Initial state:
    X velocity: 15 pixels/frame (constant) →→→
    Y velocity: -25 pixels/frame (upward)

Frame 1:
    X = X + 15 = moves right
    Y velocity = -25 + 2 = -23
    Y = Y + (-23) = moves up

Frame 2:
    X = X + 15 = moves right
    Y velocity = -23 + 2 = -21
    Y = Y + (-21) = moves up (slower)

... (velocity decreases)

Frame 13:
    Y velocity = 0 (peak of arc)

Frame 14:
    Y velocity = 0 + 2 = 2 (now falling)

... (falls faster and faster)

Frame 25:
    Y velocity = 24 (falling fast)
    Y >= ground level → SPLASH!
```

**The result?** A perfect parabolic arc, just like throwing a ball in real life!

### Bottle-Enemy Collision

```javascript
checkBottleEnemyCollisions() {
    this.thrownBottles.forEach(bottle => {
        if (bottle.isSplashing) return;  // Already hit something

        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (bottle.isColliding(enemy)) {
                bottle.splash();  // Trigger splash animation

                if (enemy instanceof Endboss) {
                    enemy.hit(THROWABLE_DAMAGE);  // 20 damage
                    this.endbossBar.setPercentage(enemy.health);
                } else {
                    this.level.enemies.splice(enemyIndex, 1);  // Kill instantly
                }
            }
        });
    });
}
```

**Why different behavior?**
- Regular enemies: One hit = death (they're weak)
- Endboss: Takes multiple hits (he's tough)

---

## Chapter 8: The Game World and Camera

### World Class - The Game Coordinator

Think of the World class as the director of a movie. It tells everyone when to act, where to stand, and what to do.

```javascript
class World {
    canvas;
    ctx;
    character;
    level;
    cameraX = 0;  // Camera position

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.initializeGame();
    }

    initializeGame() {
        this.level = level1;  // Load level data
        this.character = new Character(this.keyboard);

        // Create UI bars
        this.healthBar = new StatusBar(20, 20, IMAGES_STATUSBAR_HEALTH);
        this.coinBar = new StatusBar(20, 90, IMAGES_STATUSBAR_COIN);
        this.bottleBar = new StatusBar(20, 160, IMAGES_STATUSBAR_BOTTLE);

        // Endboss bar (centered at top, only shows when boss is visible)
        const endbossBarX = (CANVAS_WIDTH - STATUSBAR_WIDTH) / 2;
        this.endbossBar = new StatusBar(endbossBarX, 20, IMAGES_STATUSBAR_ENDBOSS);
    }
}
```

### The Game Loop - Update and Draw

```javascript
update() {
    // Check win/lose conditions first
    if (this.character.isDead) {
        this.gameOver();
        return;
    }

    const endboss = this.getEndboss();
    if (endboss && endboss.isDead) {
        this.victory();
        return;
    }

    // Update all game objects
    this.character.update();
    this.handleThrow();
    this.level.enemies.forEach(enemy => enemy.update());
    this.level.clouds.forEach(cloud => cloud.update());
    this.updateThrownBottles();

    // Check collisions
    this.checkCollisions();

    // Update camera
    this.updateCamera();
}

draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Apply camera (affects everything drawn after this)
    this.ctx.save();
    this.ctx.translate(-this.cameraX, 0);

    // Draw game world (affected by camera)
    this.level.backgroundObjects.forEach(bg => bg.draw(this.ctx));
    this.level.clouds.forEach(cloud => cloud.draw(this.ctx));
    this.level.enemies.forEach(enemy => enemy.draw(this.ctx));
    this.character.draw(this.ctx);

    this.ctx.restore();

    // Draw UI (NOT affected by camera)
    this.healthBar.draw(this.ctx);
    this.coinBar.draw(this.ctx);

    if (this.isEndbossVisible()) {
        this.endbossBar.draw(this.ctx);
    }
}
```

**Notice the pattern:** Update first, then draw. Never mix them!

### Camera System - Following the Player

```javascript
updateCamera() {
    // Camera follows player, keeping them at X=100 on screen
    this.cameraX = this.character.xCoordinate - 100;

    // Constrain camera to level boundaries
    if (this.cameraX < 0) {
        this.cameraX = 0;  // At start of level
    }
    if (this.cameraX > CAMERA_MAX_X) {
        this.cameraX = CAMERA_MAX_X;  // At end of level
    }
}
```

**How ctx.translate works:**

```
Without translation:
    Canvas shows pixels 0-720 (fixed)
    Player at X=1000 is OFF SCREEN

With translation by -500:
    Canvas shows pixels 500-1220
    Player at X=1000 appears at position 500 on screen (visible!)

The math:
    Screen position = World position - Camera X
    500 = 1000 - 500 ✓
```

**Analogy:** Imagine you're holding a camera on a rail. As the player moves right, you slide the camera right to keep them in frame. That's exactly what translate does.

---

## Chapter 9: Bringing It All Together

### The Main Script - Initialization

```javascript
let canvas;
let world;
let gameInterval;
let keyboard;

function init() {
    // Hide start screen
    document.getElementById('start-screen').classList.add('hidden');

    // Get canvas
    canvas = document.getElementById('canvas');

    // Create keyboard handler (only once!)
    if (!keyboard) {
        keyboard = new Keyboard();
        initKeyboardListeners();
    }

    // Create game world
    world = new World(canvas, keyboard);

    // Start 60 FPS game loop
    startGameLoop();
}

function startGameLoop() {
    gameInterval = setInterval(() => {
        world.update();
        world.draw();
    }, FRAME_INTERVAL);  // ~16.67ms
}
```

### Keyboard Input Handling

```javascript
function initKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') keyboard.LEFT = true;
        if (e.key === 'ArrowRight') keyboard.RIGHT = true;
        if (e.key === ' ') keyboard.SPACE = true;
        if (e.key === 'd' || e.key === 'D') keyboard.D = true;
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') keyboard.LEFT = false;
        if (e.key === 'ArrowRight') keyboard.RIGHT = false;
        if (e.key === ' ') keyboard.SPACE = false;
        if (e.key === 'd' || e.key === 'D') keyboard.D = false;
    });
}
```

**Why boolean flags instead of checking keys directly?**

```
// BAD: Checking keys in update (called 60x/second)
update() {
    if (e.key === 'ArrowRight') {
        // This only fires on keydown EVENT, not continuously
    }
}

// GOOD: Boolean flags
keydown: keyboard.RIGHT = true  // Set flag
update: if (keyboard.RIGHT) { this.moveRight(); }  // Check flag every frame
keyup: keyboard.RIGHT = false   // Clear flag
```

The flag stays true as long as the key is held, so movement is smooth and continuous.

### The Critical Restart Function

```javascript
function restartGame() {
    stopGameLoop();

    // THIS IS CRITICAL: Clear all intervals!
    if (world) {
        // Character intervals
        if (world.character && world.character.animationInterval) {
            clearInterval(world.character.animationInterval);
        }

        // Enemy intervals
        if (world.level && world.level.enemies) {
            world.level.enemies.forEach(enemy => {
                if (enemy.animationInterval) {
                    clearInterval(enemy.animationInterval);
                }
            });
        }

        // Thrown bottle intervals
        if (world.thrownBottles) {
            world.thrownBottles.forEach(bottle => {
                if (bottle.animationInterval) {
                    clearInterval(bottle.animationInterval);
                }
            });
        }
    }

    // Hide end screens
    document.getElementById('gameover-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.add('hidden');

    // Reset keyboard
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
    keyboard.D = false;

    // Recreate world
    world = null;
    init();
}
```

**Why is interval cleanup so important?**

```
Without cleanup:
    Start game → 5 enemies, 5 animation intervals running
    Restart → 5 NEW enemies, 5 NEW intervals
    Old 5 intervals STILL RUNNING!
    Result: 10 intervals for 5 enemies = CHAOS

With cleanup:
    Start game → 5 intervals
    Clear intervals → 0 intervals
    Restart → 5 NEW intervals
    Result: 5 intervals for 5 enemies ✓
```

**Memory leaks** are one of the most common bugs in games. Always clean up!

---

## Chapter 10: Polish, Debug, and Deploy

### Debugging Techniques

**1. Draw Hitboxes**

```javascript
// In your World draw() method
if (this.debugMode) {
    this.character.drawFrame(this.ctx);
    this.level.enemies.forEach(enemy => enemy.drawFrame(this.ctx));
}
```

This draws red rectangles around everything. Now you can SEE collisions!

**2. FPS Counter**

```javascript
updateFPS() {
    this.frameCount++;
    const now = Date.now();

    if (now - this.lastFpsUpdate >= 1000) {
        this.fps = this.frameCount;  // Frames in last second
        this.frameCount = 0;
        this.lastFpsUpdate = now;
    }
}

// Draw FPS
ctx.fillText(`FPS: ${this.fps}`, 10, 20);
```

If FPS drops below 55, you have performance issues.

**3. Console Logging Critical Events**

```javascript
checkEnemyCollisions() {
    if (this.character.isColliding(enemy)) {
        console.log('COLLISION!', {
            characterX: this.character.xCoordinate,
            enemyX: enemy.xCoordinate,
            velocityY: this.character.yVelocity
        });
    }
}
```

### Common Mistakes and Fixes

**Problem: Character falls through ground**

```javascript
// WRONG:
if (this.yCoordinate > GROUND_LEVEL) {
    this.yCoordinate = GROUND_LEVEL;
}

// RIGHT:
if (this.yCoordinate >= GROUND_LEVEL) {  // Use >=
    this.yCoordinate = GROUND_LEVEL;
    this.yVelocity = 0;  // Reset velocity!
    this.isJumping = false;  // Can jump again
}
```

**Problem: Animations play too fast**

```javascript
// WRONG: In game loop (60 FPS)
update() {
    this.playAnimation(this.images);  // Changes 60x per second!
}

// RIGHT: Separate interval (10 FPS)
startAnimation() {
    setInterval(() => {
        this.playAnimation(this.images);
    }, 100);  // 10x per second
}
```

**Problem: Can't collect items**

```javascript
// Check your collision detection:
console.log('Character:', this.character.xCoordinate, this.character.width);
console.log('Coin:', coin.xCoordinate, coin.width);
console.log('Colliding?', this.character.isColliding(coin));

// Common issue: Width/height not set correctly
```

### Performance Optimization

**Image Loading - Do Once**

```javascript
// ✅ GOOD
constructor() {
    this.img = new Image();
    this.img.src = 'character.png';
    this.IMAGES_CACHE['character.png'] = this.img;
}

// ❌ BAD
draw() {
    let img = new Image();
    img.src = 'character.png';  // Reloads every frame!
}
```

**Collision Optimization**

```javascript
// ✅ GOOD: Only check active enemies
this.level.enemies.forEach(enemy => {
    if (this.character.isColliding(enemy)) {
        // handle
    }
});

// ❌ BAD: Checking everything against everything
for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
        // N² complexity = slow!
    }
}
```

### Testing Checklist

Before you call your game "done," test these:

- [ ] Character moves smoothly
- [ ] Jump feels responsive
- [ ] Enemies patrol correctly
- [ ] Collisions work (coins, bottles, enemies)
- [ ] Health bar updates
- [ ] Status bars show correct values
- [ ] Endboss requires 4 hits
- [ ] Game over triggers at 0 health
- [ ] Victory triggers when boss dies
- [ ] Restart works without bugs
- [ ] Camera follows smoothly
- [ ] No console errors
- [ ] Steady 60 FPS

### Deployment

**Option 1: GitHub Pages (Free!)**
1. Push code to GitHub
2. Go to Settings → Pages
3. Select main branch
4. Your game is live at username.github.io/repo-name

**Option 2: Netlify (Also Free!)**
1. Drag your folder to netlify.com/drop
2. Get instant URL
3. Done!

---

## Recap and Next Steps

### What You've Learned

Let's review the major concepts:

1. **Object-Oriented Programming**
   - Class inheritance (DrawableObject → MovableObject → Character)
   - Encapsulation (keeping related data together)
   - Polymorphism (same method, different behavior)

2. **Game Loop Architecture**
   - Separate update and draw
   - 60 FPS for smooth gameplay
   - State management

3. **Physics Simulation**
   - Gravity (acceleration)
   - Velocity (speed with direction)
   - Collision detection (AABB)

4. **Canvas API**
   - Drawing images
   - Translation (camera)
   - Flipping/mirroring

5. **Event-Driven Programming**
   - Keyboard input
   - State machines
   - Animation timing

### Common Questions

**Q: Why 60 FPS specifically?**
A: Most monitors refresh at 60Hz. Higher FPS would be wasted on most screens.

**Q: Can I make multiplayer?**
A: Yes, but you'd need a server (Node.js + Socket.io) to sync game states.

**Q: How do I add sound?**
A: Use HTML5 Audio:
```javascript
let jumpSound = new Audio('jump.mp3');
jumpSound.play();
```

**Q: Can I monetize this?**
A: Yes! Add ads or sell on itch.io. Just make sure you own/license all assets.

**Q: What if my game lags?**
A: Check FPS counter. Common causes:
- Loading images every frame
- Too many objects
- Complex collision checks
- Not using requestAnimationFrame

### Extension Ideas

**Easy (1-2 hours):**
- Add sound effects
- Create a second level
- Add more enemy types
- Implement powerups

**Medium (1-2 days):**
- Mobile touch controls (we have this!)
- High score system (localStorage)
- Particle effects
- Boss attack patterns

**Hard (1 week+):**
- Procedural level generation
- Online leaderboards
- Multiplayer mode
- Level editor

### Resources for Further Learning

**Game Development:**
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [HTML5 Game Dev Forum](https://html5gamedevs.com/)

**JavaScript:**
- [JavaScript.info](https://javascript.info/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

**Game Engines (Next Step):**
- Phaser 3 (2D games)
- Three.js (3D games)
- Unity (professional)

---

## Final Thoughts

Congratulations! You've just built a complete game from scratch using vanilla JavaScript. That's no small feat.

**Remember:**
- Every professional game developer started somewhere
- Don't be discouraged by bugs - they're part of the process
- Game dev combines art, math, and programming
- The best way to learn is by building

**Your next steps:**
1. Polish your game (sounds, more levels, better graphics)
2. Share it with friends
3. Add it to your portfolio
4. Start a NEW game with what you've learned

Most importantly: **Keep coding, keep creating, and have fun!**

---

## Quick Reference

### Key Formulas

**Gravity Simulation:**
```javascript
yVelocity += GRAVITY;
yCoordinate += yVelocity;
```

**Camera Follow:**
```javascript
cameraX = character.xCoordinate - 100;
cameraX = Math.max(0, Math.min(cameraX, MAX_CAMERA_X));
```

**AABB Collision:**
```javascript
return objA.x + objA.width > objB.x &&
       objA.y + objA.height > objB.y &&
       objA.x < objB.x + objB.width &&
       objA.y < objB.y + objB.height;
```

**State Priority:**
```
dead > hurt > jumping > walking > longIdle > idle
```

### Project Statistics

- **Total Lines of Code:** ~1500
- **Number of Classes:** 14
- **Number of Files:** 20+
- **Total Images:** 100+
- **Game Loop Speed:** 60 FPS
- **Animation Speed:** 10 FPS

---

**End of Educational Guide**

Thank you for following along. Now go build something amazing! 🎮🚀
