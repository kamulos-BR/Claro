'use strict';
const AWS = require('aws-sdk');

/**
 * Represents an abstraction of Lambda
 */
class systemsManager {
    constructor(region = 'sa-east-1') {
        this.systemsManager = new AWS.SSM({
            region: region
        });
    }

    async getParameters() {

        const params = {
            Path: '/', /* required */
            Recursive: false,
            WithDecryption: false
        };

        let result = [];
        await this.systemsManager.getParametersByPath(params).promise().then( async response => {
            if (response.Parameters) {
                result = response.Parameters
            }
        });

        return result;
    }

}
module.exports = systemsManager;
