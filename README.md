# Blokit

The game's legacy build can be played in browser here:

[Blokit](https://bullethell.nixnerver.cc/)

(NOTE: the audio isn't well balanced in this build so the BGM could be loud, lower your speaker volume)

Blokit is a browser-based bullet-hell survival game I developed years ago in university using [p5.js](https://p5js.org/).

The player protects a central base from incoming projectiles by intercepting and deflecting them back towards incoming threats. Build up score by destroying as many projectiles as you can!

## About the Project

This repository contains the original p5.js implementation of Blokit.

Development is split across two efforts:

- **Legacy version:** The original game, preserved on the `legacy` branch and maintained for the playable build linked above.
- **Modernisation:** Refactoring and bug fixing the original implementation, primarily as an opportunity to practise software development and version control workflows. Eventually I'll get to a complete 1.0 legacy version, but I'm doing this without AI for the most part and I'm in no rush.

I'm remaking this game concept as a fully fleshed out indie release expected to be ready for release in 2027. That version will not be part of this repository.

## Gameplay

Blokit is a survival game centred around protecting a base from incoming projectiles.

- Move around the play area to intercept incoming missiles.
- Deflect projectiles by colliding with them.
- Deflected projectiles become player-controlled and can damage other incoming missiles.
- Switch between automatic and mouse-directed aiming.
- Survive as long as possible while accumulating points.

The game includes two difficulty settings, with difficulty increasing as the player's score rises.

## Controls

| Input | Action |
|---|---|
| W | Move up |
| A | Move left |
| S | Move down |
| D | Move right |
| Toggle Aim button | Switch between automatic and mouse-directed aiming |

## Getting Started

Blokit is a browser-based application and does not require Node.js or a package manager to run.

### Run locally

You need a local web server to serve the game files.

With Python installed, run the following from the repository root:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

### Run with Docker

The repository includes a Dockerfile and Docker Compose configuration using Nginx.

Build and start the container:

```bash
docker compose up -d --build
```

To stop the container:

```bash
docker compose down
```

## Project Structure

```text
.
├── _src/                  # p5.js and supporting libraries
│   ├── addons/             # p5.js addons
│   └── lib/                # Additional libraries
├── game/
│   ├── assets/             # Game images and audio
│   ├── AssetManager.js      # Asset loading and management
│   ├── GameManager.js       # Core gameplay and game state
│   ├── SceneManager.js      # Scene transitions
│   ├── ScoreManager.js      # Score and leaderboard handling
│   ├── UIManager.js         # User interface
│   └── main.js              # Game entry point
├── Dockerfile
├── docker-compose.yml
├── generate_assets.py
└── index.html
```

## Technologies

- JavaScript
- [p5.js](https://p5js.org/)
- [p5.play](https://molleindustria.github.io/p5.play/)
- p5.sound
- Docker
- Nginx

## Development Status

Blokit is a legacy project undergoing gradual modernisation.

The original implementation remains available for reference and deployment. The modernisation work focuses on improving the existing codebase rather than introducing the planned Godot reboot into this repository.

## Credits and Licensing

Blokit's original artwork and sound effects were primarily created by me, and a few were open-source free use assets.

The project also bundles third-party libraries, which remain subject to their respective licences.

