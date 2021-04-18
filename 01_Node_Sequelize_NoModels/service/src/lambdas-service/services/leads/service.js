const LeadsRepository = require('../../repositories/leads.repository');
const LeadsUOWFunctions = require('../../uow/leads.uow');
const Functions = require('../../helpers/functions');

class Service {

    constructor(connections) {
        this.LeadsRepository = new LeadsRepository(connections);
    }

    async setEmailEvents(event, context, callback) {
        try {
            const pathParameters = Functions.getPathParameters(event);
            const body = Functions.getBody(event);

            return await this.LeadsRepository.setEmailEvents(pathParameters, body);
        }
        catch (err) {
            throw new Error(Functions.responseError(err));
        }
    }

    async setFormEvents(event, context, callback) {
        try {
            const pathParameters = Functions.getPathParameters(event);
            const body = Functions.getBody(event);

            return await this.LeadsRepository.setFormEvents(pathParameters, body);
        }
        catch (err) {
            throw new Error(Functions.responseError(err));
        }
    }

    async setChatEvents(event, context, callback) {
        try {
            const pathParameters = Functions.getPathParameters(event);
            const body = Functions.getBody(event);

            return await this.LeadsRepository.setChatEvents(pathParameters, body);
        }
        catch (err) {
            throw new Error(Functions.responseError(err));
        }
    }

    async setLeadConverted(event, context, callback) {
        try {
            const pathParameters = Functions.getPathParameters(event);
            const body = Functions.getBody(event);

            return await this.LeadsRepository.setLeadConverted(pathParameters, body);
        }
        catch (err) {
            throw new Error(Functions.responseError(err));
        }
    }

}

module.exports = Service;
