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
                // We create the button. Because main.js now clears the DOM every frame,
                // this button will be recreated, but the browser won't stack them.
                let toggleAim = createButton("Toggle Aim: Mouse/Auto");
                toggleAim.size(110, 40);
                toggleAim.position(width - 25 - toggleAim.width, 20);
                toggleAim.mousePressed(() => GM.game.SC.toggleAim());

                // DRAW UI ON CANVAS (Fixed Firefox bug)
                push();
                fill(0, 0, 0, 150); // Semi-transparent black background
                stroke(255);        // White outline
                strokeWeight(2);
                rect(5, 5, 200, 80, 5);

                fill(255);          // White text
                noStroke();
                textSize(22);
                textAlign(LEFT, CENTER);

                // Centered vertically within the rect (rect height 80, text height ~20)
                text(`SCORE: ${score}`, 20, 25);
                text(`BASE HEALTH: ${health}`, 20, 55);
                pop();
                break;
            case GAMESTATE.POSTGAME:
                let toMenu = createButton("Back To Main");
                toMenu.position(width / 6 - toMenu.width, height / 2);
                toMenu.size(150, 100);
                toMenu.mousePressed(function () {
                    AM.getAudio('boop').play();
                    SM.set(SCENE.MAIN);
                    loop();
                })
                let toRetry = createButton("Retry");
                toRetry.position(width / 6 * 5 - toRetry.width, height / 2);
                toRetry.size(150, 100);
                toRetry.mousePressed(function () {
                    AM.getAudio('boop').play();
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
