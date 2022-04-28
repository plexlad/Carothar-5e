// A DnD 5e Character Manager for your needs. Can be used as a framework and primarily used in the GUI for personal use.

const axios = require('axios');
const fs = require('fs');

const Utils = new require('./utils/utils');
const CharManager = require('./utils/charManager');

const config = require('./config.json');

class Carothar {
    constructor(config) {
        this.utils = new Utils(config);
        this.charManager = new CharManager(config);
    }
}

// Exports a function that lets you configure Carothar. If a better method is found, updates will be in the future.
module.exports = {
    // Test/Quick Object. Default configs.
    Carothar: new Carothar(config),
    // Returns a full Carothar object with custom config
    /**
     * @param {string} config - Config object
     * @returns {Object} Full Carothar dev object
     */
    setupCarothar: function (config) {
        try {
            return new Carothar(config);
        } catch (e) {
            console.log('Your file does not exist, or check error below.')
            throw e;
        }
    }
};
