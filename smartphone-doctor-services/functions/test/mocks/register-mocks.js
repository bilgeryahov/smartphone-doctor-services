"use strict"

const globalConf = require("../../global_conf");
const ENDPOINT = "/register";

module.exports = {
    UNIT: {
        MethodNotAllowed: {
            GET: {
                method: "GET",
                query: "",
                body: {}
            }
        },
        BadRequest: {
            isAgentMissing: {
                method: "POST",
                query: "",
                body: {
                    email: "test@test.test",
                    password: "test1234"
                }
            },
            emailMissing: {
                method: "POST",
                query: "",
                body: {
                    isAgent: true,
                    password: "test1234"
                }
            },
            passwordMissing: {
                method: "POST",
                query: "",
                body: {
                    isAgent: true,
                    email: "test@test.com"
                }
            },
            isAgentMalformedNotBoolean: {
                method: "POST",
                query: "",
                body: {
                    isAgent: "no",
                    email: "test@test.test",
                    password: "test1234"
                }
            },
            emailMalformedNotString: {
                method: "POST",
                query: "",
                body: {
                    isAgent: true,
                    email: 1234567890,
                    password: "test1234"
                }
            },
            passwordMalformedNotString: {
                method: "POST",
                query: "",
                body: {
                    isAgent: true,
                    email: "test@test.test",
                    password: 1234567890
                }
            },
            emailMalformedShort: {
                method: "POST",
                query: "",
                body: {
                    isAgent: true,
                    email: "a@a.a",
                    password: "test1234"
                }
            },
            passwordMalformedShort: {
                method: "POST",
                query: "",
                body: {
                    isAgent: true,
                    email: "test@test.test",
                    password: "test"
                }
            },
            emailMalformedLong: {
                method: "POST",
                query: "",
                body: {
                    isAgent: true,
                    email: "test@test.testtest@test.testtest@test.testtest@test.test",
                    password: "test1234"
                }
            },
            passwordMalformedLong: {
                method: "POST",
                query: "",
                body: {
                    isAgent: true,
                    email: "test@test.test",
                    password: "test1234test1234test1234test1234test1234test1234test1234test1234"
                }
            }
        }
    },
    INTEGRATION: {
        takenEmailAddress: {
            method: "POST",
            uri: globalConf.LOCAL_SERVER + ENDPOINT,
            body: {
                isAgent: true,
                email: globalConf.TEST_USER,
                password: "test1234"
            },
            json: true
        },
        registerAgent: {
            method: "POST",
            uri: globalConf.LOCAL_SERVER + ENDPOINT,
            body: {
                isAgent: true,
                email: globalConf.TEST_USER,
                password: "test1234"
            },
            json: true
        },
        registerNotAgent: {
            method: "POST",
            uri: globalConf.LOCAL_SERVER + ENDPOINT,
            body: {
                isAgent: false,
                email: globalConf.TEST_USER,
                password: "test1234"
            },
            json: true
        }
    }
};