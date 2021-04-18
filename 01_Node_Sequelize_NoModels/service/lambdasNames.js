'use strict';

const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

const selfPath = path.join(__dirname, './src/lambdas-service/');
const folder =  path.join(selfPath, "services/");

const getAllFunctions = require('./src/lambdas-service/helpers/get.function.name.helper');
const connectionsHandler = require('./src/lambdas-service/connections');

const connections = [
    {
        name: 'Users',
        connection: connectionsHandler.UserConnection
    }
];

let services = [];
let cont = 1;

const createService = (instance, connections, theme, deploy) => {
    const service = new instance(connections);
    const functionNames = getAllFunctions(service);

    for (const functionName of functionNames) {
        const name = getServiceName(theme, functionName);
        const stage = getStage();
        const funcDeploy = theme.toString() + '-' + stage + '-' + stage + '-' + name.toString();
        services.push( deploy ? funcDeploy : name);
    }
};

const getServiceName = (serviceName, functionName) => {
    if (serviceName === 'warmup'){
        return functionName;
    }
    const name = serviceName.toString().split('-').map(value => capitalize(value)).join('');
    return pluralize.singular(snakeCase(name)) + capitalize(functionName);
};

const capitalize = (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1)
};

const snakeCase = (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toLowerCase() + string.slice(1)
};

const getArguments = (argument) => {
    const args = clearArguments();
    if (argument) {
        return args.filter(item => argument === item.argument).pop();
    }
    return args;
};

const clearArguments = () => {
    const myArgs = process.argv.slice(2);
    return myArgs.map(argument => {
        const arg = argument.toString().replace('-', '').split(':');
        return {
            argument: arg[0],
            value: arg[1]
        }
    })
};

const getStage = () => {
    const stage = getArguments('stage');
    return stage.value;
};

const getLambdasNames = (deploy) => {
    fs.readdirSync(folder).forEach(theme => {
        if (theme !== 'warmup') {
            const serviceFolder = path.join(folder, theme, 'service.js');
            const service = require(serviceFolder);

            Object.assign(services, createService(service, connections, theme, deploy));
            cont++;
        }
    });
    return services;
};

module.exports = getLambdasNames;
