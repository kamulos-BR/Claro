'use strict';
const path = require('path');
const fs = require('fs');
const selfPath = path.join(__dirname, '');

class lambdas {

    constructor() {

    }

    setWarmUpFunctions(arrFunctions, stage) {
        let codeServ = '';
        let codeConf;

        let list = '[';
        for (let lambda of arrFunctions) {
            list += `'${lambda}',`
        }
        list += '];';
        list.replace(',];', '];');

        codeServ += this.codeGroup1(list);
        codeServ += this.codeGroup2(list);
        codeServ += this.codeInvoke(list);

        codeServ = this.serviceCodeHead() + "\n\nclass Service {\n" + codeServ + "\n}\nmodule.exports = Service; \n\n";
        return this.setWarmUpFiles(codeServ, codeConf);
    }

    codeGroup1(functions) {
        return `
        async group1 (event, context, callback) {
        success = 0; 
        error = 0; 
        let promise = [];  
        const list = ${functions}  
        for (const lambda of list) { 
            promise.push(this.invokeLambda(lambda))
        }
                
        await Promise.all(promise);
        return {'success': success, 'error': error};
        };\n\n\n\n`;
    }

    codeGroup2(functions) {
        return `
        async group2 (event, context, callback) { 
        success = 0;
        error = 0;
        payload = payload.replace('serverless-plugin-warmup', 'concurrency');
        let promise = [];

        for (let i = 0; i<=120; i++) {
            promise.push(this.invokeLambda('calculator-dev-dev-calculatorGetRatesChuncked'))
        }

        await Promise.all(promise);
        return {'success': success, 'error': error};
        };`;
    }

    codeInvoke(functions) {
        return `
        async invokeLambda (funcName) { 
            try {
                await lambda.invoke({
                    ClientContext: clientContext,
                    FunctionName: funcName,
                    InvocationType: 'RequestResponse',
                    LogType: 'None',
                    Qualifier: '$LATEST',
                    Payload: payload
                }).promise()
                    .then(data => {
                        if (data.StatusCode === 200) {
                            success += 1;
                            console.log('SUCCESS: The Lambda ' + funcName + ' is warm!');
                        } else {
                            error += 1;
                            console.log('ERROR: The Lambda ' + funcName + ' have a problem!');
                        }
                    });
            } catch (e) {
                console.log('ERROR: The Lambda ' + funcName + ' have a problem! - Details: ', e);
            }
        };`;
    }

    setWarmUpFiles(codeService) {
        const servicePath = path.join(selfPath, "/src/lambdas-service/services/warmup/service.js");
        fs.truncateSync(servicePath, 0);

        try {
            fs.writeFileSync(servicePath, codeService.toString().replace('undefined', ''));
            return true;
        } catch (e) {
            console.log('ERROR writeFileSync - ', e);
            return false;
        }
    }

    serviceCodeHead() {
        return `
            'use strict';
            const aws = require('aws-sdk');
            aws.config.region = 'sa-east-1';
            const lambda = new aws.Lambda();
            
            const source = JSON.stringify({"source": "serverless-plugin-warmup"});
            let payload = JSON.stringify({"Payload": source});
            const custom = JSON.stringify({"custom": payload});
            const clientContext = Buffer.from(custom).toString('base64');
            
            let success = 0;
            let error = 0;`
    }

}

module.exports = lambdas;
