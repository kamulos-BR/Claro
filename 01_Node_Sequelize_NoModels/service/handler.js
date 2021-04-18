'use strict';

const createServices = require('./src/lambdas-service/helpers/create.services.helper');
const connections = require('./src/lambdas-service/connections');
const _conn = [
    {
        name: 'mainConnection',
        connection: connections.mainConnection
    }
];

const services = createServices(_conn);

module.exports = services;
