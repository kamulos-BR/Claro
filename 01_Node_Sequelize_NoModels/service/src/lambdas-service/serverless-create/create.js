'use strict';
require('dotenv').config();
const colors = require('colors');

const ProcessArgs = require('../../process.args');
const CreateYmlFile = require('./create.yml.file');
const serverless = require('./configs/serverless.config');

const processArgs = new ProcessArgs();
const theme = process.env.npm_config_theme;

serverless(processArgs.getStage(), theme).then( (data) => {
    const createYmlFile = new CreateYmlFile(data);
    const _yaml = createYmlFile.create(theme);

    console.log(colors.cyan('****************************************************************************************************************\n'));
    console.log(colors.red(`START PROCESS ON ${processArgs.getSecretManagerkey()} - IS IT CORRECT?`));
    console.log(colors.green(_yaml.message));
    console.log(colors.cyan('\n****************************************************************************************************************'));

}).catch(err => console.log(err));






