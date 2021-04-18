'use strict';

module.exports = (stage, serviceName, theme) => {
    return {
        service: {
            name: `${theme}-${stage}`
        }
    }
};
