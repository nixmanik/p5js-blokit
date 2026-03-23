const JSON_PATH = 'game/scores.json';

function ScoreManager() {
    // JSON file MUST exist or program will crash
    this.data = loadJSON(JSON_PATH);
    this.order = function () {
        this.data.scores.sort(function (a, b) { return b.score - a.score });
    }
    this.addScore = function (player) {
        this.data.scores.push(new Score(player.name, player.score));
    }
    this.printScores = function () {
        let s = this.data.scores;
        this.order();
        push();
        translate(width / 2, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("HIGH SCORES", 0, 45);
        textSize(24);
        for (let i = 0; i < s.length; ++i) {
            let y = 25 * i + 95;
            textAlign(LEFT, CENTER);
            text(s[i].name, -250, y);
            textAlign(RIGHT, CENTER);
            text(i + 1, -270, y);
            text(s[i].score, 270, y);
        }
        pop();
    }
    this.saveScores = function () {
        if (DEFAULT_SCORE_JSON_BUTTON) {
            for (let i = 0; i < 10; i++) {
                this.data[i] = new Score('PLAYER', 1000 + i * 100);
            }
            let data = { "scores": this.data };
            saveJSON(data, 'scores.json');
        }
        else {
            this.order();
            saveJSON(this.data, 'scores.json');
        }
    }
}

function Score(name, score) {
    this.name = name;
    this.score = score;
}
