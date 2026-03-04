# El Pollo Loco

A 2D jump-and-run browser game built with vanilla JavaScript and HTML5 Canvas. Play as **Pepe**, a brave adventurer who must fight through hordes of chickens and defeat the mighty endboss to win.

## Features

- Smooth character animations (idle, long idle, walk, jump, hurt, death)
- Multiple enemy types: Chickens, Small Chickens, and an Endboss
- Collectible coins and throwable bottles
- Background music and sound effects with mute toggle
- Fullscreen support
- Responsive design with mobile touch controls
- Game over and victory screens with restart (no page reload)
- Parallax scrolling backgrounds

## Tech Stack

- Vanilla JavaScript (ES6 classes)
- HTML5 Canvas (720x480)
- CSS3
- No frameworks or build tools

## Getting Started

Open `index.html` directly in a browser or use a local dev server:

```bash
npx live-server
# or
python3 -m http.server 8000
```

## Controls

| Action       | Key            |
| ------------ | -------------- |
| Move Left    | `LEFT ARROW`   |
| Move Right   | `RIGHT ARROW`  |
| Jump         | `SPACE`        |
| Throw Bottle | `D`            |

Touch controls are available on mobile devices in landscape mode.

## Project Structure

```
Pollo_Loco/
├── index.html          # Entry point
├── style.css           # Styles
├── classes/            # Game classes (one per file)
├── scripts/            # Constants and game initialization
├── levels/             # Level configurations
├── img/                # Sprites, backgrounds, UI assets
├── audio/              # Sound effects and music
└── fonts/              # Custom fonts
```

## License

This project was created as a learning exercise.
