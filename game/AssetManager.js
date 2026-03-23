const PATH = "game/assets/";
const ATYPE = { IMAGE: 0, AUDIO: 1 };

function AssetManager() {
    this.assets = [];
    this.assetID = 0;

    // Used when initialising AM to help structure assets with an ID
    this.load = function (atype, filename) {
        let data;
        if (atype == ATYPE.IMAGE)
            data = loadImage(PATH + filename);
        else if (atype == ATYPE.AUDIO)
            data = loadSound(PATH + filename);
        this.assets[this.assetID] = new Asset(this.assetID, data, filename);
        this.assetID++;
    }

    // Function to assign images easily
    this.get = function (filename) {
        let getImg = this.assets.find((asset) => {
            return asset.name === filename;
        })
        return getImg.data;
    }

    // Function that runs in preload to collect all assets
    this.initialiseAssets = function () {
        AM.load(ATYPE.IMAGE, 'player.png');
        AM.load(ATYPE.IMAGE, 'title.png');
        AM.load(ATYPE.IMAGE, 'asd.png');
        AM.load(ATYPE.IMAGE, 'bullet.png');
        AM.load(ATYPE.IMAGE, 'base.png');
        AM.load(ATYPE.IMAGE, 'gameover.png');
        AM.load(ATYPE.IMAGE, 'loadoverlay.png');
        AM.load(ATYPE.AUDIO, 'bgm1.mp3');
        AM.load(ATYPE.AUDIO, 'burp.mp3');
        AM.load(ATYPE.AUDIO, 'boop.mp3');
        AM.load(ATYPE.AUDIO, 'eh.mp3');
    }
}

function Asset(assetID, data, filename) {
    this.id = assetID;
    this.name = filename;
    this.data = data;
}