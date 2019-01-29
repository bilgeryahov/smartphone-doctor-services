/**
 * @file response-builder.js
 *
 * Exports a class, which is used to instantiate custom
 * HTTP response objects.
 * 
 * @author Bilger Yahov
 * @version 1.0.0
 * @copyright © 2018 - 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

/**
 * @class
 * 
 * TODO: Add additional info for the constructor parameters.
 */
class Response {
    constructor(responseMessage, messageCode, statusCode) {
        this.jsonResponse = {
            responseMessage: responseMessage,
            messageCode: messageCode
        }
        this.statusCode = statusCode;
    }
}

module.exports = {
    Response: Response
}