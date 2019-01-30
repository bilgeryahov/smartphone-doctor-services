/**
 * @file admin-sample.js
 *
 * Contains a sample function, which is used to test the
 * Firebase Admin SDK.
 * 
 * @author Bilger Yahov
 * @version 1.0.0
 * @copyright © 2018 Bilger Yahov, all rights reserved.
 */

"use strict"

const admin = require('firebase-admin');

/**
 * This is a test user, which is disabled on the Firebase console.
 * Will be used only to verify the set-up of Firebase Admin SDK.
 */
module.exports = (request, response) => {
    admin.auth().getUserByEmail("test@test.test")
        .then(function (userRecord) {
            console.log("#admin-sample.js: Successfully fetched user data: ", userRecord.toJSON());
            return response.send("Firebase Admin SDK is up!");
        })
        .catch(function (error) {
            console.error("#admin-sample.js: Error fetching user data: ", error);
            return response.send("Problems with Firebase Admin SDK!");
        });
};