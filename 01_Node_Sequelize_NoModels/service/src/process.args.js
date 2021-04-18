class ProcessArgs {

    constructor() {
        this.myArgs = process.argv.slice(2);
    }

    /**
     * Get The arg using the name, if you pass null or other, the function
     * will return all arguments
     *
     * @param {string} argument
     * @returns {string}
     */
    getArg(argument) {
        const args = this._clearArgs();

        if (argument) {
            return args.filter(item => argument === item.argument).pop();
        }

        return args;
    }

    /**
     * Get Arguments and return a clear object with (key, value)
     *
     * @returns {[{argument, value}]}
     */
    _clearArgs() {
        return this.myArgs.map(argument => {
            const arg = argument.toString().replace('-', '').split(':');
            return {
                argument: arg[0],
                value: arg[1]
            }
        })
    }

    /**
     * Return the Stage value, dev, prod, staging
     *
     * @returns {string}
     */
    getStage() {
        const stage = this.getArg('stage');
        return stage ? stage.value : 'dev';
    }

    getSecretManagerkey(){
        // let stage = this.getStage();

        return process.env.SECRET_MANAGER_KEY;
    }

    getEnv() {
        const secretEnvManager = this.getSecretManagerkey();
        const env = secretEnvManager.split('/');
        return env[1];

    }

}

module.exports = ProcessArgs;
