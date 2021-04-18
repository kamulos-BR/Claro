'use strict';

const service = require('./service.config');
const provider = require('./provider.config');
const plugins = require('./plugins.config');
const resources = require('./resources.config');
const custom = require('./custom.config');
const functionData = require('./functionData');
let lambdas = require('../../../../lambdas');
const getLambdasNames = require('../../../../lambdasNames');


module.exports = async (stage, theme) => {
    const serviceName = 'bwr-api';

    if (theme === 'warmup'){

        const f = getLambdasNames(true);

        lambdas = new lambdas(false);
        const i = lambdas.setWarmUpFunctions(f, stage);

        if (!i) {
            console.log('ERROR: to create warm up lambdas');
            return; // set warm up file failed
        }
        else {
            console.log('SUCCESS: warm up lambdas created');
        }

    }

    let serverless = {};
    serverless = {...serverless, ...service(stage, serviceName, theme)};
    serverless = {...serverless, ...provider(stage, serviceName, theme)};
    serverless = {...serverless, ...plugins(stage, serviceName)};
    serverless = {...serverless, ...resources(stage, serviceName, theme)};
    serverless = {...serverless, ...custom(stage, serviceName)};
    serverless = {...serverless, ...functionData(stage, serviceName, theme)};

    return serverless;
};
