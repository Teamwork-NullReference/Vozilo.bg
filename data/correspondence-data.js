/* globals module require */
'use strict';

const dataUtils = require('./utils/data-utils');

module.exports = function({ models, validator }) {
    let {
        Correspondence,
        User
    } = models;

    const correspondenceValidator = require('./validation/correspondence-validator')(validator);

    function getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            User.find({ username }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    }

    return {
        getCorrespondenceById(correspondenceId) {
            return new Promise((resolve, reject) => {
                Correspondence.find({ '_id': correspondenceId }, (err, correspondence) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(correspondence);
                });
            });
        },
        getCorrespondenceByCarId(carId) {
            return new Promise((resolve, reject) => {
                Correspondence.find({ 'car.id': carId }, (err, correspondence) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(correspondence);
                });
            });
        },
        addCorrespondence(correspondenceInfo, sender, receiver) {
            let senderDbUser,
                receiverDbUser,
                correspondenceId;

            return correspondenceValidator.validateCorrespondence(correspondenceInfo)
                .then(() => {
                    return getUserByUsername(sender.username);
                })
                .then((users) => {
                    senderDbUser = users[0];
                    return getUserByUsername(receiver.username);
                })
                .then((users) => {
                    receiverDbUser = users[0];
                    let correspondence = new Correspondence(correspondenceInfo);
                    return dataUtils.save(correspondence);
                })
                .then((correspondence) => {
                    correspondenceId = correspondence._id;
                    senderDbUser.correspondences.push(correspondenceId);
                    return dataUtils.save(senderDbUser);
                })
                .then(() => {
                    receiverDbUser.correspondences.push(correspondenceId);
                    return dataUtils.save(receiverDbUser);
                });
        },
        addMessageToCorrespondence(correspondenceId, message) {
            correspondenceValidator.validateMessage()
                .then(() => {
                    return this.getCorrespondenceById(correspondenceId);
                })
                .then((correspondence) => {
                    correspondence.messages.push(message);

                    return dataUtils.save(correspondence);
                });
        }
    };
};