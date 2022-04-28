// Character manager library
// Everything that has to do with characters
const fs = require('fs');
const axios = require('axios');

const { resolve } = require('path');

const utils = require('./utils');

class CharManager {
    constructor(config) {
        let i;  // Temp variable for for statements

        // Sets default values for libs
        this.classes;
        this.races;
        this.spells;
        this.traits;

        // Generates libs from config file
        for (i in config.filesToLoad.classes) {
            this.classes = {...this.classes, ...require('..' + config.filesToLoad.classes[i]) } 
        }

        for (i in config.filesToLoad.races) {
            this.classes = {...this.classes, ...require('..' + config.filesToLoad.classes[i]) }
        }

        for (i in config.filesToLoad.spells) { 
            this.classes = {...this.classes, ...require('..' + config.filesToLoad.classes[i]) } 
        }
        for (i in config.filesToLoad.traits) { 
            this.classes = {...this.classes, ...require('..' + config.filesToLoad.classes[i]) } 
        }

        // A function that returns a created character. Simplifies the process, but the base layout for a character can be found below 
        /**
         * @param {String} name - Name of the character
         * @param {Array} class_params - Class and levels of the character. In format [{name: ClassName, level: classLevel}, ...]
         * @param {String} race - Race of the character. If it is in a lib, it will update that information.
         * @param {Object} ability_scores - The ability scores of the character. Input an object with any of str, dex, con, int, wis, cha. Ex: {str: Strength, cha: Charisma, ...}
         * @param {Object} proficiencies - The ability proficiencies of the character. Input an object with acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, religion, sleight_of_hand, stealth, survival. Put a 1 or true for proficiency, 2 for mastery.
         * @param {Object} data - Data that is meant for external use. Great for GUIs.
         * @param {Function} status_cb - Callback for status code functions. Can be used with the front end for error detection and debugging
         * @returns {Object} A character object that can be interacted with. Check docs for more.
         */
        this.createCharacter = function (name, class_params, race, ability_scores={}, proficiencies={}, data={}, status_cb=() => {}) {
            
            let char = this.character;

            let temp_ability_scores = Object.keys(char.ability_scores);

            // Updates ability scores
            if (Object.entries(ability_scores).length > 0) { // If statement checks if an object is empty
                for (i in temp_ability_scores) {
                    if (ability_scores[temp_ability_scores[i]] !== undefined) {
                        char.ability_scores[temp_ability_scores[i]] = ability_scores[temp_ability_scores[i]];
                    }
                }
            }

            // Creates a basic list of proficiencies
            let temp_proficiencies = Object.keys(char.proficiencies);

            // Updates proficiencies
            if (Object.entries(proficiencies).length > 0) {
                for (i in temp_proficiencies) {
                    if (proficiencies[temp_proficiencies[i]] !== undefined) {
                        char.proficiencies[temp_proficiencies[i]][1] = proficiencies[temp_proficiencies[i]];
                    }
                }
            }

            // Sets character name
            char.name = name;
            
            // Sets character race, also update race details, sends a status code in case race name does not exist with callback
            if (Object.keys(races).includes(race)) {
                char.race = this.races[race];
            } else {
                char.race.index = race;
                utils.sendStatus(211, 'Race name does not exist in character creation.', status_cb());
            }

            // Creates details for class, sends a status code in case class name does not exist with callback
            for (i in class_params) {
                if (Object.keys(classes).includes(class_params[i].name)) {
                    char.classes[class_params[i].name] = { ...char.classes[class_params[i].name], level: class_params[i].level, ...this.classes[class_params[i].name]};
                } else {
                    char.classes[class_params[i].name] = { level: class_params[i].level, index: class_params[i].name }
                    utils.sendStatus(221, 'Class name does not exist in character creation.', status_cb());
                }
            }

            // Sets character data (for GUI/etc.)
            char.data = data;

            char.update();

            return char;
        },

        // Returns a character object loaded from file. character might need to be updated.
        /**
         * @param {String} file_loc - Location of file to save to
         * @returns {Object} - Returns a character object that is loaded from the file
         */
        this.loadCharacter = function (file_loc) {
            let char = require(file_loc);
            char = { ...char, update: this.character.update, levelUp: this.character.levelUp };
            return char;
        },

        /**
         * @param {String} file_loc - Location of file to save to 
         * @param {Object} char 
         */
        this.exportCharacter = function (file_loc, char) {
            fs.writeFile(
                file_loc, 
                JSON.stringify(char, null, 4), 
                e => {
                    if (e) { 
                        throw e;
                    }
                });
        },

        this.character = {
            // String that is the name of the character
            name: '',
            // App version used for updating characters to newer versions of the app
            app_version: utils.appVersion,
            // The race of the character. This adds even more features if you use a race from libs/races.json
            race: {
                // Traits of the race. Holds race data from lib file.
                // Attributes that can be used from base lib files include: index, name, speed, ability_bonuses, 
                // alignment, age, size, size_description, starting_proficiencies, languages, language_dec, traits
                // subraces, url. Look at the libs/races.json or libs/custom_races.json for examples.
    
            // Speed of the character
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
            // Here are the classes and their levels. Attributes of the classes will also be stored here.
            classes: {

            },
            // Ability scores, what makes the game run!
            ability_scores: {
                str: 10,
                dex: 10,
                con: 10,
                int: 10,
                wis: 10,
                cha: 10
            },
            // Saving throw proficiencies. true if proficiency is added
            saving_throws: {
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                cha: 0
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

            inventory: {

            },

            feats: {

            },

            // data is used for storing values used by GUI elements/tools not used in the app. 
            // Although this may have basic character sheet stuff, it can store anything the GUI needs from the character.
            data: {},

            // Updates the information in the character object. More of a refresher.
            // Used for when things like level, classes, adding feats etc.
            // Things updated include: total_level, class details for level
            update: function () {
                // Updates total level
                for (i in Object.keys(this.classes)) {
                    this.total_level += this.classes[Object.keys(this.classes)[i]].level;
                }
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
                this.update();
            }
        },

        // Updates a character to a newer version
        /**
         * @param {Object} character 
         */
        this.updateChar = function (character) {
            // Futureproofing in order to update out of date characters over to the newer system
        }
    };
}

module.exports = CharManager;
