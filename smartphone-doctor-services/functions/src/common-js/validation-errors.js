/**
 * @file validation-errors.js
 *
 * Validation errors throughout input handling.
 * 
 * @author Bilger Yahov
 * @version 1.0.0
 * @copyright © 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

module.exports = {
    REGISTER: {
        EMAIL_MANDATORY: "E-mail field is mandatory!",
        PW_MANDATORY: "Password field is mandatory!",
        IA_MANDATORY: "isAgent field is mandatory!",
        EMAIL_STRING: "E-mail field should be a string!",
        PW_STRING: "Password field should be a string!",
        IA_BOOLEAN: "isAgent field should be a boolean!",
        EMAIL_SHORT: "E-mail length too short!",
        PW_SHORT: "Password length too short!",
        EMAIL_LONG: "E-mail length too long!",
        PW_LONG: "Password length too long!"
    }
}