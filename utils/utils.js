// Commonly used functions across sections

const axios = require('axios');  // Used for get/post requests. Check requestGet
const fs = require('fs');  // Used for writing to files

const config = require('../config.json');  // Config for basic setup

module.exports = {
    // Gives the current app version. Used for updating things such as characters.
    appVersion: 0.1,

    // Returns the response for a get response
    /**
     * @param {String} url - URL of the API
     * @returns {Object} Returns the data from an api
     */
    requestGet: async function (url) {
        let res = await axios
            .get(url)
            .catch(e => {
                console.error(e);
            });
        return res;
    },

    // Generates a spell certain libray from a RESTful API. If you want to make one, look at the lib files
    /**
     * @param {String} url - The http url of the API
     * @param {String} file_loc - The file_location you want to write to
     * @param {Boolean} read_to_console - If you want to output readings to console. Disabled by default
     */
    generateLibFromAPI: async function (url, file_loc, read_to_console=false) {
        let sample = await this.requestGet(url);
        if (sample === undefined) {
            console.log('Link is undefined!');
        }
        let object = {};

        // Generate index (Library of indexes in chosen url_end)
        let index = [];
        for (let i = 0; i <= sample.count - 1; i++) {
            index.push(sample.results[i].index);
        }

        for (let i in index) {
            object[index[i]] = await this.requestGet(url + index[i]);
            if (read_to_console) console.log(i + ' / ' + sample.count);
        }

        let data = JSON.stringify(object, null, 4);
        fs.writeFile(file_loc, data, e => {
            if (e) {
                throw e;
            }

            if (read_to_console) console.log('Completed! Data written.');
        });
    },

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
    sendStatus: function (num, cb=undefined, reason='') {
        global._status = num;
        global._reason = reason;
        if (cb !== undefined) {
            cb();
        }
    },

    // Returns a string with the description of the status described above
    // Behold, spaghetti
    /**
     * @param {*} num The status code that the description will be given of.
     * @returns {String} Returns the description of the error code as a string
     */
    returnStatusInfo: function (num) {
        let num_index =  String(num).split('');
        if (num_index[0] === '1') {
            if (num_index[1] === undefined) {
                return 'Relates to system functions that need to be fixed through the programming.';
            } else if (num_index[1] === '1') {
                return 'System error';
            }
        } else if (num_index[0] === '2') {
            if (num_index[1] === undefined) {
                return 'Relates to character creation and updating';
            } else if (num_index[1] === '1') {
                if (num_index[2] === undefined) {
                    return 'Having to do with race loading';
                } else if (num_index[2] === '1') {
                    return 'Race is not in lib, and can only load the index name';
                }
            } else if (num_index[1] === '2') {
                if (num_index[2] === undefined) {
                    return 'Having to do with class loading';
                } else if (num_index[2] === '1') {
                    return 'Class is not in lib, and can only load the index name';
                }
            }
        } else {
            throw `Status code ${num} does not exist!`;
        }
    }
}
