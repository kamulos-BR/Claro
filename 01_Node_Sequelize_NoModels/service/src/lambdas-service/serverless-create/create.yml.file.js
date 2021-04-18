const yml = require('js-yaml');
const fs = require('fs');
const path = require('path');

class CreateYmlFile {

    constructor(data, theme) {
        this.serverlessPath = path.join(__dirname, '../', '../', '../', 'serverless.yml');
        this.data = data
    }

    writeFile() {
        return fs.writeFileSync(this.serverlessPath, yml.safeDump(this.data))
    }

    create(theme) {
        return {
            message: `Yaml file for ${theme.toString().toUpperCase()} theme was successfully created.`,
            result: this.writeFile()
        };
    }
}

module.exports = CreateYmlFile;
