'use strict';

const logger = require('../config/logger').logger;
const {Sequelize} = require('sequelize');
const operatorsAliases = require('../config/operators.aliases');

const databaseInfo = {
    database: 'BWR',
    userName: 'bwrleadsadmin',
    userPass: 'rcpp1971',
    host: 'leads.cnurmj4bcw13.sa-east-1.rds.amazonaws.com',
    port: 4200
}

const connectMySQL = async () => {

    return new Sequelize(
        databaseInfo.database,
        databaseInfo.userName,
        databaseInfo.userPass,
        {
            host: databaseInfo.host,
            dialect: 'mysql',
            port: databaseInfo.port,
            // define: database.db.params.define,
            underscored: false,
            logging: (msg) => {
                logger.info(msg);
            },
            pool: {
                max: 1,
                min: 0,
                idle: 20000,
                acquire: 20000
            }
        }
    );
};

/**
 * @returns {{
 *  sequelize,
 *  Sequelize,
 *  models: {}
 * }}
 */
exports.getConnection = async () => {

    const db = {};
    const sequelize = await connectMySQL();

    // Testing Connection
    sequelize.authenticate()
        .then(() => {
            logger.info('Connection has been established successfully. In database: ' + databaseInfo.database);
        })
        .catch(err => {
            logger.error('Unable to connect to the database: ' + databaseInfo.database, err);
        });

    db.models = {};
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
};
