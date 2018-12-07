"use strict"

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Functions imported.
const helloWorld = require("./src/hello-world");
const sayHi = require("./src/say-hi");
const adminSample = require("./src/admin-sample");

// Initialize the Firebase Admin SDK.
admin.initializeApp({
    credential: admin.credential.cert({
        type: functions.config().admin.type,
        project_id: functions.config().admin.project_id,
        private_key_id: functions.config().admin.private_key_id,
        private_key: functions.config().admin.private_key.replace(/\\n/g, '\n').replace(/\\u0020/g, '\u0020'),
        client_email: functions.config().admin.client_email,
        client_id: functions.config().admin.client_id,
        auth_uri: functions.config().admin.auth_uri,
        token_uri: functions.config().admin.token_uri,
        auth_provider_x509_cert_url: functions.config().admin.auth_provider_x509_cert_url,
        client_x509_cert_url: functions.config().admin.client_x509_cert_url
    }),
    databaseURL: 'https://smartphone-doctor.firebaseio.com'
});

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