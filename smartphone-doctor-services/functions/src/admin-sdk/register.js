/**
 * @file register.js
 *
 * Handles the registration of new users to the
 * platform.
 * 
 * @author Bilger Yahov
 * @version 1.0.0
 * @copyright © 2018 Bilger Yahov, all rights reserved.
 */

"use strict"

const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true,
});

/**
 * Goes through a set of checks before attempting to create an account.
 * All request methods different from POST are disallowed.
 * There's an input validation, which makes sure that the following three
 * body parameters are present and valid:
 *  -> e-mail address { string }
 *  -> password { string }
 *  -> isAgent { boolean }
 */
module.exports = (request, response) => {
    // Allow Cross-Origin-Resource-Sharing.
    return cors(request, response, () => {
        // Allow only POST requests.
        if (request.method !== 'POST') {
            return response.status(405).json({ error: 'HTTP Method is not allowed!' });
        }
        // Input validation.
        if (!inputCheck(request)) {
            return response.status(400).json({ error: 'Badly formatted input values!' });
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
                console.log("#register.js: Successfully created new user: ", userRecord.uid);
                return response.status(201).json({ message: { isAgent: request.body.isAgent, log: "Account created!" } });
            })
            .catch(function (error) {
                console.log("#register.js: Error creating new user: ", JSON.stringify(error));
                // TODO: Not the best way of doing it, since the error message
                // that comes from the Admin SDK can contain sensitive information.
                if (error.code) {
                    return response.status(500).json({
                        error: "Failed to create a new user!",
                        code: error.code
                    });
                }
                return response.status(500).json({ error: "Failed to create a new user!" });
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