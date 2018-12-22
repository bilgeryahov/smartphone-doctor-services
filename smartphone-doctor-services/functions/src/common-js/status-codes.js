/**
 * @file status-codes.js
 *
 * List of commonly used HTTP status codes.
 * 
 * @author Bilger Yahov
 * @version 1.0.0
 * @copyright © 2018 - 2019 Bilger Yahov, all rights reserved.
 */

"use strict"

module.exports = {
    "OK": 200,
    "Created": 201,
    "Accepted": 202,
    "NotModified": 304,
    "BadRequest": 400,
    "Unauthorized": 401,
    "Forbidden": 403,
    "NotFound": 404,
    "MethodNotAllowed": 405,
    "RequestTimeout": 408,
    "InternalServerError": 500,
    "NotImplemented": 501,
    "BadGateway": 502,
    "ServiceUnavailable": 503,
    "GatewayTimeout": 504
}