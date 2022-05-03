const fs = require('fs');
let Utils = require('./utils/utils');

const config = require('./config.json');
const utils = new Utils(config);

// Generates the default libraries from api links

utils.generateLibFromAPI(config.generationLinks.classes[0], (lib) => {
    fs.writeFile(config.filesToLoad.classes[0], JSON.stringify(lib, null, 4), e => {
        if (e) {
            throw e;
        }
        console.log('Classes generated!');
    });
}, true);

utils.generateLibFromAPI(config.generationLinks.races[0], (lib) => {
    fs.writeFile(config.filesToLoad.races[0], JSON.stringify(lib, null, 4), e => {
        if (e) {
            throw e;
        }
        console.log('Races generated!');
    });
}, true);

utils.generateLibFromAPI(config.generationLinks.traits[0], (lib) => {
    fs.writeFile(config.filesToLoad.traits[0], JSON.stringify(lib, null, 4), e => {
        if (e) {
            throw e;
        }
        console.log('Traits generated!');
    });
}, true);

utils.generateLibFromAPI(config.generationLinks.spells[0], (lib) => {
    fs.writeFile(config.filesToLoad.spells[0], JSON.stringify(lib, null, 4), e => {
        if (e) {
            throw e;
        }
        console.log('Spells generated!');
    });
}, true);
