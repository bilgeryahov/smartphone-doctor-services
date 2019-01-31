/**
 * @file register.js
 *
 * Handles the registration of new users to the
 * platform.
 * 
 * @author Bilger Yahov
 * @version 1.2.2
 * @copyright © 2018 - 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

const firebaseAdmin = require('firebase-admin');

const responseBuilder = require("../common-js/response-builder");
const messageCodes = require("../common-js/message-codes");
const statusCodes = require("../common-js/status-codes");
const validationErrors = require("../common-js/validation-errors").REGISTER;

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
        let inputValidationActualResult = inputCheck(request);
        if (!inputValidationActualResult.success) {
            return reject(new responseBuilder.Response(inputValidationActualResult.debug, messageCodes.httpRequest.failure,
                statusCodes.BadRequest));
        }
        // If the new user is an agent, then make sure to disable initially.
        const initialUserData = {
            email: request.body.email,
            password: request.body.password,
            disabled: request.body.isAgent
        };
        // Proceed with creating the account.
        return firebaseAdmin.auth().createUser({
            email: initialUserData.email,
            emailVerified: false,
            password: initialUserData.password,
            disabled: initialUserData.disabled
        })
            .then((userRecord) => {
                console.log("#register.js: Successfully created new user: " + userRecord.uid.substr(1, 3));
                return resolve(new responseBuilder.Response({ info: "Account created!", isAgent: request.body.isAgent },
                    messageCodes.auth.success, statusCodes.Created));
            })
            .catch((error) => {
                // TODO: Not the best way of doing it, since the error message
                // that comes from the Admin SDK might contain sensitive information.
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
  * Validation check for the input provided to register
  * a new user.
  * 
  * @param { Object } request 
  * @returns { Object }
  */
function inputCheck(request) {
    let result = {
        success: true,
        debug: "Good to go!"
    };
    if (typeof request.body.email === "undefined") {
        result.success = false;
        result.debug = validationErrors.EMAIL_MANDATORY;
    } else if (typeof request.body.password === "undefined") {
        result.success = false;
        result.debug = validationErrors.PW_MANDATORY;
    } else if (typeof request.body.isAgent === "undefined") {
        result.success = false;
        result.debug = validationErrors.IA_MANDATORY;
    } else if (typeof request.body.email !== "string") {
        result.success = false;
        result.debug = validationErrors.EMAIL_STRING;
    } else if (typeof request.body.password !== "string") {
        result.success = false;
        result.debug = validationErrors.PW_STRING;
    } else if (typeof request.body.isAgent !== "boolean") {
        result.success = false;
        result.debug = validationErrors.IA_BOOLEAN;
    } else if (request.body.email.length < 6) {
        result.success = false;
        result.debug = validationErrors.EMAIL_SHORT;
    } else if (request.body.password.length < 6) {
        result.success = false;
        result.debug = validationErrors.PW_SHORT;
    } else if (request.body.email.length > 50) {
        result.success = false;
        result.debug = validationErrors.EMAIL_LONG;
    } else if (request.body.password.length > 50) {
        result.success = false;
        result.debug = validationErrors.PW_LONG;
    }
    return result;
}