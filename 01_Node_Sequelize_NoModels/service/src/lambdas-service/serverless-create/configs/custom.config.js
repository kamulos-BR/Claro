'use strict';


module.exports = (stage, serviceName) => {
    return {
        custom: {
            stages: [
                'prod'
            ],
            warmup: {
                schedule: 'rate(5 minutes)',
                vpc: true,
                concurrency: 1,
                memorySize: 512,
                timeout: 120
            }
        }
    }
};
