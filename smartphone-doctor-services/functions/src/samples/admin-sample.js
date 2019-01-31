/**
 * @file admin-sample.js
 *
 * Contains a sample function, which is used to test the
 * Firebase Admin SDK.
 * 
 * @author Bilger Yahov
 * @version 2.0.1
 * @copyright © 2018 - 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

const responseBuilder = require("../common-js/response-builder");
const messageCodes = require("../common-js/message-codes");
const statusCodes = require("../common-js/status-codes");
const globalConf = require("../../global_conf");

const admin = require('firebase-admin');

module.exports = (request) => {
    return new Promise((resolve, reject) => {
        admin.auth().getUserByEmail(globalConf.TEST_USER)
            .then((userRecord) => {
                console.log("#admin-sample.js: Successfully fetched user data: " + JSON.stringify(userRecord.uid.substr(1, 3)));
                return resolve(new responseBuilder.Response("Firebase Admin SDK is up!", messageCodes.samples.success, statusCodes.OK));
            })
            .catch((error) => {
                console.error("#admin-sample.js: Error while fetching user data: " + JSON.stringify(error));
                return reject(new responseBuilder.Response("Firebase Admin SDK is down!", messageCodes.samples.failure,
                    statusCodes.InternalServerError));
            });
    });
};