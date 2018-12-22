/**
 * @file message-codes.js
 *
 * List of message codes that will be re-used accros
 * HTTP responses.
 * 
 * @author Bilger Yahov
 * @version 1.0.0
 * @copyright © 2018 - 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

module.exports = {
    samples: {
        success: "samples/sample-message-code-success",
        failure: "samples/sample-message-code-failure"
    },
    httpRequest: {
        success: "httpRequest/request-success",
        failure: "httpRequest/request-failure"
    },
    auth: {
        success: "auth/success",
        failure: "auth/failure"
    }
}