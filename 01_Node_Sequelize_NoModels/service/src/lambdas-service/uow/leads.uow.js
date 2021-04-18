"use strict";

const _ = require('lodash');
const Functions = require('../helpers/functions');

const testUOW = async(pathParameters, body) => {
    // our final result
    const result = {
        success: false,
        message: ''
    };

    try {

        // minimum necessary to save trackit
        if (!body.username || body.username === '') {
            throw new Error('Invalid User!');
        }

        // todo something

        result.message = `All process concluded!`;
        result.success = true;

    }
    catch (err) {
        result.success = false;
        result.message = err.message.toString();
    }

    return result;
}


module.exports = {
    testUOW
}
