"use strict"

const admin = require('firebase-admin');

module.exports = (request, response) => {
    admin.auth().getUserByEmail("test@test.test")
        .then(function (userRecord) {
            console.log("Successfully fetched user data: ", userRecord.toJSON());
            return response.send("All Good!");
        })
        .catch(function (error) {
            console.error("Error fetching user data: ", error);
            return response.send("Not Good!");
        });
};