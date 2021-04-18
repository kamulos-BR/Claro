'use strict';

const vpc = require('./vpc.config');
const apiGateWay = require('./api-gateway.config');

function getLambdaConfigRole() {
    return 'arn:aws:iam::233894741779:role/lambda_basic_execution';
}

module.exports = (stage, serviceName, theme) => {

    let keyName = `logger-${theme}-${stage}`;

    let provider = {
        name: 'aws',
        runtime: 'nodejs12.x',
        stage: stage,
        region: 'sa-east-1',
        // role: role,
        versionFunctions: true,
        deploymentBucket: {
          name: `serverless.bwr.${stage}`
        },
        apiKeys: [
            `${keyName}`
        ]
    };

    // provider = {...provider, ...vpc(serviceName)};
    provider = {...provider, ...apiGateWay(serviceName, theme)};

    return {
        provider: provider
    }
};
