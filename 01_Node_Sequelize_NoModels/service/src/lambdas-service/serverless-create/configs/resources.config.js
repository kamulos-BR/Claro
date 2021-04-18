'use strict';

const fs = require('fs');
const path = require('path');
const selfPath = path.join(__dirname, '../../');
const folder =  path.join(selfPath, "services/");

module.exports = (stage, serviceName, theme) => {

    const _resources = {
        resources: {
            Resources: {
                GetSesssionGetLogGroup: {

                }
            }
        },
        package:{
            excludeDevDependencies: true,
            exclude: [
                '.git/**',
                '.idea/**',
                './reports/**',
                '.scannerwork/**',
                '.serverless/**',
                '**/tests/**'
            ]
        }
    };

    const logResource = {
        Type: 'AWS::Logs::LogGroup',
        Properties: {
            RetentionInDays: "7"
        }
    };

    const resPath = path.join(folder, theme, 'resource.js');

    let additionalResource = _resources;
    if (fs.existsSync(resPath)) {
        const getResources = require(resPath);
        const resObj = getResources(stage);
        additionalResource.resources.Resources = resObj;
        additionalResource.resources.Resources.GetSesssionGetLogGroup = logResource;
    }
    else {
        additionalResource.resources.Resources.GetSesssionGetLogGroup = logResource;
    }

    return additionalResource;
};
