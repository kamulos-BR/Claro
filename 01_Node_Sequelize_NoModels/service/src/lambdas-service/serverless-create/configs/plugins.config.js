'use strict';

module.exports = (stage, serviceName) => {
    return {
        plugins: [
            'serverless-stage-manager',
            'serverless-latest-layer-version'
        ]
    }
};
