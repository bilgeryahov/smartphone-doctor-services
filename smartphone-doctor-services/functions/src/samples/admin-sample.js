/**
 * @file admin-sample.js
 *
 * Contains a sample function, which is used to test the
 * Firebase Admin SDK.
 * 
 * @author Bilger Yahov
 * @version 2.0.0
 * @copyright © 2018 - 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

const responseBuilder = require("../common-js/response-builder");
const messageCodes = require("../common-js/message-codes");
const statusCodes = require("../common-js/status-codes");

const admin = require('firebase-admin');

/**
 * This is a test user, which is disabled on the Firebase console.
 * Will be used only to verify the set-up of Firebase Admin SDK.
 */
const TEST_USER = "test@test.test";

module.exports = (request) => {
    return new Promise((resolve, reject) => {
        admin.auth().getUserByEmail(TEST_USER)
            .then(function (userRecord) {
                console.log("#admin-sample.js: Successfully fetched user data: " + JSON.stringify(userRecord));
                return resolve(new responseBuilder.Response("Firebase Admin SDK is up!", messageCodes.samples.success, statusCodes.OK));
            })
            .catch(function (error) {
                console.error("#admin-sample.js: Error while fetching user data: " + JSON.stringify(error));
                return reject(new responseBuilder.Response("Firebase Admin SDK is down!", messageCodes.samples.failure,
                    statusCodes.InternalServerError));
            });
    });
};