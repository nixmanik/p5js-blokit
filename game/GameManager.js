const DIFFICULTY = { EASY: 0, HARD: 1 };
const GAMESTATE = { PREGAME: 0, INGAME: 1, POSTGAME: 2 };

function GameManager() {
    this.player;
    this.difficulty;
    this.game;
    this.gameRunning = false;
    this.initialisePlayer = function (name) {
        this.player = new Player(name);
    }
    this.newGame = function (playerName = "Player") {
        allSprites.removeSprites();
        this.initialisePlayer(playerName);
        this.gameRunning = true;
        this.game = new Game(this.player, this.difficulty);
    }
    this.runGame = function () {
        this.game.run();
    }
}

// Control the flow of the gameplay here
function Game(player, difficulty) {
    this.state = GAMESTATE.PREGAME;
    this.difficulty = difficulty;
    this.player = player;
    this.base = new Base();
    this.SC = new SpriteController(this.player, this.base, this.difficulty);
    this.run = function () {
        if (this.state == GAMESTATE.PREGAME) {
            this.initialise();
        }
        else if (this.state == GAMESTATE.INGAME) {
            this.SC.update();
            this.base.update();
        }
        else if (this.state == GAMESTATE.POSTGAME) {
            this.gameOver();
        }
    }
    this.initialise = function () {
        this.SC.initialise();
        this.state = GAMESTATE.INGAME;
    }
    this.gameOver = function () {
        GM.gameRunning = false;
        this.SC.gameOver();
        SCM.addScore(this.player);
        noLoop();
    }
}

function Player(name) {
    this.name = name;
    this.score = 0;
    this.adjustScore = function (score) {
        this.score += score;
    }
    this.getScore = function () {
        return this.score;
    }
}

const BASEHEALTH = 5;
function Base() {
    this.health = BASEHEALTH;
    this.adjustHealth = function (value) {
        this.health += (value);
        console.log(`Health = ${this.health}`);
    }
    this.update = function () {
        if (this.health == 0) {
            GM.game.state = GAMESTATE.POSTGAME;
        }
    }

}

const AIM_MODE = { MOUSE: 0, CALC: 1 };
function SpriteController(player, base, difficulty) {
    this.player = player;
    this.base = base;
    let aimMode = AIM_MODE.CALC;
    let missileLimit;
    let rollingScore = 5000;
    // p = player, b = base, m = missile, G = group, go = gameover
    let p;
    let b;
    let m;
    let mSpeedMulti = 1;
    let mG = new Group();
    let sG = new Group();
    let go;
    this.spawnPlayer = function () {
        p = createSprite(width / 2, height * .75, 64, 64);
        p.addImage(AM.getImage('player'));
        p.setCollider("circle", 0, 0, 18);
        drawSprite(p);
    }
    this.spawnBase = function () {
        b = createSprite(width / 2, height / 2, 128, 128);
        b.addImage(AM.getImage('base'));
        b.setCollider("circle");
        b.immovable = true;
        drawSprite(b);
    }
    this.spawnMissile = function () {
        const XSIDE = [0, width];
        const YSIDE = [0, height];
        if (random(0, 2) > 1)
            m = createSprite(random(XSIDE), random(10, height * .9), 32, 32);
        else
            m = createSprite(random(10, width * .9), random(YSIDE), 32, 32);
        m.addImage(AM.getImage('bullet'));
        m.attractionPoint(2.5, width / 2, height / 2);
        m.setCollider("circle", 0, 0, 8);
        m.setSpeed(random(.5, 1) * mSpeedMulti);
        m.rotateToDirection = true;
        m.addToGroup(mG);
    }
    this.playerControl = function () {
        const PLAYERSPEED = 6;
        if (keyDown('w')) {
            p.position.y -= PLAYERSPEED;
        }
        if (keyDown('a')) {
            p.position.x -= PLAYERSPEED;
        }
        if (keyDown('s')) {
            p.position.y += PLAYERSPEED;
        }
        if (keyDown('d')) {
            p.position.x += PLAYERSPEED;
        }
    }
    this.playerCollides = function () {
        // Keep player in bounds
        if (p.position.x < -0) p.position.x = 0;
        if (p.position.x > width) p.position.x = width;
        if (p.position.y < -0) p.position.y = 0;
        if (p.position.y > height) p.position.y = height;
        // Stop player colliding with base
        p.collide(b);
        // Player shoots bullets that it moves into
        if (p.displace(mG, this.shootBack)) {
            AM.getAudio('burp').play();
            this.player.adjustScore(100);
        }
        // p.overlap(items, collect);
    }
    this.missileCollides = function () {
        // Despawn missiles offscreen
        for (let i = 0; i < mG.length; ++i) {
            if (mG[i].position.x < 0 - MARGIN
                || mG[i].position.x > width + MARGIN
                || mG[i].position.y < 0 - MARGIN
                || mG[i].position.y > height + MARGIN) {
                mG[i].remove();
                console.log(`Sprite removed: ${mG[i].removed}`);
            }
        }
        if (mG.collide(b, this.baseHit))
            this.base.adjustHealth(-1);
        // Bullets shoot bullets that they collide into
        if (sG.collide(mG, this.shootBack)) {
            AM.getAudio('burp').play();
            this.player.adjustScore(200);
        }
    }
    this.baseHit = function (missile, base) {
        let startX = b.position.x, startY = b.position.y;
        AM.getAudio('eh').play();
        missile.remove();
        for (let i = 0; i < 3; ++i) {
            b.position.x -= random(-2, 2);
            b.position.y -= random(-2, 2);
        }
        b.position.x = startX;
        b.position.y = startY;
    }
    this.shootBack = function (collider, collided) {
        const SHOOTBACKSPEED = 15;
        if (aimMode == AIM_MODE.CALC) {
            let randomMissile = (random(mG));
            collided.attractionPoint(60, randomMissile.position.x, randomMissile.position.y);
            collided.setSpeed(SHOOTBACKSPEED);
        }
        else if (aimMode == AIM_MODE.MOUSE) {
            collided.attractionPoint(60, mouseX, mouseY);
            collided.setSpeed(SHOOTBACKSPEED);
        }
        if (mG.contains(collided)) {
            mG.remove(collided);
            collided.addToGroup(sG);
        }
    }
    this.collisions = function () {
        this.playerCollides();
        this.missileCollides();
    }
    this.initDifficulty = function () {
        if (difficulty == DIFFICULTY.HARD)
            missileLimit = 16;
        else if (difficulty == DIFFICULTY.EASY)
            missileLimit = 8;
    }
    this.gameOver = function () {
        go = createSprite(width / 2, height / 2, 640, 355);
        go.addImage(AM.getImage('gameover'));
        go.immovable = true;
        drawSprite(go);
    }
    this.toggleAim = function () {
        if (aimMode == AIM_MODE.MOUSE)
            aimMode = AIM_MODE.CALC;
        else if (aimMode == AIM_MODE.CALC)
            aimMode = AIM_MODE.MOUSE;
        console.log(`Aimmode is ${aimMode}: 0 is mouse, 1 is calc`);
    }

    this.difficultyUpdate = function () {
        if (this.player.getScore() > rollingScore) {
            if (random(0, 2) > 1) {
                ++missileLimit;
                console.log("More missiles");
            }
            else {
                mSpeedMulti += .5;
                console.log("faster missiles");
            }
            if (difficulty == DIFFICULTY.HARD) {
                mSpeedMulti += .3;
                ++missileLimit;
            }
            rollingScore += rollingScore;
        }
    }
    this.update = function () {
        if (DEBUG_COL)
            this.debugMode();
        this.playerControl();
        this.collisions();
        if (mG.length < missileLimit) {
            this.spawnMissile();
        }
        this.difficultyUpdate();
    }
    this.debugMode = function () {
        p.debug = true;
        b.debug = true;
        for (let i = 0; i < mG.length; ++i) {
            mG[i].debug = true;
        }
    }
    this.initialise = function () {
        this.spawnPlayer();
        this.spawnBase();
        this.initDifficulty();
    }
}
