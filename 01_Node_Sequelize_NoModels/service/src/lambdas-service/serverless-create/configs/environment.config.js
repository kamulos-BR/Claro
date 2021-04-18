'use strict';

module.exports = (stage) => {

    return {
        environment: {
            SECRET_MANAGER_KEY: 'bwr/' + stage,
            SERVERLESS_ALIAS: stage

        }
    }

};
