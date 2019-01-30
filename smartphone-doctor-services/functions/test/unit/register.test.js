"use strict"

const assert = require('assert');

// Require functions to be tested.
const register = require("../../src/admin-sdk/register");

// Utilities.
const statusCodes = require("../../src/common-js/status-codes");
const registerMocks = require("../mocks/register-mocks").UNIT;
const inputValidationErrors = require("../../src/common-js/validation-errors").REGISTER;

/**
 * Unit testing of the "register" functionality.
 */
describe("Unit testing of 'register' function.", () => {
    describe('#1: Will simulate a GET request.', () => {
        it('Should fail not allowing request methods different from "POST".', (done) => {
            register(registerMocks.MethodNotAllowed.GET)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error["statusCode"], statusCodes.MethodNotAllowed);
                    return done();
                });
        });
    });
    describe('#2: Will provide input without e-mail field.', () => {
        it('Should fail indicating that e-mail field is mandatory.', (done) => {
            register(registerMocks.BadRequest.emailMissing)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.EMAIL_MANDATORY);
                    return done();
                });
        });
    });
    describe('#3: Will provide input without password field.', () => {
        it('Should fail indicating that password field is mandatory.', (done) => {
            register(registerMocks.BadRequest.passwordMissing)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.PW_MANDATORY);
                    return done();
                });
        });
    });
    describe('#4: Will provide input without isAgent field.', () => {
        it('Should fail indicating that isAgent field is mandatory.', (done) => {
            register(registerMocks.BadRequest.isAgentMissing)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.IA_MANDATORY);
                    return done();
                });
        });
    });
    describe('#5: Will provide input where e-mail field is not a String.', () => {
        it('Should fail indicating that e-mail field shoudl be a String.', (done) => {
            register(registerMocks.BadRequest.emailMalformedNotString)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.EMAIL_STRING);
                    return done();
                });
        });
    });
    describe('#6: Will provide input where password field is not a String.', () => {
        it('Should fail indicating that password field shoudl be a String.', (done) => {
            register(registerMocks.BadRequest.passwordMalformedNotString)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.PW_STRING);
                    return done();
                });
        });
    });
    describe('#7: Will provide input where isAgent field is not a Boolean.', () => {
        it('Should fail indicating that isAgent field shoudl be a Boolean.', (done) => {
            register(registerMocks.BadRequest.isAgentMalformedNotBoolean)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.IA_BOOLEAN);
                    return done();
                });
        });
    });
    describe('#8: Will provide input where e-mail field is too short.', () => {
        it('Should fail indicating that e-mail field is too short.', (done) => {
            register(registerMocks.BadRequest.emailMalformedShort)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.EMAIL_SHORT);
                    return done();
                });
        });
    });
    describe('#9: Will provide input where password field is too short.', () => {
        it('Should fail indicating that password field is too short.', (done) => {
            register(registerMocks.BadRequest.passwordMalformedShort)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.PW_SHORT);
                    return done();
                });
        });
    });
    describe('#10: Will provide input where e-mail field is too long.', () => {
        it('Should fail indicating that e-mail field is too long.', (done) => {
            register(registerMocks.BadRequest.emailMalformedLong)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.EMAIL_LONG);
                    return done();
                });
        });
    });
    describe('#11: Will provide input where password field is too long.', () => {
        it('Should fail indicating that password field is too long.', (done) => {
            register(registerMocks.BadRequest.passwordMalformedLong)
                .then((data) => {
                    // It should not end-up here. It shoud go to "catch" statement.
                    return done(data);
                })
                .catch((error) => {
                    assert.equal(error.jsonResponse.responseMessage, inputValidationErrors.PW_LONG);
                    return done();
                });
        });
    });
});