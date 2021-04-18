const Repository = require('../repository');
const connection = require('../../connections');

class PlayerRepository extends Repository {

    constructor() {
        super(connection);
    }

    async openConn() {
        // open database
        this.connection = await super.openConn();
        // models
        this.model = this.connection.models.players;
    }

    async getPlayer(id) {
        return this.model.findOne({
            where: {
                id: id
            }
        });
    }

    async getPlayers(limit) {
        let response;

        try {
            response = await this.model.findAll({
                limit: limit
            });
        }
        catch (err) {
           console.log(err.message);
        }
        finally {
            console.log('finally to do something');
        }

        return response;
    }


    async setPlayer(model) {
        let response;

        try {
            response = await this.model.create(model);
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            console.log('finally to do something');
        }

        return response;
    }

    getModel() {
        return this.model;
    }

}


module.exports = PlayerRepository;
