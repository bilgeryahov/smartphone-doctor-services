/**
 * @file hello-world.js
 *
 * Contains a sample function, which is used to test the
 * Firebase functions.
 * 
 * @author Bilger Yahov
 * @version 1.0.0
 * @copyright © 2018 Bilger Yahov, all rights reserved.
 */

"use strict"

module.exports = (request, response) => {
    response.send("Firebase Functions are up! Hello World!");
};