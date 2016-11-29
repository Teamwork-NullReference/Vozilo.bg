/* globals module */
'use strict';


module.exports = function(models) {
    let { preview } = models;

    return {
        getAllPreviews() {
            let promise = new Promise((resolve, reject) => {
                preview.find({}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        getFilteredPreviews(options) {
            let promise = new Promise((resolve, reject) => {
                preview.find({ options }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        getPreviewById(id) {
            let promise = new Promise((resolve, reject) => {
                preview.findOne({ id }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        }
    };
};