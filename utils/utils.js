// Commonly used functions across sections

const axios = require('axios');
const fs = require('fs');

const config = require('../config.json');

module.exports = {
    example: function () {
        console.log('Hello, World!');
    },

    // Gives the current app version. Used for updating things such as characters.
    appVersion: 0.1,

    /**
     * @param {String} url 
     * @returns {Object}
     */
    requestGet: async function (url) {
        let res = await axios
            .get(url)
            .catch(e => {
                console.error(e);
            });
        return res.data;
    },

    /**
     * @param {String} url
     * @param {String} file_loc
     * @param {Boolean} read_to_console
     */
    generateLibFromAPI: async function (url, file_loc, read_to_console=false) {
        let sample = await this.requestGet(url);
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

        object.index = index;
        let data = JSON.stringify(object, null, 4);
        fs.writeFile(file_loc, data, err => {
            if (err) {
                throw err;
            }

            if (read_to_console) console.log('Completed! Data written.');
        });
    },
}
