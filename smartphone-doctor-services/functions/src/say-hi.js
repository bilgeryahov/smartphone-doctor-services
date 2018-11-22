"use strict"

module.exports = (request, response) => {
    response.send(`Hi ${request.query.name}!`);
};