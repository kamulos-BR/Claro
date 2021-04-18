'use strict';
const pluralize = require('pluralize');
const CustomResponse = require('../helpers/response');
const getAllFunctions = require('./get.function.name.helper');
const fs = require('fs');
const path = require('path');

const flatten = (a) => {
    return Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
};

const createServices = (connections, theme) => {
    const selfPath = path.join(__dirname, '../');
    const folder = (theme) ? path.join(selfPath, "services/" + theme) : path.join(selfPath, "services/");
    let services = {};

    fs.readdirSync(folder).forEach(item => {
        const serviceFolder = path.join(folder, item, 'service.js');
        const service = require(serviceFolder);
        Object.assign(services, createService(service, connections, item));
    });
    return services;
};

const sleep = async (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};


// LAMBDAS FUNCTIONS HERE:
const createService = (instance, connections, serviceName) => {
    const service = new instance(connections);
    const functionNames = getAllFunctions(service);
    const exports = {};

    for (const functionName of functionNames) {
        const name = getServiceName(serviceName, functionName);

        exports[name] = async (event, context, callback) => {

            context.callbackWaitsForEmptyEventLoop = false;

            console.log(`------------------------ EVENT - Lambda [${functionName}] -----------------------------------`);
            console.log('event', event);
            console.log('---------------------------------------------------------------------------------------------');

            const source = event.Payload ? JSON.parse(event.Payload.toString()) : {}; // comes from warmUP

            if (source.source === 'serverless-plugin-warmup') {
                return callback(null, 'Lambda is warm!');
            }
            else  if (source.source === 'concurrency') {
                return sleep(2000).then( () => callback(null, 'Lambda is warm!'));
            }
            else {
                await service[functionName](event, context, callback)
                    .then(response => {

                        if (response && response.custom) {
                            if (response.isError) {
                                callback(response.error, response.response);
                                return;
                            }
                            callback(null, response.response);
                            return;
                        }

                        if (response.redirectURL) {
                            callback(null, (new CustomResponse(200, '', response, response.redirectURL)).getResponse());
                        }
                        else {
                            callback(null, (new CustomResponse(200, '', response)).getResponse());
                        }
                    })
                    .catch(error => {
                        callback(null, (new CustomResponse(500, error.toString(), null)).getResponse());
                    })
            }
        }
    }
    return exports;
};

const capitalize = (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1)
};

const snakeCase = (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toLowerCase() + string.slice(1)
};

const getServiceName = (serviceName, functionName) => {
    if (serviceName === 'warmup') {
        return functionName;
    }
    const name = serviceName.toString().split('-').map(value => capitalize(value)).join('');
    return pluralize.singular(snakeCase(name)) + capitalize(functionName);
};

const closeConnections = async (connections) => {
    for (const conn of connections) {
        await conn.connection.sequelize.close();
    }
};

const openConnection = async (connections) => {
    for (const conn of connections) {
        await conn.connection.connect;
    }
};

module.exports = createServices;
