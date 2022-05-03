// Commonly used functions across sections

const axios = require('axios');  // Used for get/post requests. Check requestGet
const { lookup } = require('dns');
const fs = require('fs');  // Used for writing to files

class Utils {
    constructor(config) {
        // Gives the current app version. Used for updating things such as characters.
        this.appVersion = require('../package.json').version;

        this.status = undefined;
        this.reason = undefined;

        // Returns the response for a get response
        /**
         * @param {String} url - URL of the API
         * @returns {Object} Returns the data from an api
         */
        this.requestGet = async function (url, cb=(res) => { console.log(res); }) {
            await axios
                .get(url)
                .catch(e => {
                    console.error(e);
                })
                .then(res => {
                    cb(res);
                });
        };

        // Generates and returns a library from RESTful API
        /**
         * @param {String} url - The http url of the API
         * @param {function} cb - Callback with argument of the api object
         * @param {Boolean} read_to_console - If you want to output readings to console. Disabled by default
         */
        this.generateLibFromAPI = async function (url, cb=(lib) => {}, read_to_console=false) {
            this.requestGet(url, async (res) => {
                let sample = res.data
                if (sample === undefined) {
                    console.error('Link is undefined!');
                }
                let object = {};

                // Generate index (Library of indexes in chosen url_end)
                let index = [];
                for (let i = 0; i <= sample.count - 1; i++) {
                    index.push(sample.results[i].index);
                }

                // Generates the full library, and prints the progress if print_to_console is true
                for (let i in index) {
                    await this.requestGet(url + index[i], (res) => {
                        if (read_to_console) console.log(i + ' / ' + sample.count);
                        object[index[i]] = res.data;
                    });
                }

                cb(object);
            });
        };

        // Sends a status. Can be used for errors, debugging, and for specific cases. Sets an active status variable to this.
        // The status still needs to be detected by the app for use.
        // Status codes:
        // 1 - Relating to system functions that need ot be fixed through programming
        // 11 - System error
        // 2 - Relating to character creation and updating
        // 21 - Having to do with race loading
        // 211 - Race is not in lib, and can only load the index name.
        // 22 - Having to do with class loading
        // 221 - Class is not in lib, and can only load the index name.
        /**
         * @param {Number} num - Status number
         * @param {String} reason - The reason why the status was sent.
         * @param {Function} cb - A callback function that can be used for detection, errors, etc.
         */
        this.sendStatus = function (num, reason='', cb=undefined, read_to_console=false) {
            this.status = num;
            this.reason = reason;
            if (cb !== undefined && typeof cb == Function) {
                cb(this.reason, this.status);
            }
            if (read_to_console) console.log(this.status, ':', this.reason);
        };

        // Returns a string with the description of the status described above
        // Behold, spaghetti
        /**
         * @param {*} num The status code that the description will be given of.
         * @returns {String} Returns the description of the error code as a string
         */
        this.returnStatusInfo = function (num) {
            if (num) {
                let num_index =  String(num).split('');
                // Comments here are code indexes for reference
                // 1
                if (num_index[0] === '1') {
                    if (num_index[1] === undefined) {
                        return 'Relates to system functions that need to be fixed through the programming.';
                    // 11
                    } else if (num_index[1] === '1') {
                        return 'System error';
                    }
                // 2
                } else if (num_index[0] === '2') {
                    if (num_index[1] === undefined) {
                        return 'Relates to character creation and updating';
                    // 21
                    } else if (num_index[1] === '1') {
                        if (num_index[2] === undefined) {
                            return 'Having to do with race loading';
                        // 211
                        } else if (num_index[2] === '1') {
                            return 'Race is not in lib, and could only load an index. Check lib/custom_races or lib/races. This can also relate to a misspelling of the name.';
                        }
                    // 22
                    } else if (num_index[1] === '2') {
                        if (num_index[2] === undefined) {
                            return 'Having to do with class loading';
                        // 221
                        } else if (num_index[2] === '1') {
                            return 'Class is not in lib, and could only load an index. Check lib/custom_classes or lib/custom_classes. This could also relate to a misspelling of a name.';
                        }
                    }
                } else {
                    throw `Status code ` + num + `does not exist!`;
                }
            } else {
                console.log('Status not set.')
            }
        };
    }
}

module.exports = Utils;
