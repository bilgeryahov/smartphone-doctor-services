/**
 * @file hello-world.js
 *
 * Sample "Hello World" function
 * for a testing purpose.
 * 
 * @author Bilger Yahov
 * @version 2.0.0
 * @copyright © 2018 - 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

const responseBuilder = require("../common-js/response-builder");
const messageCodes = require("../common-js/message-codes");
const statusCodes = require("../common-js/status-codes");

module.exports = (request) => {
    return new Promise((resolve, reject) => {
        return resolve(new responseBuilder.Response("Hello World!", messageCodes.samples.success, statusCodes.OK));
    });
};