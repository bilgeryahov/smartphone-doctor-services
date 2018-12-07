"use strict"

import adminInitialized from "../index";

module.exports = (request, response) => {
    adminInitialized.auth().getUserByEmail("test@test.test")
        .then(function (userRecord) {
            console.log("Successfully fetched user data: ", userRecord.toJSON());
            response.send("All Good!");
        })
        .catch(function (error) {
            console.error("Error fetching user data: ", error);
            response.send("Not Good!");
        });
};