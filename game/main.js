const CANVAS_X = 1280, CANVAS_Y = 720;
const MARGIN = 25;

// Set to TRUE to make a button in the loading scene that can create a dummy score JSON if needed
const DEFAULT_SCORE_JSON_BUTTON = false;
// Set this to TRUE to show collider gizmos during play
const DEBUG_COL = false;

// Varaibles to hold Manager objects
let SM, UIM, GM, SCM;
function preload() {
    SM = new SceneManager();
    UIM = new UIManager();
    GM = new GameManager();
    SCM = new ScoreManager();
    AM.loadManifest(ASSET_MANIFEST);
}

function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS_X, CANVAS_Y);
    SM.set(INIT_SCENE);
    noLoop();
}

// All Scene drawing is handing inside SM
function draw() {
    removeElements();
    SM.start();
}
