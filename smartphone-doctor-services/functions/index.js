"use strict"

const functions = require('firebase-functions');

// Functions imported.
const helloWorld = require("./src/hello-world");

// Function main handlers.
exports.helloWorld = functions.https.onRequest((request, response) => {
    return helloWorld(request, response);
});