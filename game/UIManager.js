function UIManager() {
    this.load = function () {
        switch (SM.currentScene) {
            case SCENE.LOAD:
                this.loading();
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
    this.loading = function () {
        let toReady = createButton("Ready");
        toReady.size(100, 50);
        toReady.position(width / 2 - toReady.width / 2, height / 2 + 30);
        toReady.mousePressed(function () {
            AM.get('boop.mp3').play();
            SM.set(SCENE.MAIN);
            loop();
        });
        if (DEFAULT_SCORE_JSON_BUTTON) {
            let saveJSON = createButton("DL default scorefile");
            saveJSON.mousePressed(function () {
                SCM.saveScores();
            })
        }
    }

    this.main = function () {
        let toGame, toScore, fieldName, sliderDiff;

        toGame = createButton("New Game");
        toGame.position(width / 2 - toGame.width / 2, height - 100);
        toGame.mousePressed(function (name = fieldName.value()) {
            AM.get('boop.mp3').play();
            GM.difficulty = sliderDiff.value();
            console.log(GM.difficulty);
            if (name === 'Enter Name')
                name = 'PLAYER';
            GM.initialisePlayer(name);
            SM.set(SCENE.GAME);
            loop();
        });

        toScore = createButton("Leaderboard");
        toScore.position(width / 2 - toScore.width / 2, height - 70);
        toScore.mousePressed(function () {
            AM.get('boop.mp3').play();
            SM.set(SCENE.SCORE);
            loop();
        });

        fieldName = createInput("Enter Name");
        fieldName.position(width / 2 - fieldName.width / 2, height - 130);
        fieldName.mousePressed(function () {
            if (fieldName.value() === 'Enter Name') {
                fieldName.value('');
            }
        });

        sliderDiff = createSlider(DIFFICULTY.EASY, DIFFICULTY.HARD, 0, 1);
        sliderDiff.size(40);
        sliderDiff.position(width / 2 - 20, height - 40);
        sliderDiff.mousePressed(function () {
            if (sliderDiff.value() == 1)
                sliderDiff.value(0);
            else
                sliderDiff.value(1);
        })
        push();
        textAlign(CENTER, CENTER);
        text("flick switch for HARD mode -->", width / 2 - 100, height - 30);
        pop();

    }

    this.game = function () {
        let score = GM.game.player.score;
        let health = GM.game.base.health;

        switch (GM.game.state) {
            case GAMESTATE.INGAME:
                let toggleAim;
                toggleAim = createButton("Toggle Aim: Mouse/Auto");
                toggleAim.size(110, 40);
                toggleAim.position(width - 25 - toggleAim.width, 20);
                toggleAim.mousePressed(() => GM.game.SC.toggleAim());
                push();
                rect(5, 5, 200, 80, 5);
                textSize(20);
                textAlign(LEFT);
                text(`SCORE: ${score}`, 10, 20, 200, 20);
                text(`BASE HEALTH: ${health}`, 10, 50, 200, 20);
                pop();
                break;
            case GAMESTATE.POSTGAME:
                let toMenu, toRetry;
                toMenu = createButton("Back To Main");
                toMenu.position(width / 6 - toMenu.width, height / 2);
                toMenu.size(150, 100);
                toMenu.mousePressed(function () {
                    AM.get('boop.mp3').play();
                    SM.set(SCENE.MAIN);
                    loop();
                })
                toRetry = createButton("Retry");
                toRetry.position(width / 6 * 5 - toRetry.width, height / 2);
                toRetry.size(150, 100);
                toRetry.mousePressed(function () {
                    AM.get('boop.mp3').play();
                    GM.newGame();
                    loop();
                })
                break;
        }
    }

    this.score = function () {
        let toMain, saveJSON;
        toMain = createButton("Back To Main");
        toMain.size(150, 100);
        toMain.position(300 - toMain.width, height - 10 - toMain.height);
        toMain.mousePressed(function () {
            AM.get('boop.mp3').play();
            SM.set(SCENE.MAIN);
            loop();
        })
        saveJSON = createButton("Save scorefile");
        saveJSON.size(150, 100);
        saveJSON.position(300 - saveJSON.width, height - 120 - saveJSON.height);
        saveJSON.mousePressed(function () {
            AM.get('boop.mp3').play();
            SCM.saveScores();
        })
    }
}