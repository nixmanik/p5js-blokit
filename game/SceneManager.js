const SCENE = { LOAD: 0, MAIN: 1, GAME: 2, SCORE: 3 };
const INIT_SCENE = SCENE.LOAD;

function SceneManager() {
    this.currentScene;
    this.set = function (scene) {
        this.currentScene = scene;
    }
    this.start = function () {
        switch (this.currentScene) {
            case SCENE.LOAD:
                this.load();
                break;
            case SCENE.MAIN:
                this.main();
                break;
            case SCENE.GAME:
                this.game();
                break;
            case SCENE.SCORE:
                this.score();
                break;
        }
    }
    this.main = function () {
        background(121, 229, 237);
        let bgm = AM.get('bgm1.mp3');
        if (bgm.isLooping() == false)
            bgm.loop();
        image(AM.get('title.png'), 0, 0);
        UIM.load(SCENE.MAIN);
        noLoop();
    }
    this.load = function () {
        let prompt = 'LOADING';
        background('teal');
        image(AM.get('loadoverlay.png'), 0, 0);
        push();
        translate(width / 2, height / 2);
        textAlign(CENTER, CENTER);
        textSize(42);
        text(prompt, 0, 0);
        noFill();
        pop();
        UIM.load(SCENE.LOAD);
        noLoop();
    }
    this.game = function () {
        background(121, 229, 160);
        if (GM.gameRunning == false) {
            GM.newGame();
        }
        UIM.load(SCENE.GAME);
        GM.runGame();
        drawSprites();
    }
    this.score = function () {
        background(121, 229, 160);
        rectMode(CENTER);
        rect(width / 2, height / 2, 600, 700, 5);
        SCM.printScores();
        UIM.load(SCENE.SCORE);
        noLoop();
    }
}

