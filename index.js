// A DnD 5e Character Manager for your needs. Can be used as a framework and primarily used in the GUI for personal use.

const axios = require('axios');

const utils = require('./utils/utils');
const charManager = require('./utils/charManager');
const config = require('./config.json');

const races = require('./libs/races.json');

// Put your code in main, this is where the stuff happens!
function main() {
    utils.generateLibFromAPI(config.generationLinks.classes, './libs/classes.json', true);
    utils.generateLibFromAPI(config.generationLinks.races, './libs/races.json', true);
    utils.generateLibFromAPI(config.generationLinks.spells, './libs/spells.json', true);
    utils.generateLibFromAPI(config.generationLinks.traits, './libs/traits.json', true);
}

main()
