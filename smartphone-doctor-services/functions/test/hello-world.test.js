"use strict"

const assert = require('assert');

describe('Sample.', () => {
    describe('Testing.', () => {
        it('Should return -1 when the value is not present.', () => {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});