"use strict"

module.exports = (request, response) => {
    response.send("Hello World!");
    console.error("I am a super nice error message!");
    console.log("I am a super nice function!");
};