'use strict';
const fs = require('fs');
const path = require('path');
// const excludes = require('../../helpers/excludes');

function functionsTheme(){

    const servicesPath = path.join(__dirname, '../', '../', 'services');
    let arrServices = [];

    fs.readdirSync(servicesPath).forEach(service => {
        arrServices.push(service);
    });

    return arrServices
}

module.exports = functionsTheme;
