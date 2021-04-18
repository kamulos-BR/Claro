
class Repository {

    constructor(connection) {
        this.connection = connection;
    }

    async openConn() {
        if (this.connection) {
            return await this.connection.getConnection();
        }
    }

    async closeConn() {
        await this.connection.sequelize.close();
        console.log('All connections closed good!');
    }
}

module.exports = Repository;
