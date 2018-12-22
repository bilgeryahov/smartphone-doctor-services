/**
 * @file register.js
 *
 * Handles the registration of new users to the
 * platform.
 * 
 * @author Bilger Yahov
 * @version 1.1.0
 * @copyright © 2018 - 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

const admin = require('firebase-admin');

const responseBuilder = require("../common-js/response-builder");
const messageCodes = require("../common-js/message-codes");
const statusCodes = require("../common-js/status-codes");

/**
 * Goes through a set of checks before attempting to create an account.
 * All request methods different from POST are disallowed.
 * There's an input validation, which makes sure that the following three
 * body parameters are present and valid:
 *  - e-mail address { String }
 *  - password { String }
 *  - isAgent { Boolean }
 */
module.exports = (request) => {
    return new Promise((resolve, reject) => {
        // Allow only POST requests.
        if (request.method !== 'POST') {
            return reject(new responseBuilder.Response("The used HTTP method is not allowed!", messageCodes.httpRequest.failure,
                statusCodes.MethodNotAllowed));
        }
        // Input validation.
        if (!inputCheck(request)) {
            return reject(new responseBuilder.Response("Badly formatted input values!", messageCodes.httpRequest.failure,
                statusCodes.BadRequest));
        }
        // If the new user is an agent, then make sure to disable initially.
        const initialUserData = {
            email: request.body.email,
            password: request.body.password,
            disabled: request.body.isAgent
        };
        // Proceed with creating the account.
        admin.auth().createUser({
            email: initialUserData.email,
            emailVerified: false,
            password: initialUserData.password,
            disabled: initialUserData.disabled
        })
            .then(function (userRecord) {
                console.log("#register.js: Successfully created new user: " + userRecord.uid);
                return resolve(new responseBuilder.Response({ info: "Account created!", isAgent: request.body.isAgent },
                    messageCodes.auth.success, statusCodes.Created));
            })
            .catch(function (error) {
                // TODO: Not the best way of doing it, since the error message
                // that comes from the Admin SDK can contain sensitive information.
                console.error("#register.js: Error while creating new user: " + JSON.stringify(error));
                let messageCode = error.code || messageCodes.auth.failure;
                return reject(new responseBuilder.Response("Failed to create a new user!", messageCode,
                    statusCodes.InternalServerError));
            });
    });
};

// -----------------------------------------------------------
//                      Utilities.
// -----------------------------------------------------------

/**
 * 
 * Validation check for the input provided to register
 * a new user.
 * 
 * @param {*} request
 * @returns { boolean } 
 */
function inputCheck(request) {
    return (
        typeof request.body.email === "string" &&
        typeof request.body.password === "string" &&
        typeof request.body.isAgent === "boolean" &&
        request.body.email.length > 0 &&
        request.body.password.length >= 6 &&
        request.body.email.length < 50 &&
        request.body.password.length < 50);
}