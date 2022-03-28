const utils = require('./utils');

const classes = require('../libs/classes.json');
const races = require('../libs/races.json');
const spells = require('../libs/spells.json');
const traits = require('../libs/traits.json');

module.exports = {
    // Returns a newly created character
    // Using the values and their descriptions, make a character. This is the base line for more to be done in the GUI app.
    /**
     * @param {String} name - Character's name
     * @param {Object} class_params - Array of objects like shown [{classe: Class, amount: Level}]. Supports multiclassing! Use classes from libs/classes.json for better use and traits.
     * @param {String} race - Character's race. Make sure one is selected from the libs/races.json file.
     * @param {Object} stats - The character's ability scores. To declare, use {stat: Number}. Ex: {strength: 10, ...}
     * @param {Object} data - Character's data (for GUI or etc.)
     * @returns {Object}
     */
    createCharacter: function (name, class_params, race, stats={}, data={}) {
        char = this.character;

        char.name = name;
        for (i in class_params) {
            char.levelUp(class_params[i].classe, class_params[i].amount);
        }
        char.race = race;

        // Add race bonuses

        char.data = data;

        char.update();

        return char;
    },

    // Returns a character object loaded from file. character might need to be updated.
    /**
     * @param {String} file_loc 
     * @param {Object} object
     */
    loadCharacter: function (file_loc, object) {

    },

    character: {
        // String that is the name of the character
        name: '',
        // App version used for updating characters to newer versions of the app
        app_version: utils.appVersion,
        // The race of the character. This adds even more features if you use a race from libs/races.json
        race: {
            // Name of the race
            name: '',
            // Traits of the race
            traits: {},
            // Speed of the character
            speed: 0
        },
        // Total level used for proficiency bonus and similar
        total_level: 0,
        // Proficiency bonus!
        proficiency_bonus: 2,
        // The health points and temporary health points of the character
        hp: 0,
        temp_hp: 0,
        // Hit dice, used for healing furing rests
        hit_dice: {
            d4: 0,
            d6: 0,
            d8: 0,
            d10: 0,
            d12: 0
        },
        // Here are the classes and their levels. Attributes of the classes will also be stored here. Classes is a library.
        classes: {
            // Each lib object: {name: ClassName, level: Level/Amount, }
            index: []
        },
        // Ability scores, what makes the game run!
        ability_scores: {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0
        },
        // Saving throw proficiencies. true if proficiency is added
        saving_throws: {
            str: false,
            dex: false,
            con: false,
            int: false,
            wis: false,
            cha: false
        },
        // 0 for no proficiency, 1 for proficiency, 2 for mastery. 
        // More for general BSing and overstacking.
        proficiencies: {
            acrobatics: ['dex', 0],
            animal_handling: ['wis', 0],
            arcana: ['int', 0],
            athletics: ['str', 0],
            deception: ['cha', 0],
            history: ['int', 0],
            insight: ['wis', 0],
            intimidation: ['cha', 0],
            investigation: ['int', 0],
            medicine: ['wis', 0],
            nature: ['int', 0],
            perception: ['wis', 0],
            performance: ['cha', 0],
            persuasion: ['cha', 0],
            religion: ['int', 0],
            sleight_of_hand: ['dex', 0],
            stealth: ['dex', 0],
            survival: ['wis', 0],
        },

        // The character's inventory. This counts as a library.
        inventory: {
            index: []
        },

        // data is used for storing values used by GUI elements/tools not used in the app. 
        // Although this may have basic character sheet stuff, it can store anything the GUI needs from the character.
        data: {},

        // Updates the information in the character object
        // Things updated include: 
        update: function () {

        },

        // Can't use class, so classe aha!
        // Level up levels up a class if it exists, and creates and sets the level to amount if it does not exist
        /**
         * @param {String} classe
         * @param {Number} amount
         */
        levelUp: function (classe, amount) {
            if (this.classes[classe] === undefined) {
                this.classes[classe].level = amount;
                this.classes.index.push(classe);
            } else {
                this.classes[classe].level += amount;
            }
            this.total_level += amount;
        }
    },

    // Updates a character to a newer version
    /**
     * @param {Object} character 
     */
    updateChar: function (character) {
        // Futureproofing in order to update out of date characters over to the newer system
    }
}