/**
 * @file index.js
 *
 * Entry point for Firebase functions.
 * Initialization of the Admin SDK.
 * Registration of cloud function handlers.
 * 
 * @author Bilger Yahov
 * @version 1.1.0
 * @copyright © 2018 - 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { execSync } = require('child_process');
const cors = require('cors')({
    origin: true,
});

// Functions imported.
const helloWorld = require("./src/samples/hello-world");
const adminSample = require("./src/samples/admin-sample");
const register = require("./src/admin-sdk/register");

/**
 * Initializes the Firebase Admin SDK. 
 * @param {*} firebaseAdminConfig
 * @returns void
 */
function initializeFirebaseAdmin(firebaseAdminConfig) {
    admin.initializeApp({
        credential: admin.credential.cert({
            type: firebaseAdminConfig.admin.type,
            project_id: firebaseAdminConfig.admin.project_id,
            private_key_id: firebaseAdminConfig.admin.private_key_id,
            private_key: firebaseAdminConfig.admin.private_key.replace(new RegExp("bilger", "g"), " ").replace(/\\n/g, "\n"),
            client_email: firebaseAdminConfig.admin.client_email,
            client_id: firebaseAdminConfig.admin.client_id,
            auth_uri: firebaseAdminConfig.admin.auth_uri,
            token_uri: firebaseAdminConfig.admin.token_uri,
            auth_provider_x509_cert_url: firebaseAdminConfig.admin.auth_provider_x509_cert_url,
            client_x509_cert_url: firebaseAdminConfig.admin.client_x509_cert_url
        }),
        databaseURL: 'https://smartphone-doctor.firebaseio.com'
    });
}

/**
 * Check if Firebase Functions are being set for local development
 * or production execution.
 */
if (process.env.NODE_ENV === "production") {
    initializeFirebaseAdmin(functions.config());
} else if (process.env.NODE_ENV === "development") {
    try {
        /**
         * Get the Firebase config values (synchronously).
         * Running this command should get the Firebase Config
         * for all Developers with the correct access rights.
         */
        let config = execSync("firebase functions:config:get");
        config = JSON.parse(config);
        // Handle if configuration for Firebase Admin SDK is not present.
        if (!config.admin) {
            console.error("#index.js: Had problems while running 'firebase functions:config:get'.");
            return;
        }
        // All is fine.
        initializeFirebaseAdmin(config);
    } catch (exc) {
        console.error("#index.js: Had problems while trying to set Firebase Functions" +
            " Admin SDK for local development.");
        console.error(JSON.stringify(exc));
    }
} else {
    console.error("#index.js: NODE_ENV has not been set! Aborting.");
}

// -----------------------------------------------------------
//                      Function handlers.
// -----------------------------------------------------------

// SAMPLES.
exports.helloWorld = functions.https.onRequest((request, response) => {
    return handleHTTPS(request, response, helloWorld);
});

exports.adminSample = functions.https.onRequest((request, response) => {
    return handleHTTPS(request, response, adminSample);
});

// ADMIN-SDK.
exports.register = functions.https.onRequest((request, response) => {
    // Allow Cross-Origin-Resource-Sharing.
    return cors(request, response, () => {
        return handleHTTPS(request, response, register);
    });
});

// -----------------------------------------------------------
//                      Utilities.
// -----------------------------------------------------------

function handleHTTPS(request, response, handler) {
    return handler(request)
        .then((data) => {
            return response.status(data["statusCode"]).json(data["jsonResponse"]);
        })
        .catch((error) => {
            return response.status(error["statusCode"]).json(error["jsonResponse"]);
        });
}