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
 * 
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

                // Handle different messages for agents, for clients.
                // Keep in mind the e-mail address verification. 
                // Keep in mind the disabled -> enabled by an App onwer.

                return response.status(201).json({ message: '' });
            })
            .catch(function (error) {
                console.log("Error creating new user:", error);
            });
    });
};

// -----------------------------------------------------------
//                      Utilities.
// -----------------------------------------------------------

function inputCheck(request) {
    return (request.body.email &&
        request.body.password &&
        request.body.isAgent &&
        typeof request.body.email === "string" &&
        typeof request.body.password === "string" &&
        typeof request.body.isAgent === "boolean" &&
        request.body.email.length > 0 &&
        request.body.password.length >= 6 &&
        request.body.email.length < 50 &&
        request.body.password.length < 50);
}