"use strict"

const assert = require('assert');
const requestPromise = require("request-promise");

// Utilities.
const firebaseMessageCodes = require("../firebase-message-codes").AUTH;
const messageCodes = require("../../src/common-js/message-codes");
const registerMocks = require("../mocks/register-mocks").INTEGRATION;

/**
 * Generates a random string for the Users used for Integration Testing.
 * 
 * @returns { String }
 */
function randomString() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

/**
 * Integration Testing of the "register" functionality.
 */
describe("Integration Testing of 'register' function.", () => {
    describe('#1: Will try to register a User with an already taken e-mail address.', () => {
        it('Should fail indicating that this e-mail address has already been taken.', (done) => {
            requestPromise(registerMocks.takenEmailAddress)
            .then(data => {
                // It should not end-up here. It shoud go to "catch" statement.
                return done(data);
            })
            .catch(error => {
                if (error.error.messageCode) {
                    assert.equal(error.error.messageCode, firebaseMessageCodes.emailExists);
                    return done();
                }
                // Something is wrong with this Error entity.
                return done(error)
            });
        }).timeout(10000);
    });
    describe('#2: Will try to register a User as an Agent.', () => {
        it('Should successfully create the User and verify that it is an Agent.', (done) => {
            let mockToBeUsed = registerMocks.registerAgent;
            mockToBeUsed.body.email = mockToBeUsed.body.email.replace("@", randomString() + "@");
            requestPromise(mockToBeUsed)
            .then(data => {
                if (data.messageCode) {
                    assert.equal(data.messageCode, messageCodes.auth.success);
                    assert.equal(data.responseMessage.isAgent, true);
                    return done(); 
                }
                // Something is wrong with the Data Entity.
                return done(data);
            })
            .catch(error => {
                // Should succeed, so should not end up here.
                return done(error);
            });
        }).timeout(10000);
    });
    describe('#3: Will try to register a User not as an Agent.', () => {
        it('Should successfully create the User and verify that it is not an Agent.', (done) => {
            let mockToBeUsed = registerMocks.registerNotAgent;
            mockToBeUsed.body.email = mockToBeUsed.body.email.replace("@", randomString() + "@");
            requestPromise(mockToBeUsed)
            .then(data => {
                if (data.messageCode) {
                    assert.equal(data.messageCode, messageCodes.auth.success);
                    assert.equal(data.responseMessage.isAgent, false);
                    return done(); 
                }
                // Something is wrong with the Data Entity.
                return done(data);
            })
            .catch(error => {
                // Should succeed, so should not end up here.
                return done(error);
            });
        }).timeout(10000);
    });
});