# Game Development Learning Guide — El Pollo Loco

> **A step-by-step guide to learn vanilla JavaScript game development, OOP, HTML5 Canvas, collision detection, and game architecture — through a real 2D platformer!**

---

# THE GAME DEV JOURNEY — Your Learning Adventure

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   "The best way to learn game development is not by watching tutorials —     ║
║    it's by understanding REAL game code. This project is your classroom."    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

## The Path of the Game Developer

You are about to embark on a transformative journey. Like every hero's journey, yours will have **12 stages** — one for each part of this guide. Along the way, you'll understand real game engine patterns and emerge as a confident game developer.

```
                                    🏆 MASTERY
                                         ▲
                          Part 12: Level Design & World Building
                       "Backgrounds, landing page, responsive UI"
                                         │
                              Part 11: Performance
                        "Smooth on mobile, single timer"
                                         │
                              Part 10: The Return
                          "I can build any 2D game"
                                         │
                              Part 9: Game States
                         "Start, Play, GameOver, Victory"
                                         │
                            Part 8: Audio System
                          "Music, SFX, and mute control"
                                         │
                            ┌────────────┴────────────┐
                      Part 6-7: The Ordeal        Part 5: Allies
                   "Enemies & Stomp Detection"  "Collectibles & UI"
                            └────────────┬────────────┘
                                         │
                              Part 4: Threshold
                         "Collision Detection (AABB)"
                                         │
                              Part 3: Mentors
                         "Animation & Sprite System"
                                         │
                              Part 2: Awakening
                          "Physics: Gravity & Jumping"
                                         │
                              Part 1: The Call
                          "My first class draws on screen"
                                         │
                                  🌱 YOU ARE HERE
                               "The Ordinary World"
```

---

## YOUR MOTIVATING MANTRAS

Read these before each study session. Say them out loud. Let them sink in.

### Before You Begin (The Call)
> **"I am not reading someone else's code. I am LEARNING to think like the developer who wrote it."**

### When It Gets Hard (The Ordeal)
> **"Confusion is the first step to understanding. Every bug is a lesson in disguise."**

### When You Want to Quit (The Abyss)
> **"The game developer I'll be tomorrow is built by the concepts I grasp today."**

### When You Succeed (The Reward)
> **"I solved this. I CAN solve the next one. Each victory builds my confidence."**

### Daily Developer Affirmations
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   MORNING: "Today I will understand one concept deeply,             │
│             rather than many concepts superficially."               │
│                                                                     │
│   STRUGGLE: "This challenge exists to make me stronger.             │
│              I will break it into smaller pieces."                  │
│                                                                     │
│   EVENING: "I am proud of what I learned today.                     │
│             Tomorrow I build on this foundation."                   │
│                                                                     │
│   ALWAYS: "Repetition is not boring. Repetition is mastery."        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# LEARNING SCIENCE FRAMEWORK — How to Use This Guide Effectively

This section teaches you **how to learn** before you learn game development. Master these techniques and you'll learn 3-5x faster than passive reading.

---

## TECHNIQUE 1: ACTIVE RECALL (The Most Powerful Learning Technique)

### What is Active Recall?
Instead of re-reading content, you **actively try to remember** it. This strengthens neural pathways and creates lasting memory.

### The Science
```
Passive Reading:    Information → Eyes → Short-term memory → (forgotten)
Active Recall:      Question → Brain searches → Struggle → STRONG memory created!

Why struggle matters:
┌────────────────────────────────────────────────────────────────────────┐
│  "The harder your brain works to retrieve something, the stronger     │
│   the memory becomes. Easy recall = weak learning."                   │
└────────────────────────────────────────────────────────────────────────┘
```

### Active Recall Exercises for Each Part

After completing each part, CLOSE this guide and answer these questions from memory:

#### Part 1: Drawing on Canvas — Test Yourself
```
BEFORE PEEKING, try to answer:

1. What does ctx.drawImage() do?
   Your answer: _________________________________

2. How do you flip a sprite horizontally on canvas?
   Your answer: _________________________________

3. What is the difference between DrawableObject and MovableObject?
   Your answer: _________________________________

4. Why does each object have its own IMAGES_CACHE?
   Your answer: _________________________________
```

#### Part 2: Physics — Test Yourself
```
BEFORE PEEKING, try to answer:

1. How does gravity work in the game? (Which values are involved?)
   Your answer: _________________________________

2. Why does yVelocity start NEGATIVE when jumping?
   Your answer: _________________________________

3. What is GROUND_LEVEL and why is it 180, not 480?
   Your answer: _________________________________

4. What does previousY track and why is it important?
   Your answer: _________________________________
```

#### Part 3: Animation — Test Yourself
```
BEFORE PEEKING, try to answer:

1. How does playAnimation() cycle through frames?
   Your answer: _________________________________

2. Why does the jump animation use 136ms per frame instead of 100ms?
   Your answer: _________________________________

3. What is IMAGES_CACHE and how does loadImages() populate it?
   Your answer: _________________________________

4. How does the one-shot jump animation differ from looping animations?
   Your answer: _________________________________

5. How does the snoring system work? What triggers it and what stops it?
   Your answer: _________________________________

6. What is CHARACTER_IDLE_TIMEOUT and what happens after it expires?
   Your answer: _________________________________

7. Why does the Endboss reset currentImageIndex on state change?
   Your answer: _________________________________
```

#### Part 4: Collision Detection — Test Yourself
```
BEFORE PEEKING, try to answer:

1. What does AABB stand for?
   Your answer: _________________________________

2. What are collision offsets and why are they needed?
   Your answer: _________________________________

3. How does isColliding() determine overlap between two objects?
   Your answer: _________________________________

4. Why can't you just compare pixel positions for collision?
   Your answer: _________________________________
```

#### Part 5: Status Bars — Test Yourself
```
BEFORE PEEKING, try to answer:

1. How does setPercentage() map a 0-100 value to one of 6 images?
   Your answer: _________________________________

2. What is ITEMS_PER_FULL_BAR and how is it used?
   Your answer: _________________________________

3. Why are status bars drawn AFTER ctx.restore()?
   Your answer: _________________________________
```

#### Part 6: Enemy AI — Test Yourself
```
BEFORE PEEKING, try to answer:

1. How does the patrol behavior work?
   Your answer: _________________________________

2. What are the Endboss's 5 states and how are they prioritized?
   Your answer: _________________________________

3. How does the Endboss know how far away the character is?
   Your answer: _________________________________
```

#### Part 7: Stomp Detection — Test Yourself
```
BEFORE PEEKING, try to answer:

1. What two conditions must be true for a stomp?
   Your answer: _________________________________

2. Why check previousY instead of yVelocity for "falling"?
   Your answer: _________________________________

3. What happens when you stomp an Endboss vs. a regular Chicken?
   Your answer: _________________________________

4. Describe the 4 stages of a thrown bottle's lifecycle.
   Your answer: _________________________________

5. Why does THROWABLE_GRAVITY (2) differ from character GRAVITY (0.3)?
   Your answer: _________________________________
```

#### Part 8: Audio System — Test Yourself
```
BEFORE PEEKING, try to answer:

1. What design pattern does AudioManager use? Why?
   Your answer: _________________________________

2. What's the difference between playMusic() and playSFX()?
   Your answer: _________________________________

3. How does mute state survive a browser restart?
   Your answer: _________________________________

4. Why does playSFX() use .catch(() => {})?
   Your answer: _________________________________
```

#### Part 9: Game States — Test Yourself
```
BEFORE PEEKING, try to answer:

1. Why is createLevel1() a function and not a plain object?
   Your answer: _________________________________

2. What does clearGameIntervals() clean up and why?
   Your answer: _________________________________

3. Why does gameOver() use setTimeout before showing the screen?
   Your answer: _________________________________

4. What prevents gameOver() from being called 60 times per second?
   Your answer: _________________________________

5. How does togglePause() freeze the game without losing state?
   Your answer: _________________________________

6. What browser API does toggleFullscreen() use?
   Your answer: _________________________________
```

#### Part 10: Camera, Input & Mobile — Test Yourself
```
BEFORE PEEKING, try to answer:

1. Why must setupTouchControls() run AFTER init()?
   Your answer: _________________________________

2. What prevents duplicate touch listeners on game restart?
   Your answer: _________________________________

3. How does ctx.translate(-cameraX) scroll the world?
   Your answer: _________________________________

4. Why are status bars drawn after ctx.restore()?
   Your answer: _________________________________

5. Why is ESC handled in keydown but not keyup?
   Your answer: _________________________________

6. What is the delegate pattern and how does WorldRenderer use it?
   Your answer: _________________________________

7. In what order are game objects drawn (z-order)?
   Your answer: _________________________________

8. Why do UI buttons use cqh/cqw instead of vh/vw?
   Your answer: _________________________________

9. Why must mute/fullscreen/pause buttons use position: absolute, not fixed?
   Your answer: _________________________________
```

### The Struggle is the Point!
If you can't answer immediately, that's GOOD. The struggle to remember is what strengthens the memory. Try for 30 seconds before looking at the answer.

---

## TECHNIQUE 2: SPACED REPETITION (Never Forget What You Learn)

### The Forgetting Curve
```
Memory Strength
     │
100% │ ●───────●           ●                 ●
     │         │ Review 1  │ Review 2        │ Review 3
 50% │         ●───────────●                 │
     │                     │                 ●───────────────→ Long-term
 25% │                     ●─────────────────│                   Memory!
     │
  0% └────────────────────────────────────────────────────────→ Time
         Day 1    Day 2    Day 4      Day 7         Day 14+

Without review: You forget 80% within 24 hours!
With spaced review: You remember 90%+ forever!
```

### Your Game Dev Learning Schedule

**Follow this exact schedule for optimal retention:**

#### Week 1: Foundation Building

| Day           | Learn                                        | Review                        |
|---------------|----------------------------------------------|-------------------------------|
| **Day 1**     | Part 1: Drawing on Canvas                    | —                             |
| **Day 2**     | Part 2: Physics & Gravity                    | Review Day 1 (10 min)         |
| **Day 3**     | Part 3: Animation System                     | Review Day 1-2 (15 min)       |
| **Day 4**     | Part 4: Collision Detection                  | Review Day 3 (10 min)         |
| **Day 5**     | Part 5: Collectibles & Status Bars           | Review Day 1-4 (20 min)       |
| **Day 6**     | Part 6: Enemy AI & Patrol                    | Review Day 5 (10 min)         |
| **Day 7**     | CONSOLIDATION DAY                            | Review ALL Part 1-6           |

#### Week 2: Advanced Concepts

| Day           | Learn                                        | Review                        |
|---------------|----------------------------------------------|-------------------------------|
| **Day 8**     | Part 7: Stomp Detection & Combat             | Review Part 1-6 (15 min)      |
| **Day 9**     | Part 8: Audio System                         | Review Day 8 (10 min)         |
| **Day 10**    | Part 9: Game State Management                | Review Day 8-9 (15 min)       |
| **Day 11**    | Part 10: Camera, Input & Mobile              | Review Part 7-9 (15 min)      |
| **Day 12**    | CONSOLIDATION DAY                            | Review EVERYTHING             |

---

## TECHNIQUE 3: TIME BOXING (The Pomodoro Method for Developers)

### Time Estimates for Each Part

| Part                                    | Estimated Time | Pomodoros         |
|-----------------------------------------|----------------|-------------------|
| **Part 1: Drawing on Canvas**           | 45 min         | 2                 |
| **Part 2: Physics & Gravity**           | 30 min         | 1                 |
| **Part 3: Animation System**            | 45 min         | 2                 |
| **Part 4: Collision Detection**         | 1 hour         | 2                 |
| **Part 5: Collectibles & Status Bars**  | 30 min         | 1                 |
| **Part 6: Enemy AI & Patrol**           | 45 min         | 2                 |
| **Part 7: Stomp Detection & Combat**    | 1 hour         | 2                 |
| **Part 8: Audio System**               | 30 min         | 1                 |
| **Part 9: Game State Management**       | 45 min         | 2                 |
| **Part 10: Camera, Input & Mobile**     | 30 min         | 1                 |
| **TOTAL**                               | ~7 hours       | 16                |

---

## TECHNIQUE 4: ASSOCIATION & MEMORY TECHNIQUES

### The Game Dev Memory Palace

Imagine a game arcade. Each machine represents a concept. Walk through it in your mind:

```
YOUR GAME DEV MEMORY PALACE
═══════════════════════════════════════════════════════════════════════

ENTRANCE (DrawableObject)
   └── A blank canvas on the wall — everything starts here
       • xCoordinate, yCoordinate = Where to hang the painting
       • draw(ctx)                = The brush that paints
       • IMAGES_CACHE             = A photo album of all poses

PHYSICS ROOM (MovableObject)
   └── A trampoline in the center of the room
       • GRAVITY = 0.3          = How hard the trampoline pulls you down
       • yVelocity              = How fast you're currently flying
       • jump()                 = Bouncing UP (velocity goes NEGATIVE!)
       • GROUND_LEVEL = 180     = The floor (y=0 is the CEILING!)

ANIMATION THEATER (playAnimation)
   └── A film projector cycling through slides
       • IMAGES_WALKING[]       = A filmstrip of walking poses
       • currentImageIndex      = Which slide is showing NOW
       • % images.length        = Loop back to slide 1 after the last
       • setInterval(100ms)     = Change slide every 100ms (136ms for jump)

ARCADE MACHINE (Collision Detection)
   └── Two bumper car hitboxes overlapping
       • isColliding(obj)       = "Are the cars touching?"
       • collisionOffsetX/Y     = "Shrink the bumper to fit tighter"
       • AABB                   = Axis-Aligned Bounding Box

SCOREBOARD (StatusBar)
   └── A health meter with 6 LED segments
       • setPercentage(80)      = Light up 4 of 6 segments
       • 0-19 → image[0]       = Nearly dead!
       • 100  → image[5]       = Full health!

ENEMY DEN (Patrol AI)
   └── A guard walking back and forth in a hallway
       • patrolStartX           = Left wall
       • patrolEndX             = Right wall
       • movingRight = true     = Currently heading right
       • flip at boundaries     = Turn around at walls

JUKEBOX (AudioManager)
   └── A jukebox with one song slot and many SFX buttons
       • playMusic()            = Put a record on (loops forever)
       • playSFX()              = Press a button (plays once)
       • toggleMute()           = Pull the power plug
       • localStorage           = Remember the volume setting

BOTTLE RANGE (ThrowableObject)
   └── A catapult launching salsa bottles in an arc
       • THROW_INITIAL_VELOCITY  = Launch angle (negative = upward)
       • THROWABLE_GRAVITY       = How quickly the arc curves down (2)
       • splash()                = Bottle breaks on impact (500ms animation)
       • markForRemoval          = Flag for cleanup crew (World)

LEVEL BLUEPRINT (createLevel1)
   └── An architect's blueprint for the game world
       • 9 enemies               = 4 Chickens + 4 SmallChickens + 1 Endboss
       • 10 coins + 10 bottles   = Collectibles spread across the level (max 5 carried)
       • 4 layers × 4 positions  = Seamless background with depth
       • Factory function         = Fresh blueprint every restart

DISPLAY CASE (CSS Responsive Architecture)
   └── A picture frame that scales its contents proportionally
       • container-type: size    = "Measure ME, not the room!"
       • cqh / cqw              = Units relative to the frame, not the wall
       • position: absolute     = Stay inside the frame (not fixed to the wall)
       • 750px height cap       = Frame never grows taller than 750px
       • calc(100cqh - 100cqw * 9/16) = Exact size of the black mat below the picture
```

### Character Associations

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  THE EL POLLO LOCO CAST                                             │
│                                                                     │
│  DrawableObject = "The Canvas"                                      │
│      The blank stage where everything appears                       │
│      "I know WHERE and HOW BIG things are."                         │
│                                                                     │
│  MovableObject = "The Physicist"                                    │
│      Knows about gravity, velocity, and movement                    │
│      "I make things fall, jump, and slide."                         │
│                                                                     │
│  Character = "Pepe the Hero"                                        │
│      Reads keyboard input, has health, can throw bottles             │
│      "I listen to YOUR commands and fight enemies!"                 │
│                                                                     │
│  Chicken = "The Patroller"                                          │
│      Walks left-right in a 500px hallway                            │
│      "Left, right, left, right... SQUAWK!"                          │
│                                                                     │
│  Endboss = "The Guardian"                                           │
│      Watches for the character, has 5 states                        │
│      "Come closer... I DARE you. *attack mode*"                     │
│                                                                     │
│  CollisionHandler = "The Referee"                                   │
│      Checks if things are touching and decides outcomes              │
│      "Stomp from above = enemy dies. Side hit = YOU take damage."   │
│                                                                     │
│  WorldRenderer = "The Camera Operator"                              │
│      Draws everything in the right order with camera offset          │
│      "Background first, then objects, then UI on top!"              │
│                                                                     │
│  AudioManager = "The DJ"                                            │
│      One DJ for the whole game (singleton)                          │
│      "One track playing, many sound effects ready to fire!"         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Visual Mnemonics for Key Concepts

```
Canvas Coordinate System — "Y is UPSIDE DOWN!"
═══════════════════════════════════════════════

    (0, 0) ────────────────────────→ x (720)
      │
      │   "y=0 is the TOP of the screen"
      │   "y=480 is the BOTTOM"
      │
      │   So GROUND_LEVEL = 180
      │   means ground is near the TOP (in world units)
      │
      │   Jumping = yVelocity goes NEGATIVE
      │   (because UP means SMALLER y values)
      │
      ▼
    y (480)


Sprite Flipping — "Save, Flip, Draw, Restore"
══════════════════════════════════════════════

    Normal:                    Flipped (otherDirection = true):
    ┌──────────┐               ┌──────────┐
    │  Pepe →  │               │  ← Pepe  │
    │  facing  │    ctx.save() │  facing   │
    │  right   │    translate  │  left     │
    └──────────┘    scale(-1)  └──────────┘
                    drawImage
                    ctx.restore()


Collision Offsets — "Tighter Hitbox"
═══════════════════════════════════

    ┌─────────────────────┐  ← Full sprite (120x280)
    │     hat (no hit!)   │
    │  ┌───────────────┐  │  ← collisionOffsetY = 100
    │  │               │  │
    │  │   REAL        │  │  ← Actual collision box (80x150)
    │  │   HITBOX      │  │
    │  │               │  │
    │  └───────────────┘  │
    │         feet        │  ← collisionOffsetHeight = 30
    └─────────────────────┘
       ↑               ↑
    offsetX=20    offsetWidth=20
```

### Concept Linking Chain

**If you know web development...**

| Web Dev Concept                        | Game Dev Equivalent                         |
|----------------------------------------|---------------------------------------------|
| `document.getElementById()`            | `canvas.getContext('2d')`                   |
| `element.style.left = '10px'`          | `ctx.drawImage(img, x, y, w, h)`           |
| `requestAnimationFrame(fn)`            | Game loop (≈60 FPS via rAF + accumulator)   |
| `addEventListener('keydown', fn)`      | `keyboard.RIGHT = true`                     |
| CSS `position: absolute`              | Canvas `ctx.translate(x, y)`                |
| DOM element bounding box              | AABB collision detection                    |
| `classList.toggle('active')`           | `currentState = 'walking'`                 |
| `localStorage.setItem()`              | Persisting mute state                       |

---

## TECHNIQUE 5: GAMIFICATION — Level Up Your Learning

### Achievement Badges

Earn these as you complete each part:

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  CANVAS APPRENTICE         Complete Part 1 — You can draw sprites   │
│                             on the HTML5 Canvas                     │
│                                                                     │
│  PHYSICS ENGINE             Complete Part 2 — You understand        │
│                             gravity, velocity, and jumping          │
│                                                                     │
│  ANIMATION MASTER           Complete Part 3 — You can cycle         │
│                             through sprite frames smoothly          │
│                                                                     │
│  COLLISION DETECTIVE        Complete Part 4 — You detect when       │
│                             game objects overlap                    │
│                                                                     │
│  UI ARCHITECT               Complete Part 5 — You display           │
│                             dynamic status bars and pickups         │
│                                                                     │
│  AI PROGRAMMER              Complete Part 6 — You make enemies      │
│                             patrol and react to the player          │
│                                                                     │
│  COMBAT ENGINEER            Complete Part 7 — You detect stomps     │
│                             vs side hits using frame tracking       │
│                                                                     │
│  SOUND DESIGNER             Complete Part 8 — You manage music      │
│                             and SFX with a singleton pattern        │
│                                                                     │
│  STATE MACHINE BUILDER      Complete Part 9 — You control           │
│                             game flow from menu to victory          │
│                                                                     │
│  GAME ARCHITECT             Complete Part 10 — You understand       │
│                             cameras, input, and mobile controls     │
│                                                                     │
│  GAME DEV MASTER            Complete ALL Parts — You can build      │
│                             a full 2D platformer from scratch!      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

# Active Recall Cheatsheet (Test Yourself First!)

Before diving into the parts, try this quick quiz. **Don't peek at the answers!**

## Quick Terminology Quiz

```
INSTRUCTIONS: Cover the right column. Try to answer from memory.

Question                                      Answer
───────────────────────────────────────────   ─────────────────────────────────
What does ctx.drawImage() do?               → Draws an image on the canvas
What is AABB?                               → Axis-Aligned Bounding Box collision
What is GROUND_LEVEL (180)?                 → The y-coordinate of the ground
Why is jump velocity NEGATIVE?              → Because y=0 is the top of screen
What does previousY track?                  → Character's y position last frame
What does otherDirection do?                → Flips the sprite horizontally
What is collisionOffsetY?                   → Shrinks the hitbox from the top
What does playAnimation() do?              → Cycles to the next sprite frame
What pattern does AudioManager use?         → Singleton (one instance for all)
What does ITEMS_PER_FULL_BAR mean?          → Max items (5) before bar is full
What does setPercentage(60) show?           → The 60% image (index 3 of 6)
What does isStomp() check?                 → Falling + was above enemy last frame
What is FRAME_INTERVAL?                     → 16.67ms (60 FPS)
What does ENEMY_BOUNCE_FORCE do?            → Pushes character UP after stomp
What does createLevel1() return?            → A fresh level object (factory pattern)
How does mute state persist?                → localStorage key 'gameMuted'
What does ctx.translate(-cameraX) do?       → Scrolls the world left
Why run setupTouchControls() after init()? → keyboard must exist before attaching listeners
What does touchControlsInitialized prevent? → Duplicate listeners stacking on restart
What is THROWABLE_GRAVITY?                 → Bottle gravity (2, heavier than character's 0.3)
What does markForRemoval do?               → Flags a bottle for cleanup by World
What is CHARACTER_IDLE_TIMEOUT?            → 5000ms — triggers longIdle/snoring
What does endScreenTimeout store?          → setTimeout ID for gameover/victory overlay
What does WorldRenderer delegate?          → All canvas drawing operations for World
What does isEndbossVisible() check?        → If the endboss is within camera viewport
What does isTouchDevice() detect?          → Whether the device supports touch input
```

## Where Does Each Concept Live?

```
INSTRUCTIONS: Cover the "File" column. Guess where each lives.

Concept                     File
──────────────────────────  ─────────────────────────────
Class inheritance root    → classes/DrawableObject.js
Gravity & jumping         → classes/MovableObject.js
Player input handling     → classes/Character.js
Enemy patrol logic        → classes/Chicken.js (& SmallChicken.js)
Boss state machine        → classes/Endboss.js
Collision responses       → classes/CollisionHandler.js
Canvas rendering          → classes/WorldRenderer.js
Game tick orchestration   → classes/World.js
Sound management          → classes/AudioManager.js
Status bar display        → classes/StatusBar.js
Bottle throw physics      → classes/ThrowableObject.js
Collectible bottles       → classes/Bottle.js
Collectible coins         → classes/Coin.js
Background layers         → classes/BackgroundObject.js
Decorative clouds         → classes/Cloud.js
Level data container      → classes/Level.js
All magic numbers         → scripts/constants.js
Game loop & UI screens    → scripts/script.js
Pause/resume & fullscreen → scripts/script.js
Touch controls & mobile   → scripts/script.js
Background particles      → scripts/backgroundAnimation.js
Level data factory        → levels/level1.js
Keyboard state object     → classes/Keyboard.js
```

---

# Complete Project File Reference

> **Use this section as a map while learning.** When a part references a file, look it up here for context.

## Class Hierarchy

```
DrawableObject (145 lines)
│   Properties: x, y, width, height, IMAGES_CACHE, collisionOffsets
│   Methods: draw(), drawFrame(), loadImages(), isColliding()
│
├── MovableObject (65 lines)
│       Adds: OBJECT_SPEED, yVelocity, isJumping, previousY
│       Methods: moveLeft(), moveRight(), jump(), applyGravity()
│       │
│       ├── Character (266 lines) — player character "Pepe"
│       │     Features: one-shot jump animation, snoring, spaceWasPressed
│       ├── Chicken (100 lines) — regular enemy
│       ├── SmallChicken (94 lines) — small fast enemy
│       ├── Endboss (269 lines) — final boss
│       │     Features: chase/wander AI, death animation, state reset
│       ├── ThrowableObject (153 lines) — thrown bottle projectile
│       └── Cloud (36 lines) — decorative cloud
│
├── BackgroundObject (22 lines) — static background layer
├── Coin (56 lines) — animated spinning collectible
├── Bottle (27 lines) — static ground collectible
└── StatusBar (72 lines) — percentage-based UI bar
```

## Delegate Classes

| Class | Purpose | Owned By |
|-------|---------|----------|
| `CollisionHandler` (143 lines) | All collision detection and response | World |
| `WorldRenderer` (167 lines) | All canvas drawing operations | World |
| `AudioManager` (131 lines) | Sound effects and music (singleton) | Global |
| `Keyboard` (16 lines) | Keyboard state tracking | Script.js |

## Scripts

| File | Purpose | Key Functions |
|------|---------|---------------|
| `constants.js` (~590 lines) | All magic numbers, image paths (green/blue/orange themes), audio paths, background animation constants | Constants only |
| `script.js` (~413 lines) | Game init, loop (rAF + accumulator), UI, input, pause, fullscreen, DOM caching | `startGame()`, `init()`, `startGameLoop()`, `gameLoop()`, `restartGame()`, `backToMenu()`, `togglePause()`, `cacheDOMElements()`, `preloadImages()` |
| `backgroundAnimation.js` (~276 lines) | Landing page particle animation, gradient sphere parallax, mouse interaction | `initBackgroundAnimation()`, `bgAnimationLoop()`, `applyBgParallax()`, `drawBgMouseGlow()`, `drawBgParticleLines()` |
| `level1.js` (92 lines) | Level data factory | `createLevel1()` |

## HTML & CSS

| File | Purpose |
|------|---------|
| `index.html` (~213 lines) | Animated background, canvas, landing page with hero image, overlays, pause/fullscreen/mute buttons, mobile controls |
| `style.css` (~732 lines) | All styles, animated gradient spheres, grid/noise overlays, container queries, responsive design, UI button styles |
| `impressum.html` (~104 lines) | Legal notice page with animated background (links to `style.css`, loads `constants.js` + `backgroundAnimation.js`) |

## Game Loop Flow

```
startGameLoop()
  requestAnimationFrame → gameLoop(currentTime)
    │
    │  accumulator += delta          ← real elapsed time since last frame
    │
    │  while (accumulator >= FRAME_INTERVAL):   ← fixed 16.67ms steps
    │    world.update()
    │    │   ├── Check death/victory
    │    │   ├── character.update()
    │    │   │     ├── handleMovement()  ← reads keyboard
    │    │   │     ├── applyGravity()   ← saves previousY, applies physics
    │    │   │     └── updateState()    ← state machine
    │    │   ├── handleThrow()          ← 'D' key + bottle available
    │    │   ├── clouds/enemies update
    │    │   ├── updateThrownBottles()
    │    │   ├── collisionHandler.checkCollisions()
    │    │   │     ├── checkCoinCollisions()
    │    │   │     ├── checkBottleCollisions()
    │    │   │     ├── checkEnemyCollisions()
    │    │   │     └── checkBottleEnemyCollisions()
    │    │   └── updateCamera()
    │    accumulator -= FRAME_INTERVAL
    │
    world.draw()                     ← once per frame (not per step)
        └── renderer.draw()
              ├── clearCanvas()
              ├── ctx.translate(-cameraX)  ← camera scroll
              ├── draw backgrounds, objects, character
              ├── ctx.restore()
              └── draw UI (status bars)    ← fixed on screen
    │
    requestAnimationFrame(gameLoop)  ← schedule next frame
```

---

# Part 1: Drawing on Canvas — The Foundation

## What is HTML5 Canvas?

The HTML5 `<canvas>` element is a **pixel drawing surface**. Unlike DOM elements (divs, images), canvas gives you a blank rectangle where you draw everything pixel by pixel using JavaScript.

```
DOM Rendering:                        Canvas Rendering:
┌────────────────────┐               ┌────────────────────┐
│ <div class="hero"> │               │ ctx.drawImage(     │
│   <img src="...">  │               │   img, x, y, w, h  │
│   <p>Health: 80</p>│               │ )                   │
│ </div>             │               │                     │
│                    │               │ 60 times per second  │
│ Browser handles    │               │ YOU redraw everything│
│ layout for you     │               │ from scratch         │
└────────────────────┘               └────────────────────┘
```

### Why Canvas for games?

- **Performance**: Drawing pixels is faster than manipulating DOM nodes
- **Control**: You decide exactly what appears where, every frame
- **No layout engine**: No CSS box model, flexbox, or positioning quirks
- **Standard**: Works in every modern browser, no plugins needed

## Real Code: DrawableObject — The Root of Everything

**File:** `classes/DrawableObject.js`

Every visible object in the game — the character, enemies, coins, backgrounds, status bars — extends this class. It provides the essential "I can be drawn on screen" capability.

```javascript
class DrawableObject {
    xCoordinate = 0;
    yCoordinate = 0;
    width;
    height;
    img;                    // The current Image object to draw
    IMAGES_CACHE = {};      // Dictionary: path string → Image object
    currentImageIndex = 0;  // Which animation frame we're on
    otherDirection = false; // Should the sprite be flipped?

    // Collision box adjustments (shrink the hitbox)
    collisionOffsetX = 0;
    collisionOffsetY = 0;
    collisionOffsetWidth = 0;
    collisionOffsetHeight = 0;
}
```

**What's happening:**
1. Every object has a position (`xCoordinate`, `yCoordinate`) and size (`width`, `height`)
2. `img` holds the **current** sprite image to draw this frame
3. `IMAGES_CACHE` stores ALL loaded images so we can switch between them instantly
4. `otherDirection` controls horizontal flipping (facing left vs. right)

### The draw() Method — Painting on Canvas

```javascript
draw(ctx) {
    if (!this.img) return;

    if (this.otherDirection) {
        ctx.save();
        ctx.translate(this.xCoordinate + this.width, this.yCoordinate);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, 0, 0, this.width, this.height);
        ctx.restore();
    } else {
        ctx.drawImage(this.img, this.xCoordinate, this.yCoordinate,
                      this.width, this.height);
    }
}
```

**Breaking it down:**

```
Normal drawing:
  ctx.drawImage(img, x, y, width, height)
  Draws the image at position (x, y) with the given size.

Flipped drawing (when otherDirection = true):
  1. ctx.save()         → Save the current canvas state
  2. ctx.translate()    → Move the origin point
  3. ctx.scale(-1, 1)   → Flip horizontally (mirror)
  4. ctx.drawImage()    → Draw at (0, 0) since we already translated
  5. ctx.restore()      → Undo the save/translate/scale
```

**Why save and restore?** Without `restore()`, the flip would affect EVERYTHING drawn after this object. `save()`/`restore()` isolates the transformation to just this one draw call.

### Loading Images — Building the Photo Album

```javascript
loadImages(STORAGE, IMAGES_PATHS) {
    IMAGES_PATHS.forEach(path => {
        let img = new Image();
        img.src = path;
        STORAGE.push(img);
        this.IMAGES_CACHE[path] = img;
    });
}
```

**What this does:**
1. Takes an array of image file paths (like `['img/walk_1.png', 'img/walk_2.png']`)
2. Creates a `new Image()` for each path (starts loading it from disk)
3. Stores the Image object in both the `STORAGE` array AND the `IMAGES_CACHE` dictionary
4. The `IMAGES_CACHE` lets us look up any image by its path string later

```
IMAGES_CACHE after loading:
┌──────────────────────────────────────────────────────┐
│  'img/walk_1.png'  →  [Image object ████]            │
│  'img/walk_2.png'  →  [Image object ████]            │
│  'img/walk_3.png'  →  [Image object ████]            │
│  'img/jump_1.png'  →  [Image object ████]            │
│  ...                                                  │
└──────────────────────────────────────────────────────┘
```

### The Canvas Coordinate System

```
IMPORTANT: Canvas y-axis is INVERTED compared to math class!

    (0, 0) ─────────────────────────→ x = 720 (CANVAS_WIDTH)
      │
      │  y=0 is the TOP
      │
      │  Pepe stands at y=180 (GROUND_LEVEL)
      │  That's near the TOP of the canvas!
      │
      │  The canvas is 480px tall
      │  But the CHARACTER is 280px tall
      │  So his feet are at y = 180 + 280 = 460 (near the bottom)
      │
      ▼
    y = 480 (CANVAS_HEIGHT)

KEY INSIGHT:
  Moving UP on screen = DECREASING y value
  Moving DOWN on screen = INCREASING y value
  That's why jump velocity is NEGATIVE!
```

### Exercise 1.1: Trace the Drawing

Open `classes/DrawableObject.js` in your editor. Answer:

1. What happens if `this.img` is `undefined` when `draw()` is called?
2. If a Character has `otherDirection = true` and is at `xCoordinate = 200`, what does `ctx.translate()` receive?
3. Why does flipped drawing use `drawImage(img, 0, 0, ...)` instead of `drawImage(img, x, y, ...)`?
4. What would happen if you forgot `ctx.restore()` after drawing a flipped sprite?

### Exercise 1.2: Calculate Positions

Without looking at the code, calculate:

```
Given:
  CANVAS_WIDTH = 720, CANVAS_HEIGHT = 480
  CHARACTER_WIDTH = 120, CHARACTER_HEIGHT = 280
  GROUND_LEVEL = 180

1. Where are the character's feet when standing on the ground?
   yCoordinate + height = ? + ? = ?

2. A Chicken is 70px tall. What yCoordinate puts its feet on the ground?
   yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - CHICKEN_HEIGHT) = ?

3. The Endboss is 400px tall. What yCoordinate puts its feet on the ground?
   yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - ENDBOSS_HEIGHT) = ?
```

<details>
<summary>Solutions</summary>

1. `180 + 280 = 460` (near the bottom of the 480px canvas)
2. `180 + (280 - 70) = 390`
3. `180 + (280 - 400) = 60` (the boss is taller than the character, so it starts higher up)

</details>

### What you learned:
```
✅ Canvas is a pixel drawing surface — YOU redraw everything each frame
✅ ctx.drawImage(img, x, y, w, h) draws a sprite on the canvas
✅ ctx.save/translate/scale(-1,1)/restore flips a sprite horizontally
✅ IMAGES_CACHE maps file paths to Image objects for instant lookup
✅ Canvas y-axis is INVERTED — y=0 is the TOP of the screen
✅ GROUND_LEVEL = 180 is the character's top-left y when standing
```

---

# Part 2: Physics & Gravity — Making Things Fall and Jump

## How Gravity Works in a Game

Real-world physics uses continuous calculus. Games use **discrete simulation** — updating position frame by frame, 60 times per second.

```
REAL PHYSICS:                    GAME PHYSICS:
position = ½gt²                  Each frame:
(continuous equation)              yVelocity += GRAVITY
                                   yCoordinate += yVelocity

Same result! But computed step by step.
```

## Real Code: MovableObject — Adding Physics

**File:** `classes/MovableObject.js`

```javascript
class MovableObject extends DrawableObject {
    OBJECT_SPEED;
    yVelocity = 0;
    isJumping = false;
    previousY = 0;  // Last frame's Y position (for stomp detection)

    constructor(width, height, speed) {
        super(0, 0, width, height);
        this.OBJECT_SPEED = speed;
    }
}
```

### The applyGravity() Method — The Physics Engine

```javascript
applyGravity() {
    this.previousY = this.yCoordinate;      // Remember where we WERE
    this.yVelocity += GRAVITY;               // Accelerate downward
    this.yCoordinate += this.yVelocity;      // Move by current velocity

    if (this.yCoordinate >= GROUND_LEVEL) {  // Hit the ground?
        this.yCoordinate = GROUND_LEVEL;     // Clamp to ground
        this.yVelocity = 0;                  // Stop falling
        this.isJumping = false;              // No longer in the air
    }
}
```

**Frame-by-frame breakdown of a jump:**

```
GRAVITY = 0.3, JUMP_FORCE = 11

Frame │ yVelocity │ yCoordinate │ What's happening
──────┼───────────┼─────────────┼──────────────────────────
  0   │    0      │    180      │ Standing on ground
  1   │  -11      │    169      │ JUMP! Velocity goes negative (UP)
  2   │  -10.7    │    158.3    │ Still rising, but slowing down
  3   │  -10.4    │    147.9    │ Rising slower...
  ...  │   ...     │    ...      │
  37  │    0      │    -21      │ APEX — velocity hits zero
  38  │   +0.3    │    -20.7    │ Starting to fall back down
  ...  │   ...     │    ...      │
  73  │  +11      │    180      │ Back on ground! Clamped.
```

```
Height (peak ≈ 201px above ground)
  ▲
  │         ●●●●●●●
  │       ●●         ●●       ← Floaty parabola — 73 frames (~1.2s)
  │     ●●             ●●
  │    ●                 ●
  │   ●                   ●
  │  ●                     ●
  │ ●                       ●
──┼●─────────────────────────●──→ Ground (y = 180)
  │  Frame 0              Frame 73
```

### The jump() Method

```javascript
jump() {
    if (!this.isJumping) {
        this.yVelocity = -CHARACTER_JUMP_FORCE;  // -30 (UP!)
        this.isJumping = true;
    }
}
```

**Why negative?** Because canvas y-axis is inverted. Moving UP = decreasing y. So jumping means a NEGATIVE velocity.

### Movement Methods

```javascript
moveLeft() {
    this.xCoordinate -= this.OBJECT_SPEED;
}

moveRight() {
    this.xCoordinate += this.OBJECT_SPEED;
}
```

Simple! Each frame, move left or right by the speed value. At 60 FPS with `CHARACTER_SPEED = 5`, the character moves `5 * 60 = 300 pixels per second`.

### Why previousY Matters

```
┌─────────────────────────────────────────────────────────────────────┐
│  previousY solves a critical problem:                               │
│                                                                     │
│  When the character lands on an enemy, we need to know:             │
│  "Was the character ABOVE the enemy in the PREVIOUS frame?"         │
│                                                                     │
│  Frame 10: character at y=350  (previousY = 340, ABOVE enemy)       │
│  Frame 11: character at y=390  (colliding! But was above → STOMP)   │
│                                                                     │
│  Without previousY, we'd only see the collision in frame 11         │
│  and couldn't tell if it came from above or from the side.          │
│                                                                     │
│  This is the "discrete frame problem" — things teleport between     │
│  frames, so we track where they WERE to determine direction.        │
└─────────────────────────────────────────────────────────────────────┘
```

### Exercise 2.1: Physics Calculation

Without looking at the code, calculate:

```
Given: GRAVITY = 0.3, CHARACTER_JUMP_FORCE = 11

1. How many frames until the character reaches the apex (yVelocity = 0)?
   Frames = JUMP_FORCE / GRAVITY = ?

2. What's the total jump duration (up + down) in frames?
   Total = ? frames

3. At 60 FPS (16.67ms per frame), how long is the jump in milliseconds?
   Duration = total frames × 16.67ms = ?

4. Why does the jump animation run at 136ms per frame?
   There are 9 jump animation frames. 9 × 136ms = ?
   How does this compare to the physical jump duration?
```

<details>
<summary>Solutions</summary>

1. `11 / 0.3 ≈ 37 frames` to reach apex
2. `37 × 2 = 73 frames` total (symmetric parabola)
3. `73 × 16.67 = ~1222ms`
4. `9 × 136 = 1224ms` — almost exactly matches the 1222ms physical jump! This synchronizes the animation with the physics so all 9 frames play exactly once per jump.

</details>

### What you learned:
```
✅ Game physics = velocity += gravity, position += velocity, each frame
✅ Jump velocity is NEGATIVE because canvas y=0 is the top
✅ applyGravity() clamps to GROUND_LEVEL and resets velocity on landing
✅ previousY stores last frame's position for directional detection
✅ Movement is speed × frames — at 60 FPS, speed 5 = 300px/second
✅ Physical jump duration (1222ms) matches animation timing (9 × 136ms)
✅ Lower gravity (0.3) creates a floaty, satisfying jump feel
```

---

# Part 3: Animation System — Bringing Sprites to Life

## How Sprite Animation Works

A sprite animation is like a **flipbook**. You have a series of images (frames), and by showing them in rapid succession, the illusion of movement is created.

```
Walking animation (6 frames):

  Frame 1    Frame 2    Frame 3    Frame 4    Frame 5    Frame 6
  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
  │ 🚶  │   │ 🚶  │   │ 🚶  │   │ 🚶  │   │ 🚶  │   │ 🚶  │
  │     │→  │  ╱  │→  │ |   │→  │  ╲  │→  │     │→  │  ╱  │→ Loop!
  │ / \ │   │/ \  │   │/ \  │   │/ \  │   │ / \ │   │/ \  │
  └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘

  Show each frame for 100ms = smooth walk animation
```

## Real Code: The playAnimation() Method

This method appears in `Character`, `Chicken`, `SmallChicken`, `Endboss`, and `ThrowableObject`:

```javascript
playAnimation(images) {
    let i = this.currentImageIndex % images.length;
    let path = images[i];
    this.img = this.IMAGES_CACHE[path];
    this.currentImageIndex++;
}
```

**What's happening step by step:**

```
Given: IMAGES_CHARACTER_WALKING = ['walk_1.png', 'walk_2.png', ..., 'walk_6.png']
       currentImageIndex = 0

Call 1: i = 0 % 6 = 0 → img = CACHE['walk_1.png']  → index becomes 1
Call 2: i = 1 % 6 = 1 → img = CACHE['walk_2.png']  → index becomes 2
Call 3: i = 2 % 6 = 2 → img = CACHE['walk_3.png']  → index becomes 3
...
Call 6: i = 5 % 6 = 5 → img = CACHE['walk_6.png']  → index becomes 6
Call 7: i = 6 % 6 = 0 → img = CACHE['walk_1.png']  → LOOPS BACK!
```

The `%` (modulo) operator is the key — it automatically wraps around to 0 when the index exceeds the array length.

### The Animation Loop — setInterval

> **📌 Historical note:** The code below shows the **original** approach using `setInterval`. This was later refactored to a delta-time accumulator pattern in **Part 11**. Understanding the original design helps you see *why* the refactor was needed (multiple timers cause mobile lag). Read this section first, then see Part 11 for the modern version.

**File:** `classes/Character.js`

```javascript
startAnimation() {
    let lastState = '';

    this.animationInterval = setInterval(() => {
        // Detect state change to jumping → switch to one-shot jump animation
        if (lastState !== this.currentState && this.currentState === 'jumping') {
            this.currentImageIndex = 0;  // Reset to frame 1
            clearInterval(this.animationInterval);
            this.startJumpAnimation();
            return;
        }
        lastState = this.currentState;

        // Play animation based on current state
        if (this.currentState === 'dead') {
            this.playAnimation(IMAGES_CHARACTER_DEAD);
        } else if (this.currentState === 'hurt') {
            this.playAnimation(IMAGES_CHARACTER_HURT);
        } else if (this.currentState === 'walking') {
            this.playAnimation(IMAGES_CHARACTER_WALKING);
        } else if (this.currentState === 'longIdle') {
            this.playAnimation(IMAGES_CHARACTER_LONG_IDLE);
        } else {
            this.playAnimation(IMAGES_CHARACTER_IDLE);
        }
    }, ANIMATION_SPEED_NORMAL);  // 100ms per frame
}
```

### One-Shot Jump Animation Architecture

The jump uses a **one-shot animation** — all 9 frames play exactly once during the jump, then freeze on the last frame until landing. This is different from looping animations (walk, idle) that repeat forever.

```javascript
startJumpAnimation() {
    const totalFrames = IMAGES_CHARACTER_JUMPING.length;  // 9

    this.animationInterval = setInterval(() => {
        if (this.currentState === 'jumping') {
            this.playJumpFrame(totalFrames);
        } else {
            this.currentImageIndex = 0;  // Reset on landing
            clearInterval(this.animationInterval);
            this.startAnimation();       // Back to normal loop
        }
    }, ANIMATION_SPEED_JUMP);  // 136ms per frame
}

playJumpFrame(totalFrames) {
    const frameIndex = Math.min(this.currentImageIndex, totalFrames - 1);
    let path = IMAGES_CHARACTER_JUMPING[frameIndex];
    this.img = this.IMAGES_CACHE[path];

    if (this.currentImageIndex < totalFrames - 1) {
        this.currentImageIndex++;  // Advance, but stop at last frame
    }
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE ONE-SHOT JUMP ANIMATION                                        │
│                                                                     │
│  Normal animations run at 100ms per frame (looping):                │
│  • idle (10 frames × 100ms = 1000ms per cycle)                     │
│  • walking (6 frames × 100ms = 600ms per cycle)                    │
│  • hurt (3 frames × 100ms = 300ms flash)                           │
│                                                                     │
│  Jump animation runs at 136ms per frame (one-shot):                 │
│  • jumping (9 frames × 136ms = 1224ms total)                       │
│  • Synced to physical jump: 2 × 11 / 0.3 = 73 frames = 1222ms     │
│  • Plays ALL frames once, freezes on last frame until landing       │
│                                                                     │
│  How it works:                                                      │
│                                                                     │
│  [Normal interval 100ms — looping]                                  │
│         │                                                           │
│         │ State changes to 'jumping'                                │
│         ▼                                                           │
│  currentImageIndex = 0 ← reset to first frame                      │
│  clearInterval() ← stop old interval                                │
│  startJumpAnimation() ← start 136ms interval (one-shot)            │
│         │                                                           │
│         │ playJumpFrame(): frames 0→1→2→...→8 then FREEZE           │
│         │                                                           │
│         │ Character lands (state != 'jumping')                      │
│         ▼                                                           │
│  currentImageIndex = 0 ← reset on landing                          │
│  clearInterval() ← stop jump interval                               │
│  startAnimation() ← restart normal 100ms interval                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Animation vs Game Loop — Two Independent Clocks

> **📌 Historical note:** The two-clock model below was the original architecture. In **Part 11**, both clocks are merged into a single game loop using delta-time accumulators. The animation accumulator (`animationTimer += FRAME_INTERVAL`) inside each object replaces the separate `setInterval`.

```
Game Loop (16.67ms = 60 FPS):
  ──●──●──●──●──●──●──●──●──●──●──●──●──→
    ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^
    Update physics, check collisions, draw

Animation Loop (100ms for normal, 136ms for jump):
  ──●────────────●────────────●──────────→
    ^            ^            ^
    Change sprite frame

These run INDEPENDENTLY.
The game loop updates position and draws the CURRENT img.
The animation loop changes WHICH img is current.
```

### Endboss Animation — 5 States + One-Shot Death

**File:** `classes/Endboss.js`

```javascript
startAnimation() {
    this.animationInterval = setInterval(() => {
        if (this.currentState === 'dead') {
            this.playDeathAnimation();  // One-shot, not looping!
        } else if (this.currentState === 'hurt') {
            this.playAnimation(IMAGES_ENDBOSS_HURT);
        } else if (this.currentState === 'attack') {
            this.playAnimation(IMAGES_ENDBOSS_ATTACK);
        } else if (this.currentState === 'alert') {
            this.playAnimation(IMAGES_ENDBOSS_ALERT);
        } else {
            this.playAnimation(IMAGES_ENDBOSS_WALKING);
        }
    }, ANIMATION_SPEED_NORMAL);
}

playDeathAnimation() {
    const lastFrame = IMAGES_ENDBOSS_DEAD.length - 1;
    if (this.currentImageIndex <= lastFrame) {
        let path = IMAGES_ENDBOSS_DEAD[this.currentImageIndex];
        this.img = this.IMAGES_CACHE[path];
        this.currentImageIndex++;
    }
    if (this.currentImageIndex > lastFrame) {
        this.deathAnimationComplete = true;  // Signals World to trigger victory
    }
}
```

Same pattern as other states, but `dead` uses a **one-shot animation** (like the jump): plays through 3 frames once, freezes on the last frame, and sets `deathAnimationComplete = true`. The Endboss also resets `currentImageIndex = 0` whenever the state changes (via `resetAnimationOnStateChange()`), ensuring each animation starts from frame 1.

### Long Idle & Snoring — Idle Timeout System

**File:** `classes/Character.js`

When the player stops providing input, the character transitions through idle states:

```javascript
// Inside updateState():
if (Date.now() - this.lastActionTime > CHARACTER_IDLE_TIMEOUT) {  // 5 seconds
    this.currentState = 'longIdle';
    this.startSnoring();
} else {
    this.currentState = 'idle';
}

// Stop snoring when ANY other state becomes active
if (this.currentState !== 'longIdle' && this.isSnoring) {
    this.stopSnoring();
}
```

```javascript
startSnoring() {
    if (this.isSnoring) return;     // Already snoring? Skip
    this.isSnoring = true;
    const sound = AudioManager.getInstance().getSound(AUDIO_SFX_SNORING);
    sound.loop = true;              // Snoring loops until interrupted
    AudioManager.getInstance().playSFX(AUDIO_SFX_SNORING);
}

stopSnoring() {
    this.isSnoring = false;
    const sound = AudioManager.getInstance().getSound(AUDIO_SFX_SNORING);
    sound.loop = false;
    sound.pause();
    sound.currentTime = 0;          // Reset to beginning
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  IDLE STATE TIMELINE                                                 │
│                                                                     │
│  t=0          t=5s              t=?                                 │
│  Last input   │                 │                                   │
│  ├──── idle ──┤── longIdle ─────┤── any key = back to idle/walk     │
│  │  10 frames │  10 frames      │                                   │
│  │  breathing │  sleeping + ZZZ │  stopSnoring() called             │
│  │  (no sound)│  (snoring loop) │                                   │
│                                                                     │
│  lastActionTime is reset by: moving left/right, jumping,            │
│  and by resumeGame() (to prevent snoring right after unpausing).    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### The currentImageIndex Quirk

```
┌─────────────────────────────────────────────────────────────────────┐
│  IMPORTANT: currentImageIndex is SHARED across all animations!      │
│                                                                     │
│  Walking has 6 frames. Idle has 10 frames.                          │
│                                                                     │
│  For the CHARACTER: If currentImageIndex = 4 and state changes      │
│  from walking to idle:                                               │
│  • Next frame: 4 % 10 = 4 → shows idle frame 5 (not frame 1!)     │
│  • In practice this is barely noticeable for looping animations     │
│                                                                     │
│  EXCEPTION — Jump: resets currentImageIndex = 0 on jump start       │
│  AND on landing, so the 9 frames always play from the beginning.   │
│                                                                     │
│  For the ENDBOSS: resetAnimationOnStateChange() resets               │
│  currentImageIndex = 0 whenever the state changes. This means       │
│  every animation (alert, attack, hurt, dead) starts from frame 1.  │
│                                                                     │
│  Two different approaches to the same problem:                       │
│  • Character: only resets for jump (looping states are fine)        │
│  • Endboss: always resets (because state transitions matter more)   │
└─────────────────────────────────────────────────────────────────────┘
```

### All Animation Image Arrays

```
Character (6 animation states, ~40 frames total):
  IMAGES_CHARACTER_IDLE       — 10 frames (breathing)
  IMAGES_CHARACTER_LONG_IDLE  — 10 frames (sleeping)
  IMAGES_CHARACTER_WALKING    —  6 frames (run cycle)
  IMAGES_CHARACTER_JUMPING    —  9 frames (jump arc)
  IMAGES_CHARACTER_HURT       —  3 frames (pain flash)
  IMAGES_CHARACTER_DEAD       —  7 frames (death fall)

Chicken (2 states):
  IMAGES_CHICKEN_WALKING      —  3 frames (waddle)
  IMAGES_CHICKEN_DEAD         —  1 frame  (squashed)

Endboss (5 states):
  IMAGES_ENDBOSS_WALKING      —  4 frames (stomp)
  IMAGES_ENDBOSS_ALERT        —  8 frames (alert pose)
  IMAGES_ENDBOSS_ATTACK       —  8 frames (charge)
  IMAGES_ENDBOSS_HURT         —  3 frames (pain)
  IMAGES_ENDBOSS_DEAD         —  3 frames (collapse)
```

### Exercise 3.1: Animation Math

```
1. At ANIMATION_SPEED_NORMAL (100ms), how long does one full
   walking cycle take? (6 frames × ?ms = ?)

2. At ANIMATION_SPEED_JUMP (136ms), how long does the jump
   animation take? (9 frames × ?ms = ?)

3. If currentImageIndex = 14 and we switch from walking (6 frames)
   to idle (10 frames), which idle frame shows next?
   14 % 10 = ?

4. The coin spins at ANIMATION_SPEED_NORMAL * 2 (200ms).
   With 2 frames, how long is one full spin? (2 × ?ms = ?)

5. Why does the jump animation reset currentImageIndex to 0
   when it starts and when the character lands?
```

<details>
<summary>Solutions</summary>

1. `6 × 100ms = 600ms` per walking cycle
2. `9 × 136ms = 1224ms` jump animation (matches the 1222ms physical jump)
3. `14 % 10 = 4` → shows idle frame 5 (index 4)
4. `2 × 200ms = 400ms` per spin
5. On start: ensures frames begin at frame 1, not mid-cycle from a previous animation. On landing: clears the counter so the next animation (idle/walk) starts cleanly.

</details>

### What you learned:
```
✅ Sprite animation = cycling through images with % (modulo)
✅ IMAGES_CACHE lets us swap images instantly by path lookup
✅ Animations originally used setInterval (refactored to delta-time accumulator in Part 11)
✅ Two speeds: 100ms for normal, 136ms for jumping (syncs with physics)
✅ Jump uses one-shot animation: plays once, freezes, resets on landing
✅ Endboss resets currentImageIndex on every state change (clean transitions)
✅ State machine selects which image array to animate
✅ Long idle triggers after 5s of no input (CHARACTER_IDLE_TIMEOUT)
✅ Snoring uses loop=true on the Audio element, stopped on any action
```

---

# Part 4: Collision Detection — When Things Touch

## What is AABB Collision Detection?

AABB stands for **Axis-Aligned Bounding Box**. It's the simplest and fastest collision detection method: wrap each object in a rectangle, check if rectangles overlap.

```
Two objects NOT colliding:         Two objects COLLIDING:
┌──────┐                          ┌──────┐
│  A   │    ┌──────┐              │  A ──┼──┐
│      │    │  B   │              │    ┌─┼──┤ B
└──────┘    │      │              └────┼─┘  │
            └──────┘                   └────┘
                                     ↑
No overlap in x OR y.           Overlap in BOTH x AND y!
```

### The Overlap Rule

Two rectangles overlap when ALL FOUR of these are true:
1. A's right edge is past B's left edge
2. A's left edge is before B's right edge
3. A's bottom edge is past B's top edge
4. A's top edge is before B's bottom edge

If ANY one of these is false, the objects are NOT colliding.

## Real Code: isColliding() in DrawableObject

**File:** `classes/DrawableObject.js`

```javascript
isColliding(obj) {
    return (
        this.xCoordinate + this.collisionOffsetX + this.width
            - this.collisionOffsetWidth
            > obj.xCoordinate + obj.collisionOffsetX &&

        this.xCoordinate + this.collisionOffsetX
            < obj.xCoordinate + obj.collisionOffsetX + obj.width
            - obj.collisionOffsetWidth &&

        this.yCoordinate + this.collisionOffsetY + this.height
            - this.collisionOffsetHeight
            > obj.yCoordinate + obj.collisionOffsetY &&

        this.yCoordinate + this.collisionOffsetY
            < obj.yCoordinate + obj.collisionOffsetY + obj.height
            - obj.collisionOffsetHeight
    );
}
```

### Breaking Down the Collision Box

```
Without offsets (full sprite):       With offsets (tight hitbox):
┌─────────────────────┐              ┌─────────────────────┐
│                     │              │     hat — NOT hit!   │
│    Full 120×280     │              │  ┌───────────────┐  │
│    sprite           │              │  │               │  │  ← offsetY = 100
│                     │              │  │   COLLISION    │  │
│                     │              │  │   BOX          │  │     80 × 150
│                     │              │  │   80 × 150     │  │
│                     │              │  │               │  │
│                     │              │  └───────────────┘  │
│                     │              │     feet — NOT hit!  │  ← offsetHeight = 30
└─────────────────────┘              └─────────────────────┘
                                        ↑               ↑
                                    offsetX=20    offsetWidth=20
```

**Why collision offsets?**

The character sprite is 120×280 pixels, but Pepe's actual body is much smaller. His hat, extended arms, and the space around his feet shouldn't count as "touchable." Without offsets, you'd take damage when an enemy touches Pepe's hat — that feels unfair!

### All Collision Boxes in the Game

```
Object          │ Sprite Size │ Offsets (X, Y, W, H)    │ Effective Hitbox
────────────────┼─────────────┼─────────────────────────┼────────────────
Character       │ 120 × 280  │ 20, 100, 20, 30         │  80 × 150
Chicken         │  60 × 70   │  5, 5, 5, 5             │  50 × 60
SmallChicken    │  50 × 60   │  5, 5, 5, 5             │  40 × 50
Endboss         │ 250 × 400  │ 40, 70, 40, 100         │ 170 × 230
Coin            │  60 × 60   │ 10, 10, 10, 10          │  40 × 40
Bottle (ground) │  60 × 70   │ 10, 10, 10, 10          │  40 × 50
ThrowableObject │  60 × 70   │  5, 5, 5, 5             │  50 × 60
```

### Debug Visualization

**File:** `classes/DrawableObject.js` — `drawFrame()`

```javascript
drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken ||
        this instanceof SmallChicken || this instanceof Endboss) {

        // Blue = full sprite boundary
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(this.xCoordinate, this.yCoordinate,
                       this.width, this.height);

        // Red = actual collision box
        ctx.strokeStyle = 'red';
        ctx.strokeRect(
            this.xCoordinate + this.collisionOffsetX,
            this.yCoordinate + this.collisionOffsetY,
            this.width - this.collisionOffsetWidth - this.collisionOffsetX,
            this.height - this.collisionOffsetHeight - this.collisionOffsetY
        );
    }
}
```

This draws **blue** rectangles for the full sprite and **red** rectangles for the collision box. Toggle with `world.debugMode = true` in the console to see hitboxes while playing!

### The Four Collision Checks

**File:** `classes/CollisionHandler.js`

```javascript
checkCollisions() {
    this.checkCoinCollisions();       // Character touches coin → collect
    this.checkBottleCollisions();     // Character touches bottle → pick up
    this.checkEnemyCollisions();      // Character touches enemy → stomp or damage
    this.checkBottleEnemyCollisions(); // Thrown bottle touches enemy → kill/damage
}
```

Each check runs every frame (60 times per second), iterating through all relevant objects.

### Exercise 4.1: Collision Math

```
Given:
  Character at x=200, y=180, width=120, height=280
  Character offsets: X=20, Y=100, Width=20, Height=30
  Chicken at x=290, y=390, width=60, height=70
  Chicken offsets: X=5, Y=5, Width=5, Height=5

1. What is the character's collision box?
   Left:   200 + 20 = ?
   Right:  200 + 20 + 120 - 20 = ?
   Top:    180 + 100 = ?
   Bottom: 180 + 100 + 280 - 30 = ?

2. What is the chicken's collision box?
   Left:   290 + 5 = ?
   Right:  290 + 5 + 60 - 5 = ?
   Top:    390 + 5 = ?
   Bottom: 390 + 5 + 70 - 5 = ?

3. Do they overlap? Check all 4 conditions.
```

<details>
<summary>Solutions</summary>

1. Character collision box: Left=220, Right=320, Top=280, Bottom=530
2. Chicken collision box: Left=295, Right=350, Top=395, Bottom=460
3. Check overlap:
   - Character right (320) > Chicken left (295)? YES
   - Character left (220) < Chicken right (350)? YES
   - Character bottom (530) > Chicken top (395)? YES
   - Character top (280) < Chicken bottom (460)? YES
   - All four YES → COLLIDING!

</details>

### What you learned:
```
✅ AABB = rectangle overlap test (4 conditions, ALL must be true)
✅ Collision offsets shrink hitboxes for fair gameplay
✅ The character's hat and feet are excluded from the hitbox
✅ Debug mode draws blue (sprite) and red (collision) rectangles
✅ Four collision checks run every frame: coins, bottles, enemies, thrown bottles
✅ isColliding() is defined on DrawableObject — available to ALL objects
```

---

# Part 5: Collectibles & Status Bars — Feedback Systems

## How Status Bars Work

Status bars are pre-rendered images. Instead of drawing a "fill percentage" dynamically, the game uses 6 pre-made images for each bar:

```
Image Index:    0          1          2          3          4          5
Percentage:   0-19%     20-39%     40-59%     60-79%     80-99%      100%

              ░░░░░░     ██░░░░     ████░░     ██████     ████████   ██████████
              Empty      20%        40%        60%        80%        Full
```

## Real Code: StatusBar

**File:** `classes/StatusBar.js`

```javascript
class StatusBar extends DrawableObject {
    images = [];
    percentage = 100;

    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        this.img = this.images[index];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80)  return 4;
        if (this.percentage >= 60)  return 3;
        if (this.percentage >= 40)  return 2;
        if (this.percentage >= 20)  return 1;
        return 0;
    }
}
```

**The mapping is simple:**

| Percentage Range | Image Index | Visual         |
|------------------|-------------|----------------|
| 100              | 5           | Full bar       |
| 80-99            | 4           | Nearly full    |
| 60-79            | 3           | Above half     |
| 40-59            | 2           | Half           |
| 20-39            | 1           | Low            |
| 0-19             | 0           | Nearly empty   |

### How Collectibles Update the Bar

**File:** `classes/CollisionHandler.js`

```javascript
checkCoinCollisions() {
    for (let i = this.world.level.coins.length - 1; i >= 0; i--) {
        const coin = this.world.level.coins[i];
        if (this.world.coinsCollected >= ITEMS_PER_FULL_BAR) continue; // Skip if full
        if (!this.isNearCharacter(coin)) continue;

        if (this.world.character.isColliding(coin)) {
            this.world.level.coins.splice(i, 1);           // Remove coin from level
            this.world.coinsCollected++;                     // Increment counter
            AudioManager.getInstance().playSFX(AUDIO_SFX_COIN);  // Play sound
            const coinPercentage = Math.min(100,
                (this.world.coinsCollected / ITEMS_PER_FULL_BAR) * 100);
            this.world.coinBar.setPercentage(coinPercentage); // Update bar
        }
    }
}
```

**Max capacity guard:** The `if (coinsCollected >= ITEMS_PER_FULL_BAR) continue` line prevents picking up more items than the bar can display. With 5 max, each item = exactly one 20% step. Items stay on the ground for later if the player uses/throws some.

**The percentage formula:**

```
Coins collected: 3 out of 5 (ITEMS_PER_FULL_BAR = 5)

coinPercentage = (3 / 5) × 100 = 60%
Math.min(100, 60) = 60%

setPercentage(60) → resolveImageIndex() → 60 >= 60 → index 3

Bar shows: ████░░ (60% image)
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY ITERATE BACKWARDS?                                             │
│                                                                     │
│  for (let i = array.length - 1; i >= 0; i--)                      │
│                                                                     │
│  When you splice(i, 1) to remove an item, everything after it      │
│  shifts left. If you iterate forward, you'd skip the next item!    │
│                                                                     │
│  Forward (BUG):         Backward (CORRECT):                        │
│  [A, B, C] → remove B   [A, B, C] → remove B                      │
│  i=1 → splice B         i=1 → splice B                             │
│  [A, C] → i=2 → SKIP C! [A, C] → i=0 → check A ✅                │
│                                                                     │
│  Iterating backwards means removed items don't affect               │
│  the indices of items we haven't checked yet.                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Real Code: Bottle (Ground Collectible)

**File:** `classes/Bottle.js`

The Bottle is the simplest collectible — a static image with no animation:

```javascript
class Bottle extends DrawableObject {
    constructor(x) {
        // Initialize with bottle dimensions and ground position
        super(x, BOTTLE_Y, BOTTLE_WIDTH, BOTTLE_HEIGHT);

        // Load static bottle image (shared cache)
        this.img = getCachedImage(IMAGES_BOTTLE_GROUND[0]);

        // Set collision box offsets (generous for easier collection)
        this.collisionOffsetX = BOTTLE_COLLISION_OFFSET_X;
        this.collisionOffsetY = BOTTLE_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = BOTTLE_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = BOTTLE_COLLISION_OFFSET_HEIGHT;
    }
}
```

**Why it's so simple:**
- Extends `DrawableObject` directly (not `MovableObject`) — bottles don't move
- Uses `getCachedImage()` instead of `loadImages()` — only one static image, no animation
- `BOTTLE_Y` is calculated in `constants.js`: `GROUND_LEVEL + (CHARACTER_HEIGHT - BOTTLE_HEIGHT)` — aligns the bottom of the bottle with the character's feet
- Collision offsets shrink the hitbox by 10px on each side (60×70 sprite → 40×50 hitbox) for generous but not unfair pickup range

The bottle collection logic in `CollisionHandler.checkBottleCollisions()` follows the same backwards-iteration pattern as coins:

```javascript
checkBottleCollisions() {
    for (let i = this.world.level.bottles.length - 1; i >= 0; i--) {
        const bottle = this.world.level.bottles[i];
        if (this.world.bottlesCollected >= ITEMS_PER_FULL_BAR) continue; // Skip if full
        if (!this.isNearCharacter(bottle)) continue;

        if (this.world.character.isColliding(bottle)) {
            this.world.level.bottles.splice(i, 1);
            this.world.bottlesCollected++;
            AudioManager.getInstance().playSFX(AUDIO_SFX_BOTTLE_PICKUP);
            const bottlePercentage = Math.min(100,
                (this.world.bottlesCollected / ITEMS_PER_FULL_BAR) * 100);
            this.world.bottleBar.setPercentage(bottlePercentage);
        }
    }
}
```

### Real Code: Coin (Animated Collectible)

**File:** `classes/Coin.js`

Unlike Bottle, the Coin has a spinning animation — it extends `DrawableObject` but adds its own `update()` method driven by a delta-time accumulator:

```javascript
class Coin extends DrawableObject {
    IMAGES_COIN = [];

    // Animation accumulator (replaces setInterval)
    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL * 2; // Slower animation (200ms per frame)

    constructor(x, y = GROUND_LEVEL) {
        super(x, y, COIN_WIDTH, COIN_HEIGHT);

        // Load coin animation images
        this.loadImages(this.IMAGES_COIN, IMAGES_COIN);

        // Set initial image
        this.img = this.IMAGES_CACHE[IMAGES_COIN[0]];

        // Set collision box offsets (generous for easier collection)
        this.collisionOffsetX = COIN_COLLISION_OFFSET_X;
        this.collisionOffsetY = COIN_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = COIN_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = COIN_COLLISION_OFFSET_HEIGHT;
    }

    update() {
        this.updateAnimation();
    }

    updateAnimation() {
        this.animationTimer += FRAME_INTERVAL;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationTimer -= this.animationSpeed;
            this.playAnimation(IMAGES_COIN);
        }
    }

    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.IMAGES_CACHE[path];
        this.currentImageIndex++;
    }
}
```

**Key differences from Bottle:**
- Has an `update()` method called every frame from the World game loop
- Uses `loadImages()` to cache both coin frames, then `playAnimation()` to cycle through them
- `animationSpeed = ANIMATION_SPEED_NORMAL * 2` = 200ms per frame (slower than character's 100ms) — `2 frames × 200ms = 400ms` per spin
- Constructor takes both `x` and `y` parameters — coins can be placed at different heights

In `level1.js`, coins are placed at varied heights to create visual interest:

```javascript
coins: [
    new Coin(350, 200),          // Floating in air
    new Coin(500, 150),          // Higher in air
    new Coin(650, 180),          // Mid-height
    new Coin(950, GROUND_LEVEL), // On ground
    // ... more coins at different heights
]
```

### Status Bar Positioning

**File:** `classes/World.js`

```javascript
createStatusBars() {
    this.healthBar = new StatusBar(STATUSBAR_PADDING, STATUSBAR_PADDING, IMAGES_STATUSBAR_HEALTH);
    this.coinBar = new StatusBar(STATUSBAR_PADDING,
                                STATUSBAR_PADDING + STATUSBAR_HEIGHT + 10, IMAGES_STATUSBAR_COIN);
    this.bottleBar = new StatusBar(STATUSBAR_PADDING,
                                  STATUSBAR_PADDING + (STATUSBAR_HEIGHT + 10) * 2, IMAGES_STATUSBAR_BOTTLE);

    // Endboss bar right-aligned at the top of the screen
    const endbossBarX = CANVAS_WIDTH - STATUSBAR_WIDTH - STATUSBAR_PADDING;
    this.endbossBar = new StatusBar(endbossBarX, STATUSBAR_PADDING, IMAGES_STATUSBAR_ENDBOSS);
    this.endbossBar.setPercentage(100);

    this.coinBar.setPercentage(0);
    this.bottleBar.setPercentage(0);
}
```

```
Canvas (720 × 480):
┌────────────────────────────────────────────────────────────────┐
│ [████████ Health]                      [████████ Endboss]       │
│ [██████░░ Coins ]                      (right-aligned,         │
│ [████░░░░ Bottles]                      only near endboss)     │
│                                                                │
│                    (game world here)                            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Status bar themes:** Player bars use the **green** theme, while the Endboss bar uses the **orange** theme to visually differentiate them. Blue and orange variants are also available in `constants.js`.

Status bars are drawn AFTER `ctx.restore()` — they don't scroll with the camera. They always stay fixed at the top of the screen.

### Endboss Bar Visibility — Conditional Drawing

**File:** `classes/WorldRenderer.js`

The endboss health bar only appears when the character is near the boss:

```javascript
drawUI() {
    this.world.healthBar.draw(this.world.ctx);
    this.world.coinBar.draw(this.world.ctx);
    this.world.bottleBar.draw(this.world.ctx);

    if (this.world.isEndbossVisible()) {      // Only when boss is on screen!
        this.world.endbossBar.draw(this.world.ctx);
    }
}
```

```javascript
// In World.js:
isEndbossVisible() {
    const endboss = this.getEndboss();
    if (!endboss) return false;
    return endboss.xCoordinate > this.cameraX - ENDBOSS_VISIBILITY_BUFFER &&
           endboss.xCoordinate < this.cameraX + CANVAS_WIDTH + ENDBOSS_VISIBILITY_BUFFER;
}
```

**Why hide the endboss bar?** Showing it from the start would spoil the surprise. The bar appears only when the endboss is within `ENDBOSS_VISIBILITY_BUFFER (100px)` of the camera viewport, creating a dramatic reveal.

### Exercise 5.1: Bar Calculations

```
1. You've collected 3 out of 5 coins. What image index shows?
   percentage = (3/5) × 100 = ?
   resolveImageIndex: ? >= 60 → index ?

2. The character has 45 health (out of 100). What image index?
   resolveImageIndex: 45 >= 40 → index ?

3. The Endboss has 60 health (out of 100). What percentage?
   (60 / 100) × 100 = ?%  → index ?

4. You collect the 5th bottle (ITEMS_PER_FULL_BAR = 5). What happens?
   percentage = Math.min(100, (5/5) × 100) = ?

5. You already have 5 bottles and walk over another bottle. What happens?
```

<details>
<summary>Solutions</summary>

1. `60%` → `60 >= 60` → index `3`
2. `45 >= 40` → index `2`
3. `60%` → `60 >= 60` → index `3`
4. `Math.min(100, 100) = 100` → index `5` (full bar!)
5. Nothing — the guard `bottlesCollected >= ITEMS_PER_FULL_BAR` skips pickup. The bottle stays on the ground for later.

</details>

### What you learned:
```
✅ Status bars use 6 pre-rendered images mapped to percentage ranges
✅ resolveImageIndex() converts percentage → image index (0-5)
✅ ITEMS_PER_FULL_BAR (5) defines how many pickups fill a bar
✅ Max capacity guard prevents collecting beyond what the bar can display
✅ Items stay on the ground when at max — player can return after throwing
✅ Always iterate backwards when removing items from arrays (splice)
✅ Status bars are drawn AFTER ctx.restore() — they don't scroll
```

---

# Part 6: Enemy AI — Making Enemies Think

## How Enemy AI Works in This Game

The enemies in El Pollo Loco use **patrol behavior** — they walk back and forth within a defined area. The Endboss adds **proximity-based state changes** on top of patrol.

```
Simple Patrol:
                patrolStartX              patrolEndX
                    │                         │
                    ▼                         ▼
  ──────────────────[←──── Chicken ────→]─────────────
                    Walk left ← → Walk right
                    Flip at boundaries
```

## Real Code: Chicken Patrol

**File:** `classes/Chicken.js`

```javascript
constructor() {
    super(CHICKEN_WIDTH, CHICKEN_HEIGHT, CHICKEN_SPEED * 0.5);

    // Random spawn position
    let spawnX = CHICKEN_SPAWN_MIN_X + Math.random() * 1200;
    this.xCoordinate = spawnX;

    // Patrol boundaries: spawn point ± patrol width
    this.patrolStartX = spawnX - CHICKEN_PATROL_WIDTH / 2;
    this.patrolEndX = spawnX + CHICKEN_PATROL_WIDTH / 2;

    // Random initial direction
    this.movingRight = Math.random() < 0.5;
}

patrol() {
    if (this.movingRight) {
        this.moveRight();
        this.otherDirection = true;  // Face right (chicken sprites face left)
        if (this.xCoordinate >= this.patrolEndX) {
            this.movingRight = false;
        }
    } else {
        this.moveLeft();
        this.otherDirection = false;  // Face left (default)
        if (this.xCoordinate <= this.patrolStartX) {
            this.movingRight = true;
        }
    }
}
```

**Key details:**
- Each chicken spawns at a random X between 300 and 1500
- Patrol area is centered on spawn point, 500px wide (±250px)
- Random starting direction adds variety
- Speed is `CHICKEN_SPEED * 0.5 = 1.5` pixels per frame

### SmallChicken — Faster Variant

**File:** `classes/SmallChicken.js`

SmallChicken uses the same patrol logic but with different constants and one structural difference — **no `currentState` property**. It always walks (no dead state tracking like `Chicken`):

```javascript
class SmallChicken extends MovableObject {
    IMAGES_WALKING = [];

    // Animation accumulator (replaces setInterval)
    animationTimer = 0;
    animationSpeed = ANIMATION_SPEED_NORMAL;

    // Patrol behavior
    patrolStartX;
    patrolEndX;
    movingRight = Math.random() < 0.5;

    constructor() {
        super(SMALL_CHICKEN_WIDTH, SMALL_CHICKEN_HEIGHT, SMALL_CHICKEN_SPEED * 0.5);

        this.loadImages(this.IMAGES_WALKING, IMAGES_SMALL_CHICKEN_WALKING);
        this.img = this.IMAGES_CACHE[IMAGES_SMALL_CHICKEN_WALKING[0]];

        // Random starting position between character and endboss
        this.xCoordinate = CHICKEN_SPAWN_MIN_X + Math.random() * CHICKEN_SPAWN_RANGE;

        this.patrolStartX = this.xCoordinate;
        this.patrolEndX = this.xCoordinate + CHICKEN_PATROL_WIDTH;

        // Y: On the ground (accounting for small chicken height)
        this.yCoordinate = GROUND_LEVEL + (CHARACTER_HEIGHT - SMALL_CHICKEN_HEIGHT);

        this.otherDirection = !this.movingRight;

        // Collision box offsets
        this.collisionOffsetX = SMALL_CHICKEN_COLLISION_OFFSET_X;
        this.collisionOffsetY = SMALL_CHICKEN_COLLISION_OFFSET_Y;
        this.collisionOffsetWidth = SMALL_CHICKEN_COLLISION_OFFSET_WIDTH;
        this.collisionOffsetHeight = SMALL_CHICKEN_COLLISION_OFFSET_HEIGHT;
    }
}
```

**Side-by-side constant comparison:**

| Property            | Chicken              | SmallChicken              |
|---------------------|----------------------|---------------------------|
| Sprite size         | 60 × 70              | 50 × 60                   |
| Speed               | `CHICKEN_SPEED * 0.5` = 1.5 | `SMALL_CHICKEN_SPEED * 0.5` = 2.0 |
| Collision hitbox    | 50 × 60              | 40 × 50                   |
| Patrol width        | 500px                | 500px                     |
| `currentState`      | `'walking'` / `'dead'` | *(none — always walks)* |
| Death animation     | `IMAGES_CHICKEN_DEAD` | `IMAGES_SMALL_CHICKEN_DEAD` |

**Key difference:** Chicken tracks `currentState` to switch between `'walking'` and `'dead'` states (stopping movement on death). SmallChicken has no state property — it is simply removed from the level array when stomped. This is a simpler design: instead of tracking state internally, the removal from the game world *is* the state change.

## Real Code: Endboss State Machine

**File:** `classes/Endboss.js`

The Endboss has **5 states** determined by health and character proximity:

```javascript
updateState() {
    if (this.isDead) {
        this.currentState = 'dead';
    } else if (this.isHurt()) {
        this.currentState = 'hurt';
    } else if (this.getDistanceToCharacter() < ENDBOSS_ALERT_DISTANCE / 2) {
        this.currentState = 'attack';
    } else if (this.getDistanceToCharacter() < ENDBOSS_ALERT_DISTANCE) {
        this.currentState = 'alert';
    } else {
        this.currentState = 'walking';
    }
}

getDistanceToCharacter() {
    return Math.abs(this.xCoordinate - this.characterX);
}
```

**State priority (highest to lowest):**

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  PRIORITY 1: dead     → health <= 0                                │
│  PRIORITY 2: hurt     → recently hit (within HURT_DURATION)        │
│  PRIORITY 3: attack   → character within 250px                     │
│  PRIORITY 4: alert    → character within 500px                     │
│  PRIORITY 5: walking  → default (patrol)                           │
│                                                                    │
│  The order matters! A dead boss stays dead even if                 │
│  the character walks up close (dead > attack).                     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### How the Endboss Knows About the Character

**File:** `classes/World.js` — inside `update()`

```javascript
this.level.enemies.forEach(enemy => {
    if (enemy instanceof Endboss) {
        enemy.characterX = this.character.xCoordinate;
    }
    enemy.update();
});
```

Every frame, the World tells the Endboss where the character is. The Endboss then calculates the distance to decide its state. This is **one-way data flow** — the Endboss doesn't reference the character directly, it just receives an X coordinate.

```
World (coordinator)
  │
  │  enemy.characterX = character.xCoordinate
  │  (passes data each frame)
  │
  ▼
Endboss
  │
  │  getDistanceToCharacter()
  │  Math.abs(this.xCoordinate - this.characterX)
  │
  ▼
State decision: walking / alert / attack / hurt / dead
```

### Endboss Chase/Wander AI Cycle

When the Endboss enters `alert` or `attack` state, it doesn't just stand still — it alternates between **chasing** the player and **wandering** randomly:

```javascript
// Constants:
// ENDBOSS_CHASE_DURATION = 1500  (1.5 seconds of chasing)
// ENDBOSS_WANDER_DURATION = 1500 (1.5 seconds of wandering)
// ENDBOSS_SPEED = 6              (faster than the player's speed of 5!)
// ENDBOSS_MIN_X = 500            (left boundary — boss can't walk past here)

updateChaseCycle() {
    const now = Date.now();
    const elapsed = now - this.cycleStartTime;
    const duration = this.isChasing ? ENDBOSS_CHASE_DURATION : ENDBOSS_WANDER_DURATION;

    if (elapsed >= duration) {
        this.isChasing = !this.isChasing;     // Toggle phase
        this.cycleStartTime = now;
        if (!this.isChasing) {
            this.pickWanderDirection();         // Random direction for wander
        }
    }

    if (this.isChasing) {
        this.chaseCharacter();                // Move toward player
    } else {
        this.wander();                         // Move in random direction
    }
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  ENDBOSS AI BEHAVIOR BY STATE                                        │
│                                                                     │
│  walking (far away):                                                │
│  • Simple left-right patrol within patrolStartX / patrolEndX        │
│  • Speed: ENDBOSS_SPEED = 6                                         │
│                                                                     │
│  alert / attack (close to player):                                  │
│  • Chase/wander cycle (1.5s each):                                  │
│    [CHASE 1.5s] → [WANDER 1.5s] → [CHASE 1.5s] → ...              │
│  • Chase: move toward character's x position                        │
│  • Wander: move in a random direction (chosen at phase start)       │
│  • This creates unpredictable, threatening behavior                 │
│                                                                     │
│  Left boundary: clampPosition() prevents x < ENDBOSS_MIN_X (500)   │
│  This keeps the boss in the right half of the level                 │
│                                                                     │
│  hurt: takes priority over movement (1s cooldown)                   │
│  dead: freezes after death animation plays once                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Clean State Transitions — resetAnimationOnStateChange()

The Endboss tracks its `previousState` and resets `currentImageIndex` whenever the state changes:

```javascript
resetAnimationOnStateChange() {
    if (this.currentState !== this.previousState) {
        this.currentImageIndex = 0;
        this.previousState = this.currentState;
    }
}
```

Without this, switching from `walking` (4 frames) to `alert` (8 frames) mid-animation would start the alert animation at a random frame instead of frame 1. The reset ensures every transition looks clean.

### Endboss Death Animation — deathAnimationComplete

When the Endboss dies, the death animation (3 frames) plays **once** and then freezes on the last frame. A `deathAnimationComplete` flag signals to `World.update()` that the victory screen can now appear:

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY deathAnimationComplete?                                         │
│                                                                     │
│  Without it, World.update() would trigger victory() the instant     │
│  isDead becomes true — before any death frame is shown!             │
│                                                                     │
│  Timeline:                                                           │
│  isDead = true → frame 1 (100ms) → frame 2 (200ms) → frame 3      │
│                                              (300ms) → COMPLETE!    │
│                                                                     │
│  World checks: endboss.deathAnimationComplete (not isDead)           │
│  So the player actually SEES the boss collapse before winning.       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Exercise 6.1: Endboss State Prediction

```
Given:
  Endboss at xCoordinate = 1700
  ENDBOSS_ALERT_DISTANCE = 500
  Endboss health = 60, isDead = false, not recently hit

1. Character at x = 1000. Distance = |1700 - 1000| = ?
   State = ?

2. Character at x = 1300. Distance = |1700 - 1300| = ?
   State = ?

3. Character at x = 1500. Distance = |1700 - 1500| = ?
   State = ?

4. Endboss gets hit. What state? (regardless of distance)
```

<details>
<summary>Solutions</summary>

1. Distance = 700. `700 > 500` → `walking` (default patrol)
2. Distance = 400. `400 < 500` → `alert`
3. Distance = 200. `200 < 250` → `attack`
4. `hurt` (priority 2, above attack/alert/walking)

</details>

### What you learned:
```
✅ Patrol AI = walk left-right within boundaries, flip at edges
✅ Random spawn + random direction adds variety to identical enemies
✅ Endboss uses a priority-based state machine (dead > hurt > attack > alert > walking)
✅ Distance = Math.abs(bossX - characterX) for proximity detection
✅ World passes characterX to Endboss each frame (one-way data flow)
✅ SmallChicken = same logic as Chicken but smaller and faster
✅ Chase/wander cycle (1.5s each) creates unpredictable boss behavior
✅ clampPosition() enforces a left boundary (ENDBOSS_MIN_X = 500)
✅ resetAnimationOnStateChange() resets frame index for clean transitions
✅ deathAnimationComplete flag delays victory until death animation finishes
✅ ENDBOSS_SPEED = 6 (faster than CHARACTER_SPEED = 5) makes boss threatening
```

---

# Part 7: Stomp Detection — The Heart of Combat

## The Stomp Problem

In a platformer, jumping on an enemy kills it. But colliding from the side hurts the player. How do you tell the difference?

```
STOMP (enemy dies):              SIDE HIT (player takes damage):

     Pepe                              Pepe ────→ Chicken
      │                                  │
      │ falling                          │ walking into
      ▼                                  │
   ┌──────┐                           ┌──────┐
   │Chicken│                           │Chicken│
   └──────┘                           └──────┘
```

### The Discrete Frame Problem

Games don't have continuous time. Objects teleport between positions each frame. The character might be **above** the chicken one frame and **inside** it the next:

```
Frame 10:                    Frame 11:
   Pepe (y=350)                 Pepe (y=395) ← NOW overlapping!
                                ┌──────┐
   ┌──────┐                     │Chicken│
   │Chicken│ (y=395)            └──────┘
   └──────┘

In frame 11, isColliding() returns true.
But HOW do we know the character came from ABOVE?

Answer: We saved previousY = 350 from frame 10!
```

## Real Code: isStomp()

**File:** `classes/CollisionHandler.js`

```javascript
isStomp(enemy) {
    const character = this.world.character;

    // Condition 1: Character was moving DOWNWARD
    const wasMovingDown = character.yCoordinate > character.previousY;

    // Condition 2: Character's bottom was ABOVE enemy's top (last frame)
    const previousBottom = character.previousY + character.height
                           - character.collisionOffsetHeight;
    const enemyTop = enemy.yCoordinate + enemy.collisionOffsetY;

    return wasMovingDown && previousBottom <= enemyTop;
}
```

### Breaking Down the Two Conditions

```
┌─────────────────────────────────────────────────────────────────────┐
│  CONDITION 1: wasMovingDown                                         │
│                                                                     │
│  character.yCoordinate > character.previousY                        │
│                                                                     │
│  WHY NOT check yVelocity > 0?                                      │
│  Because applyGravity() runs BEFORE collision checks!               │
│  When the character lands on the ground, gravity clamps             │
│  yCoordinate to GROUND_LEVEL and resets yVelocity to 0.            │
│  By the time collision runs, yVelocity is already 0.               │
│                                                                     │
│  But yCoordinate still MOVED DOWN compared to previousY!            │
│  So checking actual position change is more reliable.               │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  CONDITION 2: previousBottom <= enemyTop                            │
│                                                                     │
│  The character's bottom edge (last frame) was AT or ABOVE           │
│  the enemy's top edge. This proves the character approached         │
│  from above, not from the side.                                     │
│                                                                     │
│  If the character walked into the enemy horizontally,               │
│  previousBottom would be BELOW enemyTop → NOT a stomp.              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Visual Example

```
STOMP (both conditions met):

  Frame N-1:                  Frame N:
  previousY = 340             yCoordinate = 390  (moved DOWN ✅)

  previousBottom              enemyTop
  = 340 + 280 - 30            = 395 + 5
  = 590                       = 400

  Wait... 590 > 400?          That can't be right...

  Actually, let's use REAL values:
  Character: y=100, height=280, offsetHeight=30
  previousBottom = 100 + 280 - 30 = 350

  Enemy (Chicken): y=390, offsetY=5
  enemyTop = 390 + 5 = 395

  350 <= 395? YES ✅ → Character was above the chicken!
  yCoordinate (140) > previousY (100)? YES ✅ → Moving down!
  → STOMP!


SIDE HIT (condition 2 fails):

  Frame N-1:                  Frame N:
  Character at y=180          Character at y=180  (on ground, same Y)
  previousBottom = 180+280-30 = 430

  Chicken at y=390
  enemyTop = 390 + 5 = 395

  430 <= 395? NO ❌ → Character was already BELOW enemy's top!
  → NOT a stomp! Character takes damage.
```

### Handling Different Enemy Types

**File:** `classes/CollisionHandler.js`

```javascript
handleEnemyHit(enemy, index) {
    const isStomp = this.isStomp(enemy);

    if (isStomp && !(enemy instanceof Endboss)) {
        // Stomp regular enemy → kill it, bounce up
        this.world.level.enemies.splice(index, 1);
        this.world.character.yVelocity = -ENEMY_BOUNCE_FORCE;
        // Different sound for SmallChicken vs Chicken
        const sfx = enemy instanceof SmallChicken
            ? AUDIO_SFX_SMALL_CHICKEN : AUDIO_SFX_CHICKEN;
        AudioManager.getInstance().playSFX(sfx);

    } else if (isStomp && enemy instanceof Endboss) {
        // Stomp endboss → just bounce (no damage from stomp)
        this.world.character.yVelocity = -ENEMY_BOUNCE_FORCE;

    } else {
        // Side hit → character takes damage
        const wasHurt = this.world.character.hit(ENEMY_DAMAGE);
        if (wasHurt) {
            this.world.healthBar.setPercentage(this.world.character.health);
            AudioManager.getInstance().playSFX(AUDIO_SFX_HURT);
        }
    }
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  STOMP OUTCOMES:                                                     │
│                                                                     │
│  Chicken / SmallChicken:                                            │
│  • Removed from enemies array (splice)                               │
│  • Character bounces up (yVelocity = -15)                            │
│  • Different SFX per type (chicken-cluck vs small-chicken)           │
│                                                                     │
│  Endboss:                                                           │
│  • NOT damaged by stomping (only bottles damage the boss)            │
│  • Character still bounces up (so you don't get stuck)               │
│  • No sound effect                                                   │
│                                                                     │
│  SIDE HIT OUTCOME:                                                   │
│  • Character takes 20 damage (ENEMY_DAMAGE)                          │
│  • Only if not in invincibility window (1 second)                    │
│  • Health bar updates                                                │
│  • Hurt sound plays                                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Bottle vs Enemy Collisions

```javascript
checkBottleEnemyCollisions() {
    this.world.thrownBottles.forEach(bottle => {
        if (bottle.isSplashing) return;  // Already hit something

        for (let i = this.world.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.world.level.enemies[i];

            if (bottle.isColliding(enemy)) {
                bottle.splash();  // Start splash animation

                if (enemy instanceof Endboss) {
                    enemy.hit(THROWABLE_DAMAGE);  // 20 damage
                    this.world.endbossBar.setPercentage(
                        (enemy.health / ENDBOSS_MAX_HEALTH) * 100
                    );
                    AudioManager.getInstance().playSFX(AUDIO_SFX_BOSS);
                } else {
                    this.world.level.enemies.splice(i, 1);  // Kill instantly
                }
            }
        }
    });
}
```

**Bottle damage rules:**
- Regular enemies: instant death (removed from array)
- Endboss: 20 damage per hit, 100 HP total = 5 bottles to kill

### ThrowableObject — Bottle Physics & Lifecycle

**File:** `classes/ThrowableObject.js`

Thrown bottles have their own physics system, separate from the character:

```javascript
// In ThrowableObject.update():
update() {
    if (this.isSplashing) {
        if (Date.now() - this.splashStartTime > SPLASH_DURATION) {
            this.markForRemoval = true;  // World will filter this out
        }
        return;  // Don't move while splashing
    }

    this.xCoordinate += this.OBJECT_SPEED * this.throwDirection;  // Horizontal
    this.yVelocity += THROWABLE_GRAVITY;  // Gravity (2, much heavier than character's 0.3)
    this.yCoordinate += this.yVelocity;   // Apply velocity

    const bottleGroundLevel = GROUND_LEVEL + (CHARACTER_HEIGHT - BOTTLE_HEIGHT);
    if (this.yCoordinate >= bottleGroundLevel) {
        this.yCoordinate = bottleGroundLevel;
        this.splash();  // Hit ground → splash animation
    }
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  BOTTLE LIFECYCLE                                                    │
│                                                                     │
│  1. CREATED: handleThrow() creates bottle at character's hand        │
│     • yVelocity = THROW_INITIAL_VELOCITY (-25)                      │
│     • Rotation animation starts (50ms per frame, 4 frames)          │
│                                                                     │
│  2. FLYING: update() moves bottle each frame                         │
│     • Horizontal: THROWABLE_SPEED (15) × direction (±1)             │
│     • Vertical: THROWABLE_GRAVITY (2) — heavy for a fast arc        │
│     • Forms a parabolic arc through the air                          │
│                                                                     │
│  3. IMPACT: collision with enemy OR ground                           │
│     • splash() triggers → isSplashing = true                        │
│     • Rotation animation stops, splash animation starts (6 frames)  │
│     • Bottle break SFX plays                                         │
│                                                                     │
│  4. REMOVAL: after SPLASH_DURATION (500ms)                           │
│     • markForRemoval = true                                          │
│     • World.updateThrownBottles() filters it out                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### The Hit Cooldown System

**File:** `classes/Character.js`

```javascript
hit(damage = CHARACTER_DEFAULT_DAMAGE) {
    if (this.isDead) return false;       // Can't hurt a dead character

    if (!this.isHurt()) {                // Not in cooldown?
        this.health -= damage;
        this.lastHitTime = Date.now();   // Start cooldown

        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }
        return true;                     // Damage was applied
    }
    return false;                        // In cooldown, no damage
}

isHurt() {
    const timeSinceHit = Date.now() - this.lastHitTime;
    return timeSinceHit < HURT_DURATION;  // 1000ms invincibility
}
```

```
Timeline of getting hit:

  t=0        t=500ms     t=1000ms    t=1500ms
  │           │           │           │
  HIT!        │           │           HIT!
  -20 HP      │           │           -20 HP
  │           │           │           │
  ├───────────┴───────────┤           │
  │  INVINCIBLE (1 second)│           │
  │  Hits = return false  │           │
  └───────────────────────┘           │
```

### Exercise 7.1: Stomp Scenarios

```
For each scenario, determine: STOMP or SIDE HIT?

1. Character: previousY=100, yCoordinate=140 (moved down)
   previousBottom = 100 + 280 - 30 = 350
   Enemy top = 390 + 5 = 395
   wasMovingDown? ___ previousBottom <= enemyTop? ___ Result: ___

2. Character: previousY=180, yCoordinate=180 (standing still)
   previousBottom = 180 + 280 - 30 = 430
   Enemy top = 390 + 5 = 395
   wasMovingDown? ___ previousBottom <= enemyTop? ___ Result: ___

3. Character: previousY=350, yCoordinate=380 (falling fast)
   previousBottom = 350 + 280 - 30 = 600
   Enemy top = 390 + 5 = 395
   wasMovingDown? ___ previousBottom <= enemyTop? ___ Result: ___
```

<details>
<summary>Solutions</summary>

1. `wasMovingDown = 140 > 100 = YES`, `350 <= 395 = YES` → **STOMP**
2. `wasMovingDown = 180 > 180 = NO` → **SIDE HIT** (not moving down at all)
3. `wasMovingDown = 380 > 350 = YES`, `600 <= 395 = NO` → **SIDE HIT** (was already below enemy top — came from the side, not above)

</details>

### What you learned:
```
✅ Stomp detection needs TWO conditions: falling + was above enemy last frame
✅ Check yCoordinate > previousY instead of yVelocity (ground clamping issue)
✅ previousBottom = previousY + height - collisionOffsetHeight
✅ enemyTop = enemy.yCoordinate + enemy.collisionOffsetY
✅ Stomping chickens kills them; stomping endboss just bounces
✅ Different SFX for Chicken vs SmallChicken stomps (instanceof check)
✅ Hit cooldown (1s) prevents damage spam — hit() returns boolean
✅ Bottles kill chickens instantly, deal 20 damage to endboss (5 hits to kill)
✅ Thrown bottles have their own physics: THROWABLE_GRAVITY=2, THROWABLE_SPEED=15
✅ Bottle lifecycle: created → flying → splash (500ms) → markForRemoval
```

---

# Part 8: Audio System — Music and Sound Effects

## The Singleton Pattern

The AudioManager uses the **singleton pattern** — there is only ONE instance in the entire game, shared by everyone.

```
Without Singleton:                   With Singleton:
┌──────────┐  ┌──────────┐         ┌─────────────────────────┐
│ Audio #1 │  │ Audio #2 │         │  AudioManager.getInstance()│
│ muted=T  │  │ muted=F  │         │  (ONE instance)            │
│ volume=0 │  │ volume=1 │         │  muted = true              │
└──────────┘  └──────────┘         │  ALL sounds respect this   │
 Out of sync!  Confusing!          └─────────────────────────┘
                                    Consistent everywhere!
```

## Real Code: AudioManager

**File:** `classes/AudioManager.js`

```javascript
class AudioManager {
    static instance = null;

    static getInstance() {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    sounds = {};        // Cache: file path → Audio element
    currentMusic = null;
    muted = false;

    constructor() {
        // Load mute state from localStorage
        this.muted = localStorage.getItem('gameMuted') === 'true';
    }
}
```

### How Singleton Works

```
First call:   AudioManager.getInstance()
              → instance is null
              → creates new AudioManager()
              → stores in AudioManager.instance
              → returns it

Second call:  AudioManager.getInstance()
              → instance ALREADY exists
              → returns the SAME object

Every call:   AudioManager.getInstance()
              → always returns the SAME single instance
```

### Music vs Sound Effects

```javascript
// MUSIC — loops continuously, only one track at a time
playMusic(path) {
    this.stopMusic();                    // Stop whatever's playing
    let music = this.getSound(path);
    music.loop = true;                   // Repeat forever
    music.volume = MUSIC_VOLUME;         // 0.3 (quiet background)
    if (!this.muted) music.play();
    this.currentMusic = music;
}

// SFX — plays once from the beginning, fire-and-forget
playSFX(path) {
    if (this.muted) return;
    let sound = this.getSound(path);
    sound.currentTime = 0;              // Reset to start
    sound.play().catch(() => {});        // Silently handle browser restrictions
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  MUSIC vs SFX:                                                       │
│                                                                     │
│  MUSIC:                              SFX:                           │
│  • Only ONE playing at a time        • Many can overlap             │
│  • Loops forever                     • Plays once                   │
│  • Lower volume (0.3)               • Full volume (1.0)             │
│  • Stopped when muted                • Not played when muted        │
│  • Resumed when unmuted              • NOT resumed when unmuted     │
│  • e.g., desert-theme.mp3           • e.g., jump.mp3, coin.mp3     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Sound Caching with getSound()

```javascript
getSound(path) {
    if (!this.sounds[path]) {
        this.sounds[path] = new Audio(path);
    }
    return this.sounds[path];
}
```

**Lazy loading:** Audio elements are only created when first needed. Once created, they're cached in the `sounds` dictionary and reused.

### Mute Toggle with Persistence

```javascript
toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('gameMuted', this.muted);

    if (this.muted) {
        this.muteAll();
    } else {
        this.unmuteAll();
    }
    return this.muted;
}
```

**localStorage persistence:** When you close the browser and reopen the game, your mute preference is remembered! The constructor reads it back:
```javascript
this.muted = localStorage.getItem('gameMuted') === 'true';
```

### The .catch(() => {}) Pattern

```javascript
sound.play().catch(() => {});
```

**Why catch errors silently?** Modern browsers block audio that plays without user interaction (autoplay policy). If the user hasn't clicked anything yet and we try to play audio, `play()` returns a rejected Promise. The `.catch(() => {})` prevents an uncaught error from crashing the game.

### Exercise 8.1: Audio System

```
1. If you call AudioManager.getInstance() 100 times, how many
   AudioManager objects are created?

2. You call playSFX('jump.mp3') twice in rapid succession.
   What does currentTime = 0 do?

3. The game starts muted (localStorage has 'gameMuted' = 'true').
   You toggle mute. What value is stored in localStorage now?

4. Why does playMusic() call stopMusic() first?
```

<details>
<summary>Solutions</summary>

1. Only **1** — that's the singleton pattern
2. `currentTime = 0` restarts the sound from the beginning, so the second call doesn't wait for the first to finish
3. `'false'` — the muted flag was flipped from true to false
4. To ensure only one music track plays at a time — without stopping first, you'd hear two tracks overlapping

</details>

### What you learned:
```
✅ Singleton pattern: one AudioManager for the entire game
✅ Music loops, SFX plays once — different behaviors for different purposes
✅ getSound() lazily creates and caches Audio elements
✅ Mute state persists in localStorage across browser sessions
✅ .catch(() => {}) handles browser autoplay restrictions gracefully
✅ currentTime = 0 restarts a sound from the beginning
```

---

# Part 9: Game State Management — Flow Control

## The Game State Machine

The game has 5 screens, each with transitions:

```
┌──────────────┐                    ┌──────────────┐
│ Landing Page │──── startGame() ──→│   Playing    │
│              │                    │              │
│ • Start btn  │                    │ • Game loop  │
│ • How to Play│                    │ • Input      │
│ • Impressum  │                    │ • Collisions │
└──────┬───────┘                    └──────┬───────┘
       ▲                                   │
       │                    ┌──────────────┼──────────────┐
       │                    │              │              │
       │             ESC/pause btn   character.isDead  endboss.deathAnimationComplete
       │                    │              │              │
       │                    ▼              ▼              ▼
       │         ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
       │         │    Paused    │ │  Game Over   │ │   Victory    │
       ├─ back() │              │ │              │ │              │
       ├─ back() │ • Resume     │ │ • Try Again  │ │ • Play Again │
       ├─ back() │ • Play Again │ │ • Back Home  │ │ • Back Home  │
       │         │ • Back Home  │ └──────┬───────┘ └──────┬───────┘
       │         └──────┬───────┘        │                │
       │          resumeGame()    restartGame()     restartGame()
       │          restartGame()          │                │
       └─────────────────┴───────────────┴────────────────┘
```

## Real Code: Starting the Game

**File:** `scripts/script.js`

```javascript
// DOM elements are cached once on DOMContentLoaded via cacheDOMElements()
// so startGame() uses DOM.canvas, DOM.landingPage, etc. instead of getElementById()

function startGame() {
    if (DOM.canvas) DOM.canvas.classList.remove('hidden');       // Reveal canvas (hidden on landing)
    if (DOM.landingPage) DOM.landingPage.classList.add('hidden');
    if (DOM.muteBtn) DOM.muteBtn.classList.remove('hidden');
    if (DOM.fullscreenBtn) DOM.fullscreenBtn.classList.remove('hidden');
    if (DOM.pauseBtn) DOM.pauseBtn.classList.remove('hidden');

    init();  // Creates keyboard + world FIRST

    if (isTouchDevice()) {
        if (DOM.mobileControls) DOM.mobileControls.classList.remove('hidden');
    }

    setupTouchControls();  // AFTER init() — keyboard exists now!
}

function init() {
    canvas = DOM.canvas;
    if (!canvas) return;

    if (!keyboard) {
        keyboard = new Keyboard();
        initKeyboardListeners();
    }

    world = new World(canvas, keyboard);
    startGameLoop();
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  INITIALIZATION ORDER MATTERS!                                       │
│                                                                     │
│  startGame()                                                        │
│    1. Show canvas (starts hidden so animated bg shows on landing)   │
│    2. Hide landing page, show mute/fullscreen/pause buttons         │
│    3. init() → creates keyboard and world                           │
│    4. Show mobile controls (if touch device)                        │
│    5. setupTouchControls() → attaches touch listeners               │
│                                                                     │
│  WHY this order?                                                    │
│  setupTouchControls() references the `keyboard` object.             │
│  If we called it BEFORE init(), keyboard would be null              │
│  and the touch listeners would never be attached!                   │
│                                                                     │
│  DOM CACHING PATTERN:                                               │
│  All frequently-accessed DOM elements are cached once at startup    │
│  into a `const DOM = {}` object via `cacheDOMElements()`.           │
│  This avoids repeated getElementById() calls throughout the code.   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### The Game Loop

```javascript
let gameAnimationId = null;
let lastFrameTime = 0;
let accumulator = 0;

function startGameLoop() {
    lastFrameTime = 0;
    accumulator = 0;
    gameAnimationId = requestAnimationFrame(gameLoop);
}

function gameLoop(currentTime) {
    if (!lastFrameTime) lastFrameTime = currentTime;
    let delta = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    if (delta > FRAME_INTERVAL * 5) delta = FRAME_INTERVAL * 5;  // Cap large gaps
    accumulator += delta;

    while (accumulator >= FRAME_INTERVAL) {   // Fixed 16.67ms update steps
        world.update();
        accumulator -= FRAME_INTERVAL;
    }

    world.draw();                              // Render once per frame
    gameAnimationId = requestAnimationFrame(gameLoop);
}

function stopGameLoop() {
    if (gameAnimationId) {
        cancelAnimationFrame(gameAnimationId);
        gameAnimationId = null;
    }
}
```

**The game loop uses `requestAnimationFrame` with a fixed-timestep accumulator.** This means:
- `update()` always runs at a consistent rate (60 FPS fixed steps) regardless of display refresh rate
- `draw()` runs once per actual frame (matching the monitor's refresh rate)
- Large gaps (e.g., tab was backgrounded) are capped to prevent physics explosions

### Detecting Game End Conditions

**File:** `classes/World.js`

```javascript
update() {
    if (this.character.isDead) {
        this.gameOver();   // gameOver() has its own isGameOver guard
        return;
    }

    const endboss = this.getEndboss();
    if (endboss && endboss.deathAnimationComplete) {
        this.victory();    // victory() has its own isGameOver guard
        return;
    }

    this.character.update();
    this.handleThrow();
    this.level.clouds.forEach(cloud => cloud.update());
    this.level.enemies.forEach(enemy => {
        if (enemy instanceof Endboss) {
            enemy.characterX = this.character.xCoordinate;
        }
        enemy.update();
    });
    this.updateThrownBottles();
    this.collisionHandler.checkCollisions();
    this.updateCamera();
}
```

**The `isGameOver` guard lives inside `gameOver()` and `victory()`** — `if (this.isGameOver) return;` at the top of each method. This means `update()` can safely call them every frame after death, and they'll only execute once. After the first call sets `isGameOver = true`, subsequent calls are no-ops.

Notice the victory condition checks `endboss.deathAnimationComplete` instead of `endboss.isDead`. This lets the 3-frame death animation play fully before showing the win screen (see Part 6 for the `deathAnimationComplete` pattern).

### Restart Without Page Reload

```javascript
function restartGame() {
    stopGameLoop();                    // Cancel requestAnimationFrame
    clearGameIntervals();              // Cancel pending end-screen timeout

    if (DOM.gameoverScreen) DOM.gameoverScreen.classList.add('hidden');
    if (DOM.winScreen) DOM.winScreen.classList.add('hidden');
    if (DOM.pauseScreen) DOM.pauseScreen.classList.add('hidden');
    isPaused = false;                  // Reset pause state

    resetKeyboard();                   // Clear all key presses
    world = null;                      // Discard old world

    level1 = createLevel1();           // Fresh level (factory pattern!)
    init();                            // Create new world and start loop
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY createLevel1() IS A FACTORY FUNCTION                           │
│                                                                     │
│  If level1 were a plain object:                                     │
│    let level1 = { enemies: [...], coins: [...] }                    │
│    After playing: enemies are dead, coins collected                  │
│    On restart: level1 STILL has dead enemies and no coins!           │
│                                                                     │
│  As a factory function:                                              │
│    function createLevel1() { return { enemies: [...], ... } }       │
│    On restart: level1 = createLevel1()                               │
│    → Brand new objects! Fresh enemies, full coins, everything reset! │
│                                                                     │
│  This is the FACTORY PATTERN — a function that creates fresh         │
│  objects every time it's called.                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### What createLevel1() Returns — Level Data Structure

**File:** `levels/level1.js`

The factory function returns a plain object (not a `Level` class instance) with all game content:

```javascript
function createLevel1() {
    return {
        enemies: [
            new Chicken(), new SmallChicken(),  // 4 Chickens + 4 SmallChickens
            new Chicken(), new SmallChicken(),
            new Chicken(), new SmallChicken(),
            new Chicken(), new SmallChicken(),
            new Endboss()                       // 1 final boss = 9 enemies total
        ],
        clouds: [ new Cloud(), ..., new Cloud() ],  // 5 decorative clouds
        backgroundObjects: [
            // 4 layers × 4 positions = 16 background objects
            // See "Background Layering" below
        ],
        coins: [
            new Coin(350, 200),    // Floating in air
            new Coin(500, 150),    // Higher
            // ... 10 coins total (but player can carry max 5 at a time)
        ],
        bottles: [
            new Bottle(400),       // On ground (BOTTLE_Y calculated automatically)
            new Bottle(550),
            // ... 10 bottles total (but player can carry max 5 at a time)
        ]
    };
}
let level1 = createLevel1();  // Called at load and on restart
```

### Background Layering — Creating Depth

The level uses **4 visual layers** stacked at each of **4 horizontal positions**, creating a seamless scrolling world:

```
Layer order (back to front):
  1. air.png          — solid sky color (always the same)
  2. 3_third_layer    — distant mountains (uses variant 1 or 2)
  3. 2_second_layer   — mid-ground hills (uses variant 1 or 2)
  4. 1_first_layer    — ground/foreground (uses variant 1 or 2)

4 Positions across the level (each 720px wide = CANVAS_WIDTH):
  x = -719    x = 0      x = 719    x = 1438
  ┌─────────┐┌─────────┐┌─────────┐┌─────────┐
  │variant 1 ││variant 2 ││variant 1 ││variant 2 │  ← alternating
  └─────────┘└─────────┘└─────────┘└─────────┘
  offscreen   visible     visible    offscreen
  left        at start    at start   right

Total width: 4 × 720 = 2880px (covers the 2158px level with overlap)
Two variant images per layer prevent visible repetition.
```
```

### Cleaning Up Animation Intervals

```javascript
function clearGameIntervals() {
    if (!world) return;

    if (world.endScreenTimeout) {
        clearTimeout(world.endScreenTimeout);
    }
}
```

**Why is this necessary?** The `endScreenTimeout` stores a pending `setTimeout` for showing the game-over or victory overlay. Without clearing it, if the player restarts or returns to the menu before the delay finishes, the stale callback would fire and show the wrong overlay on top of the new game state.

> **Note:** In earlier versions, each animated object had its own `setInterval` that needed clearing. After refactoring to a delta-time accumulator pattern (Part 11), all animations are driven by the main game loop's `update()` call, so only the `endScreenTimeout` needs manual cleanup.

### Victory and Game Over Screens

```javascript
// In World.js:
gameOver() {
    if (this.isGameOver) return;           // Prevent multiple calls
    this.isGameOver = true;
    AudioManager.getInstance().stopMusic();
    AudioManager.getInstance().playSFX(AUDIO_MUSIC_GAMEOVER);

    if (typeof stopGameLoop === 'function') {
        stopGameLoop();
    }

    this.endScreenTimeout = setTimeout(() => {
        if (!this.isGameOver) return;      // Guard against stale timeout
        const gameOverScreen = document.getElementById('gameover-screen');
        if (gameOverScreen) gameOverScreen.classList.remove('hidden');
    }, GAMEOVER_DELAY);  // 1000ms delay for death animation
}

victory() {
    if (this.isGameOver) return;           // Prevent multiple calls
    this.isGameOver = true;
    AudioManager.getInstance().stopMusic();
    AudioManager.getInstance().playSFX(AUDIO_SFX_VICTORY);

    if (typeof stopGameLoop === 'function') {
        stopGameLoop();
    }

    this.endScreenTimeout = setTimeout(() => {
        if (!this.isGameOver) return;      // Guard against stale timeout
        const winScreen = document.getElementById('win-screen');
        if (winScreen) winScreen.classList.remove('hidden');
    }, VICTORY_DELAY);  // 1500ms delay for boss death animation
}
```

**Key implementation details:**
- `endScreenTimeout` stores the setTimeout ID so `clearGameIntervals()` can cancel it on restart/menu
- `if (this.isGameOver) return` at the top prevents the method from firing multiple times per frame
- `if (!this.isGameOver) return` inside the timeout guards against stale callbacks (e.g., if the player restarts before the delay finishes)
- `typeof stopGameLoop === 'function'` safely calls the global function from within the class
- Uses `classList.remove('hidden')` instead of `style.display` (consistent CSS pattern)

### Pause System — Freezing and Resuming the Game

The game has a full pause system: click the pause button or press ESC to freeze the game.

```javascript
let isPaused = false;

function togglePause() {
    if (!world || world.isGameOver) return;  // No game or already ended
    if (isPaused) {
        resumeGame();         // Already paused → resume
    } else {
        isPaused = true;
        stopGameLoop();       // Cancel requestAnimationFrame
        if (DOM.pauseScreen) DOM.pauseScreen.classList.remove('hidden');
    }
}

function resumeGame() {
    isPaused = false;
    if (DOM.pauseScreen) DOM.pauseScreen.classList.add('hidden');
    if (world && world.character) {
        world.character.lastActionTime = Date.now();  // Reset idle timer
    }
    startGameLoop();          // Schedule new requestAnimationFrame
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  HOW PAUSE WORKS                                                     │
│                                                                     │
│  Pausing = canceling requestAnimationFrame (cancelAnimationFrame).  │
│  Since update() and draw() no longer run, everything freezes:       │
│  physics, AI, collisions, animations drawn to canvas.               │
│                                                                     │
│  Resuming = scheduling a new requestAnimationFrame.                 │
│  The world object still exists with all its state intact,           │
│  so the game continues exactly where it left off.                   │
│  lastActionTime is reset so the idle timer doesn't immediately      │
│  trigger long-idle/snoring after unpausing.                         │
│                                                                     │
│  GUARD: world.isGameOver prevents pausing after death/victory.      │
│  Without this, pressing ESC after dying could show the pause        │
│  overlay on top of the gameover screen, causing conflicts.          │
│                                                                     │
│  The pause overlay uses the same style as victory/gameover screens  │
│  with Resume, Play Again, and Back to Home buttons.                 │
│                                                                     │
│  ESC key triggers togglePause() via the keydown listener:           │
│  if (e.key === 'Escape') togglePause();                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Fullscreen Toggle — Using the Fullscreen API

```javascript
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
```

**Two lines of browser API:**
- `document.fullscreenElement` — returns the element currently in fullscreen, or `null`
- `requestFullscreen()` — enters fullscreen mode on the target element
- `exitFullscreen()` — leaves fullscreen mode

The fullscreen button appears in the game UI alongside mute and pause, and is hidden when returning to the landing page via `backToMenu()`.

### Exercise 9.1: Game Flow

```
1. What happens when you click "Start Game"?
   List the 6 key steps in order.

2. Why does restartGame() also hide the pause screen and
   reset isPaused?

3. What would happen if isGameOver didn't exist and gameOver()
   ran every frame after death?

4. Why is there a longer delay for victory (1500ms) than
   game over (1000ms)?

5. What happens to the game world's state when you pause?
   Why does resume work without recreating the world?

6. What does toggleFullscreen() check to decide whether
   to enter or exit fullscreen?
```

<details>
<summary>Solutions</summary>

1. (1) Show the canvas (remove `hidden` class), (2) Hide landing page, (3) Show mute, fullscreen, and pause buttons, (4) `init()` creates keyboard and world, (5) Start game loop, (6) Show mobile controls if touch device, (7) Attach touch listeners via `setupTouchControls()`
2. The player might restart from the pause screen. Without hiding it and resetting `isPaused`, the pause overlay would remain visible on top of the new game, and `togglePause()` would think the game is still paused.
3. `gameOver()` would be called 60 times per second! It would repeatedly stop the music (already stopped), stop the game loop (already stopped), and queue hundreds of `setTimeout` calls to show the overlay.
4. The boss death animation has more frames to play through (3 frames at 100ms each plus visual feedback), so a longer delay lets the player see the boss actually die before the victory screen appears.
5. The world object stays in memory with all its properties intact (character position, enemy states, score, etc.). Pausing calls `cancelAnimationFrame()` to stop the game loop. Resuming calls `startGameLoop()` which kicks off a new `requestAnimationFrame` cycle that reads the same world object, continuing exactly where it left off.
6. It checks `document.fullscreenElement`. If it's `null` (not in fullscreen), it calls `requestFullscreen()`. If an element is already fullscreen, it calls `exitFullscreen()`.

</details>

### What you learned:
```
✅ Game states: Landing → Playing → Paused/GameOver/Victory → restart or menu
✅ The game loop uses requestAnimationFrame with a fixed-timestep accumulator
✅ update() runs in fixed 16.67ms steps; draw() runs once per actual frame
✅ isGameOver flag prevents game-end logic from running multiple times
✅ Factory pattern: createLevel1() creates fresh objects on every restart
✅ clearGameIntervals() cancels the pending end-screen timeout to prevent stale overlays
✅ setTimeout delays let final animations play before showing overlays
✅ Restart doesn't reload the page — it resets everything in JavaScript
✅ DOM caching: cacheDOMElements() stores all element references in a DOM object
✅ Canvas starts hidden; startGame() reveals it, backToMenu() hides it again
✅ Pause = cancelAnimationFrame; resume = new requestAnimationFrame. World state stays intact.
✅ Fullscreen API: requestFullscreen() / exitFullscreen() toggle fullscreen
✅ ESC key triggers togglePause() for quick pause/resume
```

---

# Part 10: Camera, Input & Mobile — The Player Experience

## The Rendering Delegate — WorldRenderer

**File:** `classes/WorldRenderer.js`

World delegates all drawing to `WorldRenderer`. This separates **game logic** (World) from **visual output** (WorldRenderer):

```javascript
class WorldRenderer {
    world;   // Reference to the World

    draw() {
        this.clearCanvas();
        this.drawWorldObjects();   // Camera-scrolled content
        this.drawUI();             // Fixed on screen
    }

    drawWorldObjects() {
        this.world.ctx.save();
        this.world.ctx.translate(-this.world.cameraX, 0);  // Scroll!

        this.drawBackground();     // Background layers, then clouds
        this.drawGameObjects();    // Enemies, coins, bottles, thrown bottles, character
        this.drawDebugHitboxes();  // Red/blue boxes if debugMode=true

        this.world.ctx.restore();  // Undo scroll
    }

    drawUI() {
        this.world.healthBar.draw(this.world.ctx);
        this.world.coinBar.draw(this.world.ctx);
        this.world.bottleBar.draw(this.world.ctx);

        if (this.world.isEndbossVisible()) {
            this.world.endbossBar.draw(this.world.ctx);
        }

        if (this.world.debugMode) {
            this.updateFPS();
            this.drawDebugInfo();  // FPS counter, character position, HP
        }
    }
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  DRAW ORDER (Z-ORDER)                                                │
│                                                                     │
│  Drawn first (back):                                                │
│  1. Background layers (air → mountains → hills → ground)            │
│  2. Clouds                                                          │
│  3. Ground coins and bottles                                        │
│  4. Enemies (drawn over collectibles so boss doesn't hide coins)    │
│  5. Thrown bottles (in flight)                                       │
│  6. Character (always on top of game objects)                        │
│  Drawn last (front):                                                │
│  7. Debug hitboxes (if enabled)                                      │
│  8. Status bars (not affected by camera scroll)                      │
│  9. Debug info panel (FPS, position, HP with color coding)           │
│                                                                     │
│  DELEGATE PATTERN: World doesn't know HOW to draw.                  │
│  WorldRenderer doesn't know HOW the game works.                     │
│  Each class has a single responsibility.                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Debug Mode

Set `world.debugMode = true` in the browser console to see:
- **Blue rectangles** — full sprite boundaries
- **Red rectangles** — actual collision hitboxes (with offsets applied)
- **FPS counter** — current frames per second (green text)
- **Character position** — world coordinates (yellow text)
- **Health** — color-coded: green (>50), orange (>20), red (critical)

## The Camera System

The game world is 2158px wide, but the canvas is only 720px. A **camera** determines which portion of the world is visible.

```
World (2158px wide):
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│     ┌─────────┐                                                      │
│     │ Camera  │  ← Only this 720px slice is drawn                    │
│     │ (720px) │                                                      │
│     └─────────┘                                                      │
│         ↑                                                            │
│     cameraX = character.x - 100                                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Real Code: Camera Following

**File:** `classes/World.js`

```javascript
updateCamera() {
    this.cameraX = this.character.xCoordinate - CAMERA_OFFSET_X;

    if (this.cameraX < 0) this.cameraX = 0;
    if (this.cameraX > CAMERA_MAX_X) this.cameraX = CAMERA_MAX_X;
}
```

**Three lines, powerful effect:**
1. Camera follows the character with a 100px lead from the left
2. Clamped to 0 (can't scroll past the left edge)
3. Clamped to 1438 (can't scroll past the right edge: 2158 - 720 = 1438)

### How Camera Translation Works

**File:** `classes/WorldRenderer.js`

```javascript
drawWorldObjects() {
    this.ctx.save();
    this.ctx.translate(-this.world.cameraX, 0);  // Scroll the world!

    // Draw backgrounds, enemies, character, etc.
    // Everything is drawn at its WORLD position
    // The translate makes it appear at the right SCREEN position

    this.ctx.restore();
}

drawUI() {
    // Status bars drawn AFTER restore() — they DON'T scroll!
    this.world.healthBar.draw(this.ctx);
    this.world.coinBar.draw(this.ctx);
    // ...
}
```

```
Without camera:                    With camera (cameraX = 300):
World position 500 →               World position 500 →
  Drawn at screen x=500              translate(-300) → screen x=200

Status bar at x=20 →               Status bar at x=20 →
  Always at screen x=20              Still at screen x=20 (after restore!)
```

## The Input System

### Keyboard Input

**File:** `classes/Keyboard.js`

```javascript
class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;
}
```

**File:** `scripts/script.js`

```javascript
function initKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') togglePause();  // Pause/resume game
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

> **Note:** ESC is handled in `keydown` only (no `keyup` needed) because `togglePause()` is a toggle action, not a held-key state. Also note that `'D'` is checked in both cases to handle Caps Lock.

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE KEYBOARD PATTERN: STATE-BASED INPUT                             │
│                                                                     │
│  Instead of: "When key pressed → move right"  (event-driven)       │
│  We use:     "Each frame → check if RIGHT is true"  (state-based)  │
│                                                                     │
│  WHY? Because the game loop runs every 16ms. If we only             │
│  reacted to keydown events, we'd need to move the character         │
│  inside the event handler. But movement depends on game state       │
│  (is the character alive? on the ground? at the level boundary?).  │
│                                                                     │
│  State-based input decouples input from logic:                      │
│  • Event listener: just sets keyboard.RIGHT = true/false            │
│  • Game loop: reads keyboard.RIGHT and decides what to do           │
│                                                                     │
│  This is the standard pattern in ALL game engines.                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Jump Input — Preventing Double Jumps

```javascript
// In Character.handleMovement():
if (this.keyboard.SPACE && !this.isJumping && !this.spaceWasPressed) {
    this.jump();
    this.spaceWasPressed = true;
}

if (!this.keyboard.SPACE) {
    this.spaceWasPressed = false;
}
```

**Without `spaceWasPressed`:** Holding spacebar would trigger a jump every frame the character lands. The character would bounce uncontrollably.

**With `spaceWasPressed`:** The player must **release** and **re-press** space to jump again. This gives precise control.

### Mobile Touch Controls

**File:** `scripts/script.js`

```javascript
let touchControlsInitialized = false;

/**
 * Setup touch event listeners for mobile buttons
 */
function setupTouchControls() {
    if (touchControlsInitialized) return;  // Prevent duplicate listeners
    setupTouchButton('.left-btn', 'LEFT');
    setupTouchButton('.right-btn', 'RIGHT');
    setupTouchButton('.jump-btn', 'SPACE');
    setupTouchButton('.throw-btn', 'D');
    touchControlsInitialized = true;
}

/**
 * Setup touch events for a single mobile button
 */
function setupTouchButton(selector, key) {
    const btn = document.querySelector(selector);
    if (!btn || !keyboard) return;

    btn.addEventListener('contextmenu', (e) => e.preventDefault());
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });
    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
}
```

**Three key insights:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. SAME KEYBOARD OBJECT                                             │
│     Touch buttons set the SAME keyboard booleans as physical keys.  │
│     The character doesn't know (or care) whether input comes from   │
│     a keyboard or a touchscreen — it just reads keyboard.RIGHT.     │
│                                                                     │
│  2. GUARD AGAINST NULL KEYBOARD                                      │
│     `if (!btn || !keyboard) return` — if keyboard hasn't been       │
│     created yet, silently skip. This prevents a crash, but also     │
│     means calling this too early = buttons that do nothing!          │
│     That's why setupTouchControls() must run AFTER init().          │
│                                                                     │
│  3. PREVENT DUPLICATE LISTENERS                                      │
│     `touchControlsInitialized` flag ensures listeners are only      │
│     attached once. Without this, restarting the game would call     │
│     setupTouchControls() again, stacking duplicate listeners —      │
│     one touchstart would set keyboard.RIGHT = true TWICE.           │
│     The flag is checked: already done? Skip.                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Portrait Warning

```javascript
function checkOrientation() {
    const portraitWarning = document.getElementById('portrait-warning');

    function updateOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const isMobile = isTouchDevice();

        if (isPortrait && isMobile && portraitWarning) {
            portraitWarning.classList.remove('hidden');
        } else if (portraitWarning) {
            portraitWarning.classList.add('hidden');
        }
    }

    updateOrientation();
    window.addEventListener('orientationchange', updateOrientation);
    window.addEventListener('resize', updateOrientation);
}
```

**Key details:**
- Uses `classList.add/remove('hidden')` instead of `style.display` (consistent with the project's CSS pattern)
- Checks both portrait orientation AND touch device — desktop in a tall window shouldn't show the warning
- Listens to both `orientationchange` (mobile rotation) and `resize` (window resize)
- Uses `isTouchDevice()` for reliable mobile detection

### CSS Responsive Architecture — Container Queries

**File:** `style.css`

The game UI scales relative to the **game container**, not the browser viewport. This prevents buttons from becoming oversized on wide screens where the canvas is small.

**Game container sizing — 750px height cap:**

```css
#game-container {
    position: relative;
    width: min(100vw, min(100vh, 750px) * 3 / 2);
    height: min(100vh, 750px, 100vw * 2 / 3);
    aspect-ratio: 3 / 2;
    container-type: size;
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  CONTAINER QUERY SIZING                                              │
│                                                                     │
│  PROBLEM: Using viewport units (vh/vw) for buttons inside the       │
│  canvas meant buttons scaled to the BROWSER WINDOW, not the game.   │
│  On a wide monitor (e.g., 1680×320), the canvas is small but        │
│  buttons sized to 8vh = 25px of the 320px window — way too big      │
│  relative to the tiny canvas.                                        │
│                                                                     │
│  SOLUTION: container-type: size on #game-container enables           │
│  container query units:                                              │
│  • cqh = 1% of container HEIGHT (not viewport height)               │
│  • cqw = 1% of container WIDTH (not viewport width)                 │
│                                                                     │
│  Now clamp(30px, 8cqh, 50px) sizes the mute button to 8% of        │
│  the GAME CONTAINER height, not the browser window.                  │
│                                                                     │
│  HEIGHT CAP: min(100vh, 750px, ...) ensures the canvas never         │
│  exceeds 750px tall, even on large monitors or in fullscreen.        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**All UI elements use container query units:**

```css
/* Buttons scale to container, not viewport */
.mute-btn, .fullscreen-btn, .pause-btn {
    position: absolute;          /* NOT fixed — must be inside container */
    top: clamp(5px, 2cqh, 20px);
    width: clamp(30px, 8cqh, 50px);
    height: clamp(30px, 8cqh, 50px);
    font-size: clamp(16px, 4cqh, 20px);   /* 16px minimum everywhere */
}

/* Touch buttons also use cqh */
.touch-btn {
    width: clamp(40px, 18cqh, 90px);
    height: clamp(40px, 18cqh, 90px);
}
```

> **Key rule:** `position: absolute` (not `fixed`) is required for the mute, fullscreen, and pause buttons. `position: fixed` places elements relative to the viewport and breaks container query context. Since these buttons are children of the relatively-positioned `#game-container`, `absolute` keeps them inside the container.

**Landing page footer — centered in the black zone:**

The start screen image is 16:9 (1920×1080) but the game container is 3:2. The `<img class="landing-hero">` uses `object-fit: contain; object-position: top` — the image fits within the container width but doesn't fill the full height, leaving a transparent strip at the bottom where the animated gradient background shows through. The footer is vertically centered in that strip:

```css
.landing-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(100cqh - 100cqw * 9 / 16);  /* Exact black zone height */
    display: flex;
    justify-content: center;
    align-items: center;
}
```

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE MATH: calc(100cqh - 100cqw * 9 / 16)                          │
│                                                                     │
│  Image is 16:9 → displayed height = container_width × 9/16          │
│  Container is 3:2 → 100cqw = 150cqh                                 │
│  Image height = 150cqh × 9/16 = 84.375cqh                          │
│  Black zone = 100cqh - 84.375cqh = 15.625cqh (~15.6%)              │
│                                                                     │
│  ┌────────────────────────────┐                                      │
│  │     16:9 hero image        │ ← object-fit: contain, top           │
│  │                            │                                      │
│  │                            │   84.375% of container height        │
│  │                            │                                      │
│  ├────────────────────────────┤                                      │
│  │  © 2026 │ BUTTONS │ Impr. │ ← centered with align-items: center  │
│  └────────────────────────────┘   15.625% (animated bg visible here) │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Minimum font size — 16px floor:**

Every `clamp()` in the project uses 16px as the minimum font size:
```css
.btn         { font-size: clamp(16px, 3cqh, 1.5rem); }
.game-btn    { font-size: clamp(16px, 3cqh, 1.5rem); }
.touch-btn   { font-size: clamp(16px, 4cqh, 22px); }
.overlay p   { font-size: clamp(16px, 4cqh, 32px); }
```

This ensures text is always readable, even on very small screens.

### Exercise 10.1: Camera & Input

```
1. Character at x=500. cameraX = 500 - 100 = ?
   A coin at world x=600 appears at screen x = 600 - cameraX = ?

2. Character at x=50. cameraX = 50 - 100 = -50.
   But cameraX is clamped! Final cameraX = ?

3. Character at x=2000. cameraX = 2000 - 100 = 1900.
   But CAMERA_MAX_X = 1438. Final cameraX = ?

4. The player holds the right arrow key. How many times per second
   does handleMovement() check keyboard.RIGHT?

5. What would happen if setupTouchControls() was called during
   DOMContentLoaded instead of inside startGame()?

6. Why does setupTouchControls() use a touchControlsInitialized flag?
   What would happen without it when the player restarts the game?

7. Why do the mute, fullscreen, and pause buttons use position: absolute
   instead of position: fixed? What would break if they used fixed?

8. The start screen image is 1920×1080 (16:9) in a 3:2 container.
   What percentage of the container height is the black zone?
   How does the CSS calc() compute this?

9. What is the difference between 8vh and 8cqh for button sizing?
   When would they produce different results?
```

<details>
<summary>Solutions</summary>

1. `cameraX = 400`. Coin at screen `x = 600 - 400 = 200`.
2. Clamped to `0` (can't go negative)
3. Clamped to `1438`
4. `60 times per second` (once per frame, 60 FPS)
5. `keyboard` is `null` at DOMContentLoaded — it's only created in `init()` when "Start Game" is clicked. `setupTouchButton()` checks `if (!keyboard) return` and silently exits. Touch listeners are never attached. The buttons appear on screen but do nothing!
6. Without the flag, every call to `startGame()` (including restarts) would call `setupTouchControls()` again, adding duplicate `touchstart`/`touchend` listeners to the same buttons. One touch would fire the callback multiple times.
7. `position: fixed` positions elements relative to the **viewport**, not the game container. This breaks `container-type: size` — the buttons would ignore container query units (`cqh`/`cqw`) and scale to the browser window instead. On a wide monitor with a small canvas, the buttons would be oversized relative to the game. `position: absolute` keeps them inside the relatively-positioned `#game-container`, so `cqh`/`cqw` work correctly.
8. Image displayed height = container_width × 9/16. For a 3:2 container: 100cqw = 150cqh, so image height = 150 × 9/16 = 84.375cqh. Black zone = 100 - 84.375 = **15.625%**. The CSS `calc(100cqh - 100cqw * 9 / 16)` computes this dynamically.
9. `8vh` = 8% of the **browser viewport** height. `8cqh` = 8% of the **game container** height. They differ whenever the game container is smaller than the viewport — e.g., on a 1680×320 monitor, the container might be 432px tall while the viewport is 320px. With `vh`, buttons scale to 320px; with `cqh`, they scale to 432px. Container queries ensure buttons always match the canvas size.

</details>

### What you learned:
```
✅ WorldRenderer is a rendering delegate — World logic is separate from drawing
✅ Draw order (z-order): backgrounds → clouds → collectibles → enemies → character → UI
✅ Debug mode shows hitboxes (red/blue), FPS, position, and HP color-coding
✅ Camera follows character with a 100px left offset, clamped to world bounds
✅ ctx.translate(-cameraX) scrolls the world; ctx.restore() keeps UI fixed
✅ Endboss bar is only drawn when isEndbossVisible() returns true
✅ State-based input: event listeners set booleans, game loop reads them
✅ ESC key triggers togglePause() — a toggle action, not a held-key state
✅ spaceWasPressed prevents double jumps from holding spacebar
✅ Mobile touch buttons set the same keyboard object as physical keys
✅ setupTouchControls() must run AFTER init() creates the keyboard object
✅ Touch buttons are responsive: clamp(40px, 18cqh, 90px) — sized relative to the game container
✅ A flag prevents duplicate listeners from stacking on restart
✅ Portrait warning uses isTouchDevice() + orientation detection
✅ container-type: size enables cqh/cqw units — UI scales to the game container, not the viewport
✅ position: absolute (not fixed) keeps UI buttons inside the container query context
✅ Game container height is capped at 750px with min(100vh, 750px, ...)
✅ Landing footer uses calc(100cqh - 100cqw * 9/16) to center in the black zone below the 16:9 image
✅ All clamp() font sizes use 16px minimum for readability
```

---

# Part 11: Performance Improvements — Making the Game Run Smoothly

## The Problem: Timer Overload on Mobile

The original game created **60+ independent `setInterval` timers** — one per animated object (Character, each Chicken, each SmallChicken, Endboss, each Coin, each ThrowableObject). On desktop browsers this was fine, but on iPhone/mobile Safari, the browser **throttles competing timers** and the game lagged badly.

```
BEFORE — Timer explosion:
┌────────────────────────────────────────────────────────────────────┐
│  Game Loop              setInterval(16.67ms)  ← 1 timer           │
│  Character animation    setInterval(100ms)    ← 1 timer           │
│  Chicken 1 animation    setInterval(100ms)    ← 1 timer           │
│  Chicken 2 animation    setInterval(100ms)    ← 1 timer           │
│  Chicken 3 animation    setInterval(100ms)    ← 1 timer           │
│  SmallChicken 1 anim    setInterval(100ms)    ← 1 timer           │
│  SmallChicken 2 anim    setInterval(100ms)    ← 1 timer           │
│  Endboss animation      setInterval(100ms)    ← 1 timer           │
│  Coin 1 animation       setInterval(200ms)    ← 1 timer           │
│  Coin 2 animation       setInterval(200ms)    ← 1 timer           │
│  ... (10+ coins)        setInterval(200ms)    ← 10+ timers        │
│  Thrown bottle 1 anim   setInterval(50ms)     ← 1 timer           │
│  ... etc.                                                          │
│                                                                    │
│  TOTAL: 20-60+ competing setInterval timers!                       │
│  Mobile Safari throttles them → LAG                                │
└────────────────────────────────────────────────────────────────────┘

AFTER — Single timer drives everything:
┌────────────────────────────────────────────────────────────────────┐
│  Game Loop              setInterval(16.67ms)  ← 1 timer           │
│    → world.update()                                                │
│      → character.update()     → character.updateAnimation()        │
│      → enemies.update()       → each enemy.updateAnimation()       │
│      → coins.update()         → each coin.updateAnimation()        │
│      → thrownBottles.update() → each bottle.updateAnimation()      │
│                                                                    │
│  TOTAL: 1 timer. All animations driven from the game loop.         │
│  No throttling. Smooth on mobile.                                  │
└────────────────────────────────────────────────────────────────────┘
```

## The Solution: Delta-Time Accumulator Pattern

Instead of each object running its own `setInterval`, every animated object gets two properties and an `updateAnimation()` method called from the game loop:

```javascript
// Properties added to every animated class:
animationTimer = 0;                    // Accumulates elapsed time
animationSpeed = ANIMATION_SPEED_NORMAL; // ms per frame (e.g. 100ms)

// Called from update() every frame:
updateAnimation() {
    this.animationTimer += FRAME_INTERVAL;  // Add 16.67ms each frame
    if (this.animationTimer >= this.animationSpeed) {
        this.animationTimer -= this.animationSpeed;  // Reset (keep remainder)
        // Advance to next frame — same logic as before
        this.playAnimation(IMAGES_WALKING);
    }
}
```

```
HOW IT WORKS — Frame-by-frame accumulation:
┌──────────────────────────────────────────────────────────────────┐
│  animationSpeed = 100ms (ANIMATION_SPEED_NORMAL)                 │
│  FRAME_INTERVAL = 16.67ms (60 FPS)                               │
│                                                                  │
│  Frame 1:  timer = 0 + 16.67 = 16.67     < 100  → no advance    │
│  Frame 2:  timer = 16.67 + 16.67 = 33.34 < 100  → no advance    │
│  Frame 3:  timer = 33.34 + 16.67 = 50.01 < 100  → no advance    │
│  Frame 4:  timer = 50.01 + 16.67 = 66.68 < 100  → no advance    │
│  Frame 5:  timer = 66.68 + 16.67 = 83.35 < 100  → no advance    │
│  Frame 6:  timer = 83.35 + 16.67 = 100.02 >= 100 → ADVANCE!     │
│            timer = 100.02 - 100 = 0.02    (remainder preserved)  │
│                                                                  │
│  Result: animation advances every ~6 frames (100ms), identical   │
│  to the old setInterval(100ms) — but now driven by 1 timer!      │
└──────────────────────────────────────────────────────────────────┘
```

### Why subtract instead of reset to 0?

```javascript
this.animationTimer -= this.animationSpeed;  // Keep the remainder!
// NOT: this.animationTimer = 0;             // This loses fractional time
```

Subtracting preserves the leftover milliseconds (0.02ms in the example above). Over many frames this prevents **animation drift** — the frames stay precisely timed. Resetting to 0 would slowly make animations run slightly slower than intended.

## Refactored Classes

### Character — The Most Complex Case

The Character has a **jump animation** that plays at a different speed (`ANIMATION_SPEED_JUMP = 136ms`) and only plays once (one-shot). This required tracking state transitions:

**File:** `classes/Character.js`

```javascript
// New properties (replaced animationInterval):
animationTimer = 0;
animationSpeed = ANIMATION_SPEED_NORMAL;
lastAnimationState = '';

updateAnimation() {
    // Detect transition INTO jumping → switch to jump speed
    if (this.lastAnimationState !== this.currentState && this.currentState === 'jumping') {
        this.currentImageIndex = 0;
        this.animationSpeed = ANIMATION_SPEED_JUMP;
        this.animationTimer = 0;
    }
    // Detect transition OUT OF jumping → switch back to normal speed
    else if (this.lastAnimationState === 'jumping' && this.currentState !== 'jumping') {
        this.currentImageIndex = 0;
        this.animationSpeed = ANIMATION_SPEED_NORMAL;
        this.animationTimer = 0;
    }
    this.lastAnimationState = this.currentState;

    // Accumulate and advance
    this.animationTimer += FRAME_INTERVAL;
    if (this.animationTimer >= this.animationSpeed) {
        this.animationTimer -= this.animationSpeed;
        this.advanceFrame();  // Calls playJumpFrame() or playAnimation()
    }
}
```

```
STATE TRANSITION HANDLING:
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  idle (100ms/frame)  →  jumping (136ms/frame)  →  idle (100ms)   │
│       │                      │                        │          │
│       │  State changed!      │  State changed!        │          │
│       │  Reset index = 0     │  Reset index = 0       │          │
│       │  Speed → 136ms       │  Speed → 100ms         │          │
│       │  Timer → 0           │  Timer → 0             │          │
│                                                                  │
│  Jump uses playJumpFrame() (one-shot: plays 9 frames, freezes)   │
│  All other states use playAnimation() (loops continuously)       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Enemies (Chicken, SmallChicken, Endboss) — Simpler Pattern

These classes just call `updateAnimation()` at the end of their `update()` method:

**File:** `classes/Chicken.js`

```javascript
// BEFORE (removed):
startAnimation() {
    this.animationInterval = setInterval(() => {
        if (this.currentState === 'walking') {
            this.playAnimation(IMAGES_CHICKEN_WALKING);
        }
    }, ANIMATION_SPEED_NORMAL);
}

// AFTER (added):
updateAnimation() {
    this.animationTimer += FRAME_INTERVAL;
    if (this.animationTimer >= this.animationSpeed) {
        this.animationTimer -= this.animationSpeed;
        if (this.currentState === 'walking') {
            this.playAnimation(IMAGES_CHICKEN_WALKING);
        }
    }
}
```

The Endboss follows the same pattern but delegates to `advanceFrame()` which handles all 5 states (dead, hurt, attack, alert, walking).

### Coin — Previously Had No update() Method

Coins extended `DrawableObject` (not `MovableObject`) and had no `update()` method. The animation was purely timer-driven. Now Coin has an `update()` that World calls each frame:

**File:** `classes/Coin.js`

```javascript
// Coin animation is slower: 200ms per frame (ANIMATION_SPEED_NORMAL * 2)
animationSpeed = ANIMATION_SPEED_NORMAL * 2;

update() {
    this.updateAnimation();
}
```

**File:** `classes/World.js` — Coins added to the game loop:

```javascript
update() {
    // ... character, enemies, etc.
    this.level.coins.forEach(coin => coin.update());  // NEW
    this.updateThrownBottles();
    // ...
}
```

### ThrowableObject — Splash Transition

The old code used `clearInterval` + `startSplashAnimation()` when a bottle hit something. Now `splash()` just resets the accumulator:

**File:** `classes/ThrowableObject.js`

```javascript
// BEFORE (removed):
splash() {
    clearInterval(this.animationInterval);
    this.startSplashAnimation();  // Created a NEW setInterval
}

// AFTER:
splash() {
    this.isSplashing = true;
    this.animationTimer = 0;       // Reset accumulator
    this.currentImageIndex = 0;    // Start from first splash frame
    // updateAnimation() automatically switches to splash images
}

updateAnimation() {
    this.animationTimer += FRAME_INTERVAL;
    if (this.animationTimer >= this.animationSpeed) {
        this.animationTimer -= this.animationSpeed;
        if (this.isSplashing) {
            this.playAnimation(IMAGES_BOTTLE_SPLASH);
        } else {
            this.playAnimation(IMAGES_BOTTLE_ROTATION);
        }
    }
}
```

## Cleanup: clearGameIntervals() Simplified

**File:** `scripts/script.js`

With no more animation intervals to track, the cleanup function becomes trivial:

```javascript
// BEFORE — had to clean up every object's interval:
function clearGameIntervals() {
    if (!world) return;
    clearTimeout(world.endScreenTimeout);
    clearInterval(world.character.animationInterval);
    world.level.enemies.forEach(e => clearInterval(e.animationInterval));
    world.thrownBottles.forEach(b => clearInterval(b.animationInterval));
    world.level.coins.forEach(c => clearInterval(c.animationInterval));
}

// AFTER — only the endScreen timeout remains:
function clearGameIntervals() {
    if (!world) return;
    if (world.endScreenTimeout) {
        clearTimeout(world.endScreenTimeout);
    }
}
```

This also eliminates a whole class of **restart bugs** — zombie intervals from the old game could leak into the new game if `clearGameIntervals()` missed any object.

## Viewport Culling — Don't Draw What You Can't See

**File:** `classes/WorldRenderer.js`

Another performance improvement: objects outside the visible camera area are **skipped** during rendering. The `isInViewport()` method checks if an object overlaps the camera's visible region (with a small buffer):

```javascript
isInViewport(obj) {
    const camX = this.world.cameraX;
    return obj.xCoordinate + obj.width > camX - VIEWPORT_CULLING_BUFFER &&
           obj.xCoordinate < camX + CANVAS_WIDTH + VIEWPORT_CULLING_BUFFER;
}

drawGameObjects() {
    this.world.level.coins.forEach(coin => {
        if (this.isInViewport(coin)) coin.draw(this.world.ctx);  // Skip if off-screen
    });
    // ... same for bottles, enemies, thrown bottles
}
```

```
VIEWPORT CULLING:
┌──────────────────────────────────────────────────────────────────┐
│  World (2158px wide):                                            │
│                                                                  │
│  [off-screen objects]  │ CAMERA (720px) │  [off-screen objects]  │
│  ← NOT drawn           │ ← DRAWN        │  ← NOT drawn          │
│                        │ + 200px buffer  │                        │
│                                                                  │
│  Without culling: every object calls ctx.drawImage() every frame │
│  With culling: only visible objects are drawn                     │
│  Savings: ~50-70% fewer draw calls when camera is mid-level      │
└──────────────────────────────────────────────────────────────────┘
```

## Draw Order Fix — Collectibles Behind Enemies

The rendering order was also updated so that **coins and bottles are drawn before enemies**. Previously, the large Endboss sprite (250x400px) was drawn first, and coins drawn afterward would appear on top of the boss — but coins near the boss should appear *behind* it:

```
DRAW ORDER (back → front):
1. Background layers → 2. Clouds → 3. Coins & Bottles → 4. Enemies → 5. Thrown bottles → 6. Character

Collectibles are "on the ground" (back layer).
Enemies walk "in front of" ground items.
Character is always the frontmost game object.
```

### Exercise 11.1: Performance

```
1. The game has 5 chickens, 3 small chickens, 1 endboss, 10 coins (max 5 carried),
   and 2 thrown bottles. How many setInterval timers existed BEFORE
   the refactor? How many exist AFTER?

2. ANIMATION_SPEED_NORMAL = 100ms, FRAME_INTERVAL = 16.67ms.
   How many game loop frames pass between animation frame advances?

3. Why does updateAnimation() subtract animationSpeed from the timer
   instead of resetting timer to 0? What bug would resetting cause?

4. The Character's jump animation uses ANIMATION_SPEED_JUMP = 136ms.
   There are 9 jump frames. How long does the full jump animation take?
   Why does this match the physics jump duration?

5. Before the refactor, what happened to a Chicken's setInterval
   if the chicken was killed but clearGameIntervals() wasn't called?

6. Coins had no update() method before. Why did they still animate?
   Why is it better to drive their animation from the game loop?

7. What does viewport culling save? If the camera shows the middle
   of the level, roughly what percentage of objects are NOT drawn?

8. Why are coins drawn BEFORE enemies in the draw order?
```

<details>
<summary>Solutions</summary>

1. **BEFORE:** 1 (game loop) + 1 (character) + 5 (chickens) + 3 (small chickens) + 1 (endboss) + 10 (coins) + 2 (thrown bottles) = **23 timers**. **AFTER:** Just **1 timer** (the game loop).
2. 100 / 16.67 = ~6 frames between each animation advance.
3. Subtracting preserves the fractional remainder (e.g., 0.02ms). Over hundreds of frames, resetting to 0 would accumulate lost time, making animations run measurably slower — a timing drift bug.
4. 9 frames x 136ms = 1224ms. The physics jump duration is `2 * JUMP_FORCE / GRAVITY = 2 * 11 / 0.3 = 73.3 frames = 1222ms`. They match so the animation plays exactly once during the jump arc.
5. The `setInterval` would keep running as a **zombie timer** — calling `playAnimation()` on a dead chicken object, wasting CPU cycles and potentially causing bugs if the chicken's image cache was garbage collected.
6. Coins animated via their own `setInterval` created in the constructor. This worked but added one timer per coin (10+ timers). Driving animation from the game loop means zero additional timers and consistent timing with all other objects.
7. The level is 2158px wide, the camera shows 720px + 400px buffer = 1120px. Objects in the remaining ~1038px are skipped. That's roughly **48%** of the level not drawn — saving ~50% of draw calls.
8. Coins are "on the ground" — they should appear behind walking enemies. The Endboss is 250x400px and would cover nearby coins if drawn first. Drawing collectibles first (back) and enemies second (front) gives correct visual layering.

</details>

### What you learned:
```
✅ Multiple setInterval timers cause lag on mobile due to browser throttling
✅ The delta-time accumulator pattern drives animations from a single game loop
✅ animationTimer += FRAME_INTERVAL accumulates time; subtract (don't reset) to avoid drift
✅ State transitions (idle → jumping → idle) reset the timer and switch animation speed
✅ One-shot animations (jump, death) use playJumpFrame(); looping animations use playAnimation()
✅ Coins now have an update() method called from the World game loop
✅ ThrowableObject.splash() resets the accumulator instead of creating a new setInterval
✅ clearGameIntervals() is simplified — no animation intervals to clean up, only timeouts
✅ Viewport culling skips drawing off-screen objects, saving ~50% of draw calls
✅ Draw order matters: collectibles are drawn before enemies for correct visual layering
```

---

# Part 12: Level Design & World Building — Assembling the Game

> **"A game engine without a level is like a stage without actors. This part connects every system you've learned into a playable experience."**

Up to now, you've learned individual systems: physics, animation, collision, enemies, audio, game states, and performance. But how does the level itself get assembled? How do backgrounds tile seamlessly? How does the landing page work? How do fonts, fullscreen, and responsive design fit in?

This part covers the **"glue" code** — the classes and patterns that turn individual systems into a complete, polished game.

---

## A. BackgroundObject & Parallax Tiling

### The BackgroundObject Class

**File:** `classes/BackgroundObject.js`

This is one of the smallest classes in the codebase — just a constructor:

```javascript
class BackgroundObject extends DrawableObject {
    constructor(imagePath, x) {
        // Background images are always 720x480 (full canvas size)
        super(x, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Load the image (shared cache avoids duplicate Image objects)
        this.img = getCachedImage(imagePath);
    }
}
```

**Line-by-line:**
- Extends `DrawableObject` — backgrounds are drawable but don't move (the *camera* moves, not the backgrounds)
- `super(x, 0, CANVAS_WIDTH, CANVAS_HEIGHT)` — each background is exactly one canvas-width (720×480), positioned at `y = 0`
- `getCachedImage(imagePath)` — uses the global image cache from `constants.js` to avoid creating duplicate `Image` objects for the same file

### How Parallax Layers Stack

Each X position in the level has **4 layers** stacked on top of each other:

```
┌────────────────────────────────────────────────────────────────────┐
│  HOW BACKGROUND LAYERS STACK                                       │
│                                                                    │
│  At each X position, 4 images are drawn in order:                 │
│                                                                    │
│  Layer 1: air.png           ← Solid sky color (bottom of stack)   │
│  Layer 2: 3_third_layer     ← Distant mountains (drawn ON TOP)    │
│  Layer 3: 2_second_layer    ← Mid-ground hills                    │
│  Layer 4: 1_first_layer     ← Foreground details (top of stack)   │
│                                                                    │
│  Each layer is 720×480 (full canvas) with transparency.           │
│  The transparent parts let lower layers show through.              │
│                                                                    │
│  Visual result:                                                    │
│  ┌──────────────────────────────┐                                  │
│  │  ☁ sky (air.png)            │                                  │
│  │  ⛰ mountains show through   │                                  │
│  │  🌿 hills in mid-ground     │                                  │
│  │  🌵 cactus in foreground    │                                  │
│  └──────────────────────────────┘                                  │
└────────────────────────────────────────────────────────────────────┘
```

### Tiling: Why 719 and Not 720?

**File:** `levels/level1.js`

The backgrounds are tiled at X positions: **-719, 0, 719, 1438**:

```javascript
backgroundObjects: [
    // Position -719 (left offscreen for scrolling)
    new BackgroundObject('img/5_background/layers/air.png', -719),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719),

    // Position 0 (visible at start)
    new BackgroundObject('img/5_background/layers/air.png', 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 0),

    // Position 719
    new BackgroundObject('img/5_background/layers/air.png', 719),
    // ... same pattern

    // Position 1438 (719 * 2)
    new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
    // ... same pattern
]
```

**Why 719 instead of 720?** The canvas is 720px wide (`CANVAS_WIDTH = 720`). If you tile at 0 and 720, there's a **1-pixel gap** between tiles due to how `drawImage` renders pixel boundaries. Using 719 creates a 1-pixel overlap that eliminates visible seams. This is a common trick in 2D game tiling.

```
With 720 spacing (GAP!):          With 719 spacing (OVERLAP):
┌──────────┐ ┌──────────┐        ┌──────────┐──────────┐
│  Tile A  │ │  Tile B  │        │  Tile A  │  Tile B  │
│  0-719   │ │ 720-1439 │        │  0-719   │ 719-1438 │
└──────────┘ └──────────┘        └──────────┘──────────┘
           ↑ 1px gap!                     ↑ 1px overlap (no gap)
```

Notice the alternating variants (`1.png` / `2.png`) at adjacent positions — this prevents the same image from repeating side-by-side, which would look artificial.

---

## B. Cloud (Decorative Element)

**File:** `classes/Cloud.js`

Clouds are purely decorative — no collision, no interaction with the player:

```javascript
class Cloud extends MovableObject {
    constructor() {
        // Initialize with cloud dimensions and speed
        super(CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SPEED);

        // Load cloud image (shared cache)
        this.img = getCachedImage(IMAGE_CLOUD);

        // Random starting position
        this.xCoordinate = Math.random() * CLOUD_SPREAD_RANGE;

        // Random height in upper part of sky
        this.yCoordinate = CLOUD_Y_MIN + Math.random() * CLOUD_Y_RANGE;
    }

    update() {
        this.moveLeft();  // Constant leftward drift
    }
}
```

**Key constants:**
- `CLOUD_WIDTH = 500`, `CLOUD_HEIGHT = 250` — clouds are large (almost the full canvas width)
- `CLOUD_SPEED = 0.5` — very slow drift (0.5px per frame = 30px per second)
- `CLOUD_SPREAD_RANGE = 2000` — random X from 0 to 2000 (across the level)
- `CLOUD_Y_MIN = 20`, `CLOUD_Y_RANGE = 130` — random Y between 20 and 150 (upper sky)

**Why extend `MovableObject`?** Clouds need `moveLeft()` for constant drift. They don't use gravity, jumping, or collision — they just use the movement speed from `MovableObject`.

---

## C. Level Class & Factory Pattern

### The Level Class — Pure Data Container

**File:** `classes/Level.js`

```javascript
class Level {
    clouds = [];
    chickens = [];
    backgroundObjects = [];
    bottles = [];
    coins = [];
    endboss = null;
    levelEndX = LEVEL_END_X;

    constructor(clouds, chickens, backgroundObjects, bottles, coins, endboss) {
        this.clouds = clouds;
        this.chickens = chickens;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
    }
}
```

The `Level` class is a **data container** — it has properties but no methods. It holds references to all the objects that make up a level: enemies, clouds, backgrounds, and collectibles.

### The Factory Function — `createLevel1()`

**File:** `levels/level1.js`

```javascript
function createLevel1() {
    return {
        enemies: [
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            // ... 4 chickens, 4 small chickens
            new Endboss()
        ],
        clouds: [
            new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()
        ],
        backgroundObjects: [
            // 4 positions × 4 layers = 16 BackgroundObject instances
            // ...
        ],
        coins: [
            new Coin(350, 200),  // Floating
            new Coin(500, 150),  // Higher
            // ... 10 coins at varied heights (max 5 carried)
        ],
        bottles: [
            new Bottle(400), new Bottle(550), // ... 10 bottles (max 5 carried)
        ]
    };
}

let level1 = createLevel1();
```

**Why a factory function instead of a plain object literal?**

When the player restarts the game, all enemies, coins, and bottles need to be **fresh instances**. If `level1` were a static object, enemies would still be dead, coins would still be collected, and bottles would still be gone. The factory function creates brand-new instances every time:

```javascript
// In restartGame() — scripts/script.js
function restartGame() {
    stopGameLoop();
    clearGameIntervals();
    // ...
    level1 = createLevel1();  // ← Fresh level with new enemies, coins, bottles
    init();
}
```

This avoids **state pollution** between game sessions — a common bug in games without proper reset logic.

---

## D. Landing Page, Animated Background & How to Play Dialog

### HTML Structure

**File:** `index.html`

The landing page is a `<div>` overlay positioned absolutely inside `#game-container`. The start screen image is rendered as an `<img>` element (not a CSS background), sitting above the animated background:

```html
<!-- Animated Gradient Wave Background (body-level, behind everything) -->
<div class="bg-animation">
    <div class="bg-gradient-sphere sphere-1"></div>
    <div class="bg-gradient-sphere sphere-2"></div>
    <div class="bg-gradient-sphere sphere-3"></div>
    <div class="bg-gradient-sphere sphere-4"></div>
    <div class="bg-grid-overlay"></div>
    <svg class="bg-noise-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="bg-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-noise)" />
    </svg>
    <canvas id="bg-particles"></canvas>
</div>

<!-- Inside #game-container: -->
<canvas id="canvas" class="hidden" width="720" height="480"></canvas>

<div id="landing-page" class="landing-page">
    <img class="landing-hero"
         src="img/9_intro_outro_screens/start/startscreen_1.png"
         alt="El Pollo Loco" />

    <div class="landing-footer">
        <span class="footer-left">&copy; 2026 El Pollo Loco</span>
        <div class="footer-buttons">
            <button class="btn btn-primary" onclick="startGame()">Start Game</button>
            <button class="btn btn-secondary" onclick="showInstructions()">How to Play</button>
        </div>
        <a href="impressum.html" class="footer-right">Impressum</a>
    </div>
</div>
```

**Key structural points:**
- The `.bg-animation` div lives at the **body level** (outside `#game-container`) with `position: fixed; z-index: -1` so it covers the entire viewport as a backdrop
- The game canvas starts with `class="hidden"` — it's invisible until `startGame()` reveals it, ensuring the animated background shows through the transparent landing page
- The start screen image uses `<img class="landing-hero">` with `object-fit: contain; object-position: top` instead of a CSS background-image
- The `.landing-page` has `background: transparent` so the animated gradient background shows through
- The `.landing-footer` has `z-index: 2` to sit above the hero image

### Animated Gradient Wave Background

**Files:** `scripts/backgroundAnimation.js`, `style.css`, `scripts/constants.js`

The animated background creates a premium visual effect with multiple layers:

```
Layer stack (back to front):
┌─────────────────────────────────────────────────┐
│  .bg-animation (position: fixed, z-index: -1)   │
│  ┌─────────────────────────────────────────────┐ │
│  │ 4 gradient spheres — blurred, animated,     │ │
│  │ orange-toned radial-gradient circles with    │ │
│  │ CSS keyframe animations (18-25s float cycles)│ │
│  │ + mouse parallax via CSS translate property  │ │
│  ├─────────────────────────────────────────────┤ │
│  │ Grid overlay — 50px repeating grid at 3%    │ │
│  │ white opacity for depth and dimensionality   │ │
│  ├─────────────────────────────────────────────┤ │
│  │ SVG noise texture — feTurbulence filter at   │ │
│  │ 4% opacity for premium tactile feel          │ │
│  ├─────────────────────────────────────────────┤ │
│  │ Particle canvas — 120 animated dots with     │ │
│  │ connecting lines, mouse glow, and push effect│ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Gradient Spheres (CSS-only):**
Each sphere is a large `border-radius: 50%` div with `filter: blur(80px)` and a unique `@keyframes bg-float-*` animation. The `translate` CSS property is set via JavaScript custom properties (`--parallax-x`, `--parallax-y`) for mouse parallax, independent of the `transform` keyframe animation.

**Particle System (`backgroundAnimation.js`):**
- 120 particles drift slowly across the screen with random velocities
- Faint connecting lines drawn between nearby particles (`BG_LINE_DISTANCE = 120px`)
- Mouse cursor draws brighter connecting lines to nearby particles (`BG_MOUSE_LINE_DISTANCE = 180px`)
- Soft radial glow around the cursor (`BG_MOUSE_GLOW_RADIUS = 200px`)
- Particles gently repelled from the cursor (`BG_MOUSE_INFLUENCE_RADIUS = 250px`)
- Particles wrap to the opposite edge when they move off-screen
- Animation runs continuously as the body-level backdrop (not stopped during gameplay)

**The same background is also used on `impressum.html`** — it links to `style.css` and loads `constants.js` + `backgroundAnimation.js` to get the identical animated effect.

### The `startGame()` Flow

**File:** `scripts/script.js`

```javascript
function startGame() {
    if (DOM.canvas) DOM.canvas.classList.remove('hidden');       // Reveal canvas
    if (DOM.landingPage) DOM.landingPage.classList.add('hidden');
    if (DOM.muteBtn) DOM.muteBtn.classList.remove('hidden');
    if (DOM.fullscreenBtn) DOM.fullscreenBtn.classList.remove('hidden');
    if (DOM.pauseBtn) DOM.pauseBtn.classList.remove('hidden');

    init();  // ← Creates World, starts game loop

    if (isTouchDevice()) {
        if (DOM.mobileControls) DOM.mobileControls.classList.remove('hidden');
    }

    setupTouchControls();
}
```

**The flow:** Show canvas → hide landing → show UI buttons → call `init()` → show mobile controls if touch device.

### The `backToMenu()` Flow

**File:** `scripts/script.js`

```javascript
function backToMenu() {
    if (world && world.character) world.character.stopSnoring();
    AudioManager.getInstance().stopMusic();
    stopGameLoop();
    clearGameIntervals();

    if (DOM.gameoverScreen) DOM.gameoverScreen.classList.add('hidden');
    if (DOM.winScreen) DOM.winScreen.classList.add('hidden');
    if (DOM.pauseScreen) DOM.pauseScreen.classList.add('hidden');
    if (DOM.muteBtn) DOM.muteBtn.classList.add('hidden');
    if (DOM.fullscreenBtn) DOM.fullscreenBtn.classList.add('hidden');
    if (DOM.pauseBtn) DOM.pauseBtn.classList.add('hidden');
    if (DOM.mobileControls) DOM.mobileControls.classList.add('hidden');
    isPaused = false;

    if (DOM.canvas) DOM.canvas.classList.add('hidden');          // Hide canvas
    if (DOM.landingPage) DOM.landingPage.classList.remove('hidden');

    resetKeyboard();
    world = null;
    level1 = createLevel1();
}
```

**Why hide the canvas?** The landing page has `background: transparent` so the animated gradient background shows through. If the canvas weren't hidden, the last game frame would bleed through the footer area.

### How to Play Dialog

The instructions dialog uses a simple show/hide pattern with three ways to close:

```javascript
function showInstructions() {
    if (DOM.instructionsDialog) DOM.instructionsDialog.classList.remove('hidden');
}

function hideInstructions() {
    if (DOM.instructionsDialog) DOM.instructionsDialog.classList.add('hidden');
}
```

```html
<!-- Close method 1: Click the overlay background -->
<div id="instructions-dialog" class="dialog-overlay hidden"
     onclick="hideInstructions()">

    <!-- Close method 2: stopPropagation prevents clicking dialog content from closing -->
    <div class="dialog" onclick="event.stopPropagation()">

        <!-- Close method 3: × button -->
        <button class="dialog-close" onclick="hideInstructions()">&times;</button>
        <!-- ... dialog content ... -->
    </div>
</div>
```

**The three close methods:**
1. Click the dark overlay background → `onclick="hideInstructions()"`
2. Click the × button → same function
3. The dialog content itself has `event.stopPropagation()` — clicking inside the dialog does NOT close it

---

## E. Custom Fonts & Fullscreen API

### Custom Font Loading

**File:** `style.css`

```css
@font-face {
    font-family: 'Boogaloo';
    src: url('fonts/Boogaloo-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}
```

**Key details:**
- Font is loaded from a **local** WOFF2 file (no external CDN dependency)
- `font-display: swap` — text renders immediately with a fallback font, then swaps to Boogaloo once loaded. This prevents invisible text (FOIT) during loading
- WOFF2 is the most compressed web font format — smaller file size than TTF/OTF

### Fullscreen API

**File:** `scripts/script.js`

```javascript
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
```

**How it works:**
- `document.fullscreenElement` — returns the element currently in fullscreen, or `null` if none
- `document.documentElement.requestFullscreen()` — makes the entire page fullscreen
- `document.exitFullscreen()` — returns to normal windowed mode

> **Note:** iOS Safari does not support the standard Fullscreen API on iPhones. The button will be present but non-functional on iPhone browsers. This is a known platform limitation — iOS restricts fullscreen to video elements only. On iPads with Safari 12+, fullscreen works normally.

---

## F. Container Queries & Responsive Design

### The Game Container

**File:** `style.css`

```css
#game-container {
    position: relative;
    width: min(100vw, min(100vh, 750px) * 3 / 2);
    height: min(100vh, 750px, 100vw * 2 / 3);
    aspect-ratio: 3 / 2;
    container-type: size;
}
```

**Breaking down the sizing:**
- The container maintains a **3:2 aspect ratio** (720×480 canvas)
- `width` uses nested `min()` to pick the smallest of: viewport width, or the width calculated from height
- `height` uses `min()` to pick the smallest of: viewport height, 750px cap, or height calculated from width
- This ensures the game fits in any viewport without scrollbars

**The magic property:** `container-type: size` — this enables **CSS Container Queries** inside this element. Child elements can now use `cqh` (container query height) and `cqw` (container query width) units instead of `vh`/`vw`.

### Why Container Queries Instead of Viewport Units?

```
┌─────────────────────────────────────────────────────────────────────┐
│  VIEWPORT UNITS (vh/vw) vs CONTAINER QUERY UNITS (cqh/cqw)        │
│                                                                     │
│  Viewport units are relative to the BROWSER WINDOW:                │
│  • 1vh = 1% of browser window height                               │
│  • Problem: browser chrome (toolbar, address bar) changes vh!      │
│                                                                     │
│  Container query units are relative to the GAME CONTAINER:         │
│  • 1cqh = 1% of #game-container height                            │
│  • The game container has a fixed aspect ratio                      │
│  • So cqh/cqw are always predictable and consistent                │
│                                                                     │
│  This is why buttons, overlays, and text use cqh/cqw:             │
│  font-size: clamp(16px, 3cqh, 1.3rem)                             │
│  padding: clamp(6px, 2cqh, 15px) clamp(16px, 4cqw, 40px)         │
│                                                                     │
│  The clamp() function provides:                                    │
│  clamp(minimum, preferred, maximum)                                │
│  • Never smaller than minimum (readability on tiny screens)        │
│  • Scales with container at preferred rate                         │
│  • Never larger than maximum (aesthetics on large screens)         │
└─────────────────────────────────────────────────────────────────────┘
```

### Landing Footer Math

```css
.landing-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(100cqh - 100cqw * 9 / 16);
    /* ... */
}
```

The start screen image has a 16:9 aspect ratio, but the container is 3:2. The footer fills the **black bar** below the image:

```
┌──────────────────────────────────────┐
│                                      │  ← 16:9 start screen image
│          Start Screen Image          │     (100cqw × 100cqw * 9/16)
│                                      │
├──────────────────────────────────────┤
│  © 2026  [Start] [How to Play]  Imp │  ← Footer in remaining space
└──────────────────────────────────────┘     height = 100cqh - image height
```

`100cqh` = full container height. `100cqw * 9 / 16` = height of the 16:9 image. The difference is the footer's height.

### Important: `position: absolute` Not `position: fixed`

All overlays inside `#game-container` use `position: absolute`, not `position: fixed`. Why? Because `container-type: size` creates a new **containing block** — `fixed` positioning inside a container query context would not behave as expected. The one exception is `#portrait-warning` and `.dialog-overlay`, which use `position: fixed` because they need to cover the entire viewport, not just the game container.

### Portrait Warning

```css
#portrait-warning {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 100;
}
```

```javascript
function checkOrientation() {
    function updateOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const isMobile = isTouchDevice();

        if (isPortrait && isMobile) {
            portraitWarning.classList.remove('hidden');
        } else {
            portraitWarning.classList.add('hidden');
        }
    }

    updateOrientation();
    window.addEventListener('orientationchange', updateOrientation);
    window.addEventListener('resize', updateOrientation);
}
```

The warning only shows on **mobile devices in portrait mode**. It listens to both `orientationchange` (mobile API) and `resize` (fallback) events.

### No Scrollbars

Two CSS rules prevent scrollbars:

```css
body {
    overflow: hidden;  /* Prevents any scrollbars */
}

#game-container {
    /* width/height calculations ensure it fits within viewport */
    width: min(100vw, ...);
    height: min(100vh, ...);
}
```

---

## Exercise 12.1 — Level Architecture

```
1. In level1.js, how many total BackgroundObject instances are created?
   (Count: positions × layers per position)

2. Why does createLevel1() return a plain object literal instead of
   a new Level() instance?

3. What would happen if backgrounds were tiled at x=0, x=720, x=1440
   instead of x=0, x=719, x=1438?

4. The Cloud class extends MovableObject but never uses gravity or
   jumping. What method from MovableObject DOES it use?

5. The landing footer uses height: calc(100cqh - 100cqw * 9 / 16).
   If the container is 900px wide and 600px tall, what is the footer height?

6. Why do overlays inside #game-container use position: absolute
   instead of position: fixed?
```

<details>
<summary>Solutions</summary>

1. **16 instances** — 4 positions (−719, 0, 719, 1438) × 4 layers per position (air, third, second, first).
2. The `World` constructor consumes the plain object directly, extracting `enemies`, `clouds`, `backgroundObjects`, `coins`, and `bottles` into a `Level` instance. The factory just needs to return fresh data — the `Level` class is constructed inside `World`. The key benefit is that calling `createLevel1()` again on restart produces completely fresh objects with no stale state.
3. There would be **1-pixel gaps** between tiles. Canvas `drawImage` renders pixels at integer boundaries, so 720px-wide images placed at exactly 720px apart can leave a visible seam. Using 719 creates a 1px overlap that prevents gaps.
4. `moveLeft()` — inherited from `MovableObject`. Clouds drift left at `CLOUD_SPEED = 0.5` pixels per frame.
5. Image height = `900 × 9/16 = 506.25px`. Footer height = `600 - 506.25 = 93.75px`.
6. `container-type: size` on `#game-container` creates a new containing block. `position: fixed` inside a container query context doesn't pin to the viewport as expected — it pins to the container. Using `absolute` gives predictable behavior relative to the container.

</details>

### What you learned:
```
✅ BackgroundObject is a minimal DrawableObject subclass — just position + cached image
✅ 4 layers stack at each X position (air → third → second → first) for parallax depth
✅ Tiling at 719px intervals (not 720) prevents 1-pixel gaps between backgrounds
✅ Alternating image variants (1.png/2.png) at adjacent positions avoids visual repetition
✅ Cloud extends MovableObject for moveLeft() — no gravity, no collision, pure decoration
✅ Level is a data container; createLevel1() is a factory for fresh instances on restart
✅ The landing page uses show/hide with classList, not page reloads
✅ Instructions dialog closes via: overlay click, × button, or function call
✅ @font-face with local WOFF2 and font-display: swap prevents invisible text
✅ Fullscreen API: requestFullscreen() / exitFullscreen() toggle (not available on iOS iPhone)
✅ container-type: size enables cqh/cqw units relative to the game container
✅ clamp(min, preferred, max) provides responsive sizing with bounds
✅ position: absolute (not fixed) inside container query contexts for correct behavior
✅ calc(100cqh - 100cqw * 9/16) places the footer in the black bar below the 16:9 image
✅ Portrait warning uses orientationchange + resize events on mobile only
```

---

# Common Mistakes & Spot the Bug

## 12 Common Game Dev Mistakes

### Mistake 1: Checking yVelocity Instead of Position for Falling

```javascript
// WRONG — gravity resets velocity to 0 BEFORE collision check!
const wasMovingDown = character.yVelocity > 0;

// CORRECT — compare actual positions
const wasMovingDown = character.yCoordinate > character.previousY;
```

### Mistake 2: Iterating Forward When Removing Array Items

```javascript
// WRONG — skips elements after splice!
for (let i = 0; i < enemies.length; i++) {
    if (shouldRemove(enemies[i])) {
        enemies.splice(i, 1);  // Next item shifts into index i, gets skipped!
    }
}

// CORRECT — iterate backwards
for (let i = enemies.length - 1; i >= 0; i--) {
    if (shouldRemove(enemies[i])) {
        enemies.splice(i, 1);  // Items before i are unaffected
    }
}
```

### Mistake 3: Forgetting ctx.restore() After ctx.save()

```javascript
// WRONG — all subsequent drawing is flipped!
draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width, this.y);
    ctx.scale(-1, 1);
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    // Forgot ctx.restore()!
}

// CORRECT — restore the canvas state
draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width, this.y);
    ctx.scale(-1, 1);
    ctx.drawImage(this.img, 0, 0, this.width, this.height);
    ctx.restore();  // Undo all transforms
}
```

### Mistake 4: Resetting the Game by Reloading the Page

```javascript
// WRONG — wastes bandwidth, reloads all assets, poor UX
function restartGame() {
    location.reload();
}

// CORRECT — reset state in JavaScript
function restartGame() {
    stopGameLoop();
    clearGameIntervals();
    level1 = createLevel1();  // Factory pattern!
    init();
}
```

### Mistake 5: Playing Audio Without Error Handling

```javascript
// WRONG — crashes on browsers with autoplay restrictions
sound.play();

// CORRECT — silently handle the browser blocking audio
sound.play().catch(() => {});
```

### Mistake 6: Not Using Collision Offsets

```javascript
// WRONG — collision triggers when hat touches enemy
isColliding(obj) {
    return this.x < obj.x + obj.width &&  // Full sprite overlap
           this.x + this.width > obj.x;
}

// CORRECT — use offsets for tight hitbox
isColliding(obj) {
    return this.x + this.collisionOffsetX < obj.x + obj.collisionOffsetX + obj.width
           // ... all four conditions with offsets
}
```

### Mistake 7: Hardcoding Magic Numbers

```javascript
// WRONG — what does 2.5 mean? What does 180 mean?
this.yVelocity += 2.5;
if (this.yCoordinate >= 180) { ... }

// CORRECT — named constants in constants.js
this.yVelocity += GRAVITY;
if (this.yCoordinate >= GROUND_LEVEL) { ... }
```

### Mistake 8: Multiple AudioManager Instances

```javascript
// WRONG — creates a new manager each time
class World {
    constructor() {
        this.audio = new AudioManager();  // New instance!
    }
}

// CORRECT — use the singleton
AudioManager.getInstance().playMusic(AUDIO_MUSIC_BG);
```

### Mistake 9: Not Preventing Multiple Game-Over Triggers

```javascript
// WRONG — gameOver() fires every frame after death
update() {
    if (this.character.isDead) {
        this.gameOver();  // Called 60 times per second!
    }
}

// CORRECT — use a flag to prevent repeated calls
update() {
    if (this.character.isDead && !this.isGameOver) {
        this.gameOver();
    }
}
```

### Mistake 10: Letting Dead Characters Move

```javascript
// WRONG — check keyboard regardless of state
handleMovement() {
    if (this.keyboard.RIGHT) this.moveRight();
}

// CORRECT — the dead state check in updateState() prevents this
// because update() handles movement before state, and
// state machine ensures dead character transitions properly
// Even better: explicitly block input when dead
handleMovement() {
    if (this.isDead) return;
    if (this.keyboard.RIGHT) this.moveRight();
}
```

### Mistake 11: Setting Up Listeners Before Dependencies Exist

```javascript
// WRONG — keyboard is null during DOMContentLoaded!
window.addEventListener('DOMContentLoaded', () => {
    setupTouchControls();  // keyboard doesn't exist yet!
});

function setupTouchButton(selector, key) {
    const btn = document.querySelector(selector);
    if (!btn || !keyboard) return;  // Silently exits — no error, no listeners!
    btn.addEventListener('touchstart', () => keyboard[key] = true);
}

// CORRECT — call AFTER init() creates the keyboard
function startGame() {
    init();                 // Creates keyboard
    setupTouchControls();   // NOW keyboard exists!
}
```

### Mistake 12: Stacking Duplicate Event Listeners on Restart

```javascript
// WRONG — adds new listeners every restart!
function startGame() {
    init();
    setupTouchControls();  // Called again on restart → duplicate listeners!
}

// CORRECT — use a flag to attach listeners only once
let touchControlsInitialized = false;

function setupTouchControls() {
    if (touchControlsInitialized) return;  // Already done? Skip.
    // ... attach listeners ...
    touchControlsInitialized = true;
}
```

---

## Spot the Bug! (Exercises)

For each snippet, find the bug and explain the fix. **Try before peeking!**

### Bug 1: Enemies Never Reach Patrol End

```javascript
patrol() {
    if (this.movingRight) {
        this.moveRight();
        if (this.xCoordinate > this.patrolEndX) {
            this.movingRight = false;
        }
    } else {
        this.moveLeft();
        if (this.xCoordinate > this.patrolStartX) {
            this.movingRight = true;
        }
    }
}
```

<details>
<summary>Answer</summary>

**Bug:** In the `else` branch, it checks `> this.patrolStartX` instead of `<= this.patrolStartX`. The chicken turns around when it's to the RIGHT of the start (which is always true when moving left), so it immediately flips back.

**Fix:** `if (this.xCoordinate <= this.patrolStartX)`
</details>

### Bug 2: Health Bar Shows Wrong State

```javascript
handleEnemyHit(enemy, index) {
    this.world.character.hit(ENEMY_DAMAGE);
    this.world.healthBar.setPercentage(this.world.character.health);
}
```

<details>
<summary>Answer</summary>

**Bug:** `hit()` respects the invincibility cooldown and returns `false` when damage is NOT applied. But `setPercentage()` is called every time regardless, causing the bar to flicker or re-draw unnecessarily. More critically, the hurt SFX should only play when damage actually happens.

**Fix:**
```javascript
const wasHurt = this.world.character.hit(ENEMY_DAMAGE);
if (wasHurt) {
    this.world.healthBar.setPercentage(this.world.character.health);
    AudioManager.getInstance().playSFX(AUDIO_SFX_HURT);
}
```
</details>

### Bug 3: Bottle Hits Multiple Enemies

```javascript
checkBottleEnemyCollisions() {
    this.world.thrownBottles.forEach(bottle => {
        for (let i = this.world.level.enemies.length - 1; i >= 0; i--) {
            const enemy = this.world.level.enemies[i];
            if (bottle.isColliding(enemy)) {
                bottle.splash();
                this.world.level.enemies.splice(i, 1);
            }
        }
    });
}
```

<details>
<summary>Answer</summary>

**Bug:** After `bottle.splash()` is called, the bottle continues checking against remaining enemies. It can kill multiple enemies in one throw! The bottle should stop checking after its first hit.

**Fix:** Add `if (bottle.isSplashing) return;` at the start of the forEach callback to skip bottles that already hit something.
</details>

### Bug 4: Camera Jitters at Level Start

```javascript
updateCamera() {
    this.cameraX = this.character.xCoordinate - CAMERA_OFFSET_X;
}
```

<details>
<summary>Answer</summary>

**Bug:** When the character is near x=0, `cameraX` becomes negative. This would draw background objects shifted to the right, revealing empty space on the left side of the screen.

**Fix:** Clamp: `if (this.cameraX < 0) this.cameraX = 0;`
</details>

### Bug 5: Jump Frames Don't Sync with Physics

```javascript
startAnimation() {
    this.animationInterval = setInterval(() => {
        if (this.currentState === 'jumping') {
            this.playAnimation(IMAGES_CHARACTER_JUMPING);
        }
    }, ANIMATION_SPEED_NORMAL);  // 100ms
}
```

<details>
<summary>Answer</summary>

**Bug:** The jump lasts ~1222ms (73 frames × 16.67ms). At 100ms per animation frame with 9 frames, the animation takes 900ms — it finishes before the character lands! And `playAnimation()` loops, so frames repeat randomly.

**Fix:** Use a dedicated `startJumpAnimation()` with `ANIMATION_SPEED_JUMP = 136ms` (9 × 136 = 1224ms ≈ 1222ms). Use `playJumpFrame()` which plays through once and freezes on the last frame instead of looping.
</details>

### Bug 6: Endboss Ignores Bottle Damage

```javascript
hit(damage = THROWABLE_DAMAGE) {
    if (this.isDead) return;
    if (this.isHurt()) return;  // ← Suspicious line

    this.health -= damage;
    this.lastHitTime = Date.now();

    if (this.health <= 0) {
        this.health = 0;
        this.isDead = true;
    }
}
```

<details>
<summary>Answer</summary>

**Bug:** `isHurt()` checks if the boss was hit within the last `HURT_DURATION` (1 second). With a 1-second cooldown, rapid bottle throws are ignored. The boss becomes harder to defeat because you have to wait 1 second between hits.

**Fix:** Remove the `if (this.isHurt()) return;` line. The Endboss should take damage on every bottle hit with no cooldown. The `isHurt()` check is appropriate for the character (to prevent damage spam from walking through enemies), but not for the boss.

**Note:** This bug has already been fixed in the codebase! The current `Endboss.hit()` method does NOT have the `isHurt()` guard. Compare with `Character.hit()` which correctly uses it.
</details>

### Bug 7: Mobile Buttons Look Right But Do Nothing

```javascript
window.addEventListener('DOMContentLoaded', () => {
    initMobileControls();
});

function initMobileControls() {
    if (window.innerWidth <= 768) {
        document.getElementById('mobile-controls').classList.remove('hidden');
        setupTouchControls();
    }
}

function setupTouchButton(selector, key) {
    const btn = document.querySelector(selector);
    if (!btn || !keyboard) return;
    btn.addEventListener('touchstart', () => keyboard[key] = true);
    btn.addEventListener('touchend', () => keyboard[key] = false);
}
```

<details>
<summary>Answer</summary>

**Bug:** `setupTouchControls()` runs during `DOMContentLoaded`, but `keyboard` is only created later inside `init()` (when "Start Game" is clicked). At this point `keyboard` is `null`, so `setupTouchButton()` hits the `if (!keyboard) return` guard and exits silently. The buttons appear on screen but no touch listeners are ever attached.

**This is an insidious bug** because there's no error message — the guard fails silently. The buttons visually exist, they just don't respond to input.

**Fix:** Move `setupTouchControls()` into `startGame()`, after `init()` creates the keyboard:
```javascript
function startGame() {
    init();                 // Creates keyboard
    setupTouchControls();   // NOW keyboard exists!
}
```
</details>

---

# Quick Reference Card

### Class Hierarchy
```
DrawableObject → MovableObject → Character, Chicken, SmallChicken, Endboss,
                                  ThrowableObject, Cloud
DrawableObject → BackgroundObject, Coin, Bottle, StatusBar
```

### Key Constants
```javascript
// Gameplay
CANVAS_WIDTH = 720, CANVAS_HEIGHT = 480
FRAME_INTERVAL = 16.67  // 60 FPS
GRAVITY = 0.3           // Floaty jump feel
GROUND_LEVEL = 180
CHARACTER_JUMP_FORCE = 11
CHARACTER_SPEED = 5
CHARACTER_MAX_HEALTH = 100
ENEMY_DAMAGE = 20
THROWABLE_DAMAGE = 20
ENDBOSS_MAX_HEALTH = 100  // 5 bottle hits to kill
ENDBOSS_SPEED = 6         // Faster than player!
ENDBOSS_CHASE_DURATION = 1500   // 1.5s chase phase
ENDBOSS_WANDER_DURATION = 1500  // 1.5s wander phase
ENDBOSS_MIN_X = 500      // Left boundary for boss
HURT_DURATION = 1000      // 1s invincibility after hit
ENEMY_BOUNCE_FORCE = 6
ITEMS_PER_FULL_BAR = 5
ANIMATION_SPEED_JUMP = 136  // Synced to 1222ms jump duration

// Background Animation
BG_PARTICLE_COUNT = 120   // Number of floating particles
BG_PARTICLE_SPEED = 0.3   // Drift velocity
BG_MOUSE_INFLUENCE_RADIUS = 250   // Mouse push range (px)
BG_MOUSE_INFLUENCE_STRENGTH = 2   // Push force multiplier
BG_LINE_DISTANCE = 120    // Particle-to-particle line range (px)
BG_MOUSE_LINE_DISTANCE = 180      // Mouse-to-particle line range (px)
BG_PARALLAX_STRENGTH = 20         // Sphere parallax shift (px)
```

### Drawing Pattern
```javascript
ctx.save();
ctx.translate(x + width, y);
ctx.scale(-1, 1);
ctx.drawImage(img, 0, 0, width, height);
ctx.restore();
```

### Collision Detection (AABB)
```javascript
isColliding(obj) {
    return myRight > objLeft && myLeft < objRight &&
           myBottom > objTop && myTop < objBottom;
}
```

### Stomp Detection
```javascript
isStomp(enemy) {
    wasMovingDown = yCoordinate > previousY;
    previousBottom = previousY + height - collisionOffsetHeight;
    enemyTop = enemy.yCoordinate + enemy.collisionOffsetY;
    return wasMovingDown && previousBottom <= enemyTop;
}
```

### Animation Cycling
```javascript
playAnimation(images) {
    let i = this.currentImageIndex % images.length;
    this.img = this.IMAGES_CACHE[images[i]];
    this.currentImageIndex++;
}
```

### Singleton Pattern
```javascript
class AudioManager {
    static instance = null;
    static getInstance() {
        if (!AudioManager.instance) AudioManager.instance = new AudioManager();
        return AudioManager.instance;
    }
}
```

### Factory Pattern
```javascript
function createLevel1() {
    return { enemies: [...], coins: [...], bottles: [...] };
}
// On restart: level1 = createLevel1();  // Fresh objects!
```

### Camera System
```javascript
cameraX = character.xCoordinate - 100;
cameraX = Math.max(0, Math.min(cameraX, CAMERA_MAX_X));
ctx.translate(-cameraX, 0);  // Scroll world objects
```

### CSS Container Query Sizing
```css
#game-container {
    width: min(100vw, min(100vh, 750px) * 3 / 2);
    height: min(100vh, 750px, 100vw * 2 / 3);
    container-type: size;  /* enables cqh/cqw units */
}
/* All UI inside uses cqh/cqw, not vh/vw */
.mute-btn { position: absolute; width: clamp(30px, 8cqh, 50px); }
.landing-footer { height: calc(100cqh - 100cqw * 9 / 16); }
```

---

# Mini-Project Challenge: Add a Power-Up System

Now that you've learned all the patterns, test yourself by building something new! Add a **power-up system** to the game.

### Requirements

1. **Create a `PowerUp` class** extending `DrawableObject` with: position, type (`speed` or `shield`), and a spinning animation
2. **Add power-ups to `createLevel1()`** — 3 power-ups placed in the level
3. **Add collision detection** in `CollisionHandler` — character walks over power-up to collect it
4. **Implement effects:**
   - Speed boost: double `CHARACTER_SPEED` for 5 seconds
   - Shield: ignore next 1 hit (bypass `hit()` once)
5. **Add a visual indicator** — a StatusBar or text showing active power-up
6. **Add a sound effect** for pickup

### Checklist

```
□ PowerUp class with position and type
□ Spinning animation (2+ frames at 200ms)
□ Added to createLevel1() factory function
□ Collision detection in CollisionHandler
□ Speed boost doubles speed for 5 seconds
□ Shield absorbs one hit
□ Visual indicator on screen
□ Sound effect on pickup
□ Power-up removed from level after collection
□ No console.log, no magic numbers
```

### Stretch Goals (Optional)

- Add a third power-up type: `extraHealth` (heals 25 HP)
- Make power-ups flash/blink when about to expire (last 2 seconds)
- Add a glowing effect around the character during speed boost
- Stack multiple shields (counter instead of boolean)

---

# Congratulations!

You've completed the El Pollo Loco Game Development Guide! Now you know:

- How to **draw on HTML5 Canvas** with DrawableObject
- How **gravity and jumping** work with discrete physics simulation (GRAVITY=0.3 for floaty feel)
- How **sprite animation** cycles through frames with modulo (originally setInterval, refactored to delta-time)
- How **one-shot animations** play once and freeze (jump, endboss death)
- How **animation-physics sync** works (9 frames × 136ms = 1222ms physical jump)
- How the **idle timeout and snoring system** adds character personality
- How **AABB collision detection** works with offset hitboxes
- How **status bars** map percentages to pre-rendered images (green/blue/orange themes)
- How **enemy AI** uses patrol behavior and state machines
- How **chase/wander AI cycles** create unpredictable boss behavior
- How **clean state transitions** use previousState tracking and index resets
- How **stomp detection** uses previous-frame position tracking (with per-enemy SFX)
- How **thrown bottle physics** create parabolic arcs with a separate gravity constant
- How the **singleton pattern** manages game-wide audio
- How **game state management** handles start, play, pause, game over, and victory
- How **deathAnimationComplete** delays victory until the death animation finishes
- How **random game result screens** add variety to game over and victory
- How **fullscreen and pause** use browser APIs and game loop control
- How **WorldRenderer** delegates all drawing with proper z-ordering and debug visualization
- How **cameras, input, and mobile controls** create the player experience
- How **CSS container queries** (`cqh`/`cqw`) size UI relative to the game canvas
- How **background layers** tile across the level with alternating variants
- How **level data** is structured as a factory function for clean restarts
- How **BackgroundObject** tiles 4 layers at 719px intervals to prevent gaps
- How the **landing page** uses show/hide patterns and dialog close methods
- How **@font-face** loads local WOFF2 fonts with `font-display: swap`
- How **container queries** (`cqh`/`cqw`) replace viewport units for predictable sizing
- How `calc(100cqh - 100cqw * 9/16)` places UI in the black bar below the game image
- The **12 most common mistakes** and how to avoid them
- How to **spot bugs** in game code

### Your Next Steps

1. **Open each file** mentioned in this guide and read the actual code
2. **Complete all exercises** — writing code cements understanding
3. **Toggle debug mode** (`world.debugMode = true` in console) and watch hitboxes
4. **Follow the spaced repetition schedule** — review at increasing intervals
5. **Explain concepts to someone else** — teaching is the deepest form of learning
6. **Build the power-up system** — apply everything you learned

Keep building games and refer back to this guide whenever you need a refresher!

---

# THE HERO'S JOURNEY CHECKPOINTS

At each checkpoint, reflect on your transformation:

### Stage 1: The Ordinary World (Before Part 1)
```
"I see JavaScript code but I don't understand how a game loop
 works or why things move on screen."
→ That's okay. Every game developer started exactly here.
```

### Stage 2: The Call to Adventure (Part 1-2)
```
"I understand canvas drawing and physics! drawImage puts sprites
 on screen, and gravity is just velocity += constant each frame."
→ You're seeing the game engine for the first time.
```

### Stage 3: Meeting the Mentor (Part 3-4)
```
"Animations are flipbooks. Collisions are rectangle overlap tests.
 The math is simpler than I expected."
→ You're learning the patterns that power every 2D game.
```

### Stage 4: Crossing the Threshold (Part 5-6)
```
"Status bars map percentages to images. Enemies patrol with
 simple state machines. AI doesn't need to be complex."
→ You're combining concepts into larger systems.
```

### Stage 5: The Ordeal (Part 7-8)
```
"Stomp detection uses previous-frame tracking. The audio system
 is a singleton. There's so much happening each frame!"
→ The complexity is real, but so is your growth.
```

### Stage 6: The Reward (Part 9-10)
```
"Game state management, pause/resume, fullscreen, camera systems,
 and mobile input — these are what make a game feel polished."
→ You're thinking like a game developer.
```

### Stage 7: Mastery (Part 11-12)
```
"Delta-time accumulators replace setInterval. Background layers tile
 at 719px intervals. Container queries size UI to the game canvas.
 The landing page, fonts, and responsive design complete the package."
→ You understand not just the game engine, but the full production stack.
```

### Stage 8: The Return (After Completion)
```
"I can read any 2D game codebase with confidence.
 I can explain these patterns to others.
 I can build my own game from scratch."
→ You've completed the hero's journey!
```
