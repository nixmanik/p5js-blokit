class AssetManager {
    constructor() {
        this.assets = {
            images: {},
            audio: {}
        };
        this.path = "game/assets/";
    }

    loadManifest(manifest) {
        // Load Images
        if (manifest.images) {
            for (let [key, filename] of Object.entries(manifest.images)) {
                this.assets.images[key] = loadImage(this.path + filename);
            }
        }
        // Load Audio
        if (manifest.audio) {
            for (let [key, filename] of Object.entries(manifest.audio)) {
                this.assets.audio[key] = loadSound(this.path + filename);
            }
        }
    }
  

    getImage(key) {
        const img = this.assets.images[key];
        if (!img) {
            console.error(`AssetManager: Image key "${key}" not found.`);
        }
        return img;
    }

    // Retun audio by name in assets
    getAudio(key) {
        const sound = this.assets.audio[key];
        if (!sound) {
            console.error(`AssetManager: Audio key "${key}" not found.`);
        }
        return sound;
    }

    /**
     * Legacy support for .get() calls.
     * Automatically detects if the request is for an image or audio based on extension.
     */
    get(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const imageExts = ['png', 'jpg', 'jpeg', 'gif'];
        const audioExts = ['mp3', 'wav', 'ogg'];

        if (imageExts.includes(ext)) {
            const key = filename.split('.')[0];
            return this.getImage(key);
        } else if (audioExts.includes(ext)) {
            const key = filename.split('.')[0];
            return this.getAudio(key);
        }

        console.error(`AssetManager: Unsupported file extension in .get("${filename}")`);
        return null;
    }

    /**
     * Extracts a specific frame from a sprite sheet.
     * NOTE: To avoid memory leaks, call this during setup or initialization,
     * not inside the draw() loop.
     * @param {string} key - The manifest key for the sheet.
     * @param {number} col - Column index (0-based).
     * @param {number} row - Row index (0-based).
     * @param {number} w - Width of one frame.
     * @param {number} h - Height of one frame.
     */
    getSprite(key, col, row, w, h) {
        const sheet = this.getImage(key);
        if (!sheet) return null;
        return sheet.getImage(col * w, row * h, w, h);
    }
}

// Instantiate globally for use in other game files
const AM = new AssetManager();
