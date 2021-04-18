/**
 * Repository Class
 *
 * @template T
 */
class Repository {

    /**
     * Initialize the Repository with a connection
     *
     * @param connections [{sequelize, Sequelize, models}, ...]
     */
    constructor(connections) {

        /**
         * @type {{sequelize, Sequelize, models}}
         */
        this.connection = {};
        this.connections = connections;

        /**
         * Default Model
         *
         * @type {T}
         */
        this._defaultModel = null;
    }

    async open() {

        if (this.connections) {
            if (this.connections.length) {

                const p = this.connections.map(async (source) => {
                    const connection = await source.connection.getConnection();
                    this.connection[source.name] = {};
                    this.connection[source.name].sequelize = connection.sequelize;
                    this.connection[source.name].Sequelize = connection.Sequelize;
                    this.connection[source.name].Op = connection.Sequelize.Op;
                    this.connection[source.name].models = connection.models;
                    return this.connection[source.name];
                });
                await Promise.all(p);
            }
        }
    }

    async build(open = false) {
        if (open) {
            await this.open();
        }
    }

    close() {
        for (const source of this.connections) {
            this.connection[source.name].sequelize.close();
        }
    }

}

module.exports = Repository;
