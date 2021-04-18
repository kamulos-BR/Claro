'use strict';
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

const defaultValues = (serviceName, theme) => {

    return {
        memorySize: 1024,
        events: [{
            http: {
                cors: {
                    origin: "*",
                    maxAge: 86400
                },
                // authorizer: {
                //     type: 'COGNITO_USER_POOLS',
                //     authorizerId: '',
                //     arn: ''
                // },
                private: false
            }
        }]
        ,layers:[
            // set layer
            'arn:aws:lambda:sa-east-1:484006173714:layer:bwr-layer-prod:4'
        ]
    }
};

const mountHandler = (handler, defaultHandlerValues, handlerName) => {
    handler.handler = `handler.${handlerName}`;
    const config = {...handler, ...defaultHandlerValues};
    if (handler.events) {
        const events = getEvents(handler.events, defaultHandlerValues.events);
        config.events = events;
    }
    else {
        delete config.events;
    }
    return config;
};

const getEvents = (events, defaultHandlerValues) => {
    const list = [];

    for (const defaultValues of defaultHandlerValues) {
        for (const event of events) {
            const eventObject = {};
            for (const type in event) {
                if (!event.hasOwnProperty(type)) {
                    continue;
                }
                eventObject[type] = {...defaultValues[type], ...event[type]};
            }
            list.push(eventObject);
        }
    }

    return list;
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

const functionData = (stage, serviceName, theme) => {
    const servicesPath = path.join(__dirname, '../', '../', 'services');
    const defaultHandlerValues = defaultValues(serviceName, theme);

    const functions = {};
    fs.readdirSync(servicesPath).forEach(service => {
        if (service === theme) {
            const configPath = path.join(servicesPath, service, 'config.js');
            const handlers = require(configPath);

            for (const handler in handlers) {
                if (!handlers.hasOwnProperty(handler)) {
                    continue
                }
                const handlerName = getServiceName(service, handler);
                functions[handlerName] = mountHandler(handlers[handler], defaultHandlerValues, handlerName)
            }

        }
    });

    return {
        functions: functions
    }
};

module.exports = functionData;
