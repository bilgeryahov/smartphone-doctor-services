"use strict"

const functions = require('firebase-functions');

// Functions imported.
const helloWorld = require("./src/hello-world");
const sayHi = require("./src/say-hi");

// Function main handlers.
exports.helloWorld = functions.https.onRequest((request, response) => {
    return helloWorld(request, response);
});

exports.sayHi = functions.https.onRequest((request, response) => {
    return sayHi(request, response);
});