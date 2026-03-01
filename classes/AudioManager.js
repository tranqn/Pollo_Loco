// AudioManager - Singleton for managing all game audio

/**
 * @class AudioManager
 * @description Singleton that manages all game audio including background music, sound effects, and mute state persistence.
 */
class AudioManager {
    /** @type {AudioManager} */
    static instance = null;

    /** @type {Object<string, HTMLAudioElement>} */
    sounds = {};

    /** @type {HTMLAudioElement|null} */
    currentMusic = null;

    /** @type {boolean} */
    muted = false;

    /**
     * Get the singleton AudioManager instance
     * @returns {AudioManager}
     */
    static getInstance() {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    /**
     * Create the audio manager and load mute state from localStorage
     */
    constructor() {
        this.muted = localStorage.getItem('gameMuted') === 'true';
    }

    /**
     * Play background music in a loop
     * @param {string} path - Path to the music file
     */
    playMusic(path) {
        this.stopMusic();
        this.currentMusic = this.getSound(path);
        this.currentMusic.loop = true;
        this.currentMusic.volume = 0.3;
        if (!this.muted) {
            this.currentMusic.play().catch(() => {});
        }
    }

    /**
     * Stop the currently playing background music
     */
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
            this.currentMusic = null;
        }
    }

    /**
     * Play a sound effect once
     * @param {string} path - Path to the sound effect file
     */
    playSFX(path) {
        if (this.muted) return;
        const sound = this.getSound(path);
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    /**
     * Toggle mute state and persist to localStorage
     * @returns {boolean} New mute state
     */
    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('gameMuted', this.muted);

        if (this.muted) {
            this.muteAll();
        } else {
            this.unmuteAll();
        }
        return this.muted;
    }

    /**
     * Check if audio is currently muted
     * @returns {boolean}
     */
    isMuted() {
        return this.muted;
    }

    /**
     * Mute all currently playing sounds
     */
    muteAll() {
        if (this.currentMusic) {
            this.currentMusic.pause();
        }
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    /**
     * Unmute and resume background music
     */
    unmuteAll() {
        if (this.currentMusic) {
            this.currentMusic.play().catch(() => {});
        }
    }

    /**
     * Get or create an Audio element for a given path
     * @param {string} path - Path to the audio file
     * @returns {HTMLAudioElement}
     */
    getSound(path) {
        if (!this.sounds[path]) {
            this.sounds[path] = new Audio(path);
        }
        return this.sounds[path];
    }
}
