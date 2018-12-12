"use strict"

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { execSync } = require('child_process');

// Functions imported.
const helloWorld = require("./src/hello-world");
const sayHi = require("./src/say-hi");
const adminSample = require("./src/admin-sample");

/**
 * Initializes the Firebase Admin SDK. 
 * @param {*} firebaseAdminConfig
 * @returns void
 */
function initializeFirebaseAdmin (firebaseAdminConfig) {
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

// Function main handlers.
exports.helloWorld = functions.https.onRequest((request, response) => {
    return helloWorld(request, response);
});

exports.sayHi = functions.https.onRequest((request, response) => {
    return sayHi(request, response);
});

exports.adminSample = functions.https.onRequest((request, response) => {
    return adminSample(request, response);
});