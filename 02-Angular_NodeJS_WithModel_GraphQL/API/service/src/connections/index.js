'use strict';

const env = process.env.NODE_ENV || 'dev';

const config = require('./config/config').config[env];
const logger = require('./config/config').logger;

const fs = require('fs');
const path = require('path');

const {Sequelize, DataTypes} = require('sequelize');
const operatorsAliases = require('./config/operators.aliases');

const basename = path.basename(__filename);

const connectSQLServer = async () => {

    return new Sequelize(config.database, config.userName, config.userPass,
        {
            host: config.host,
            port: config.port,
            dialect: config.dialect,
            logging: (msg) => {
                if (config.debug) {
                    logger.info(msg);
                }
                else {
                    return false;
                }
            },
            operatorsAliases: false,
            pool: {
                max: 1,
                min:  0,
                idle: 30000,
                acquire: 10000,
            }
        }
    );

};

exports.getConnection = async () => {

    const db = {};

    const sequelize = await connectSQLServer();

    // Testing Connection
    await sequelize.authenticate()
        .then(() => {
            logger.info('Connection has been established successfully. In database: ' + config.database);
        })
        .catch(err => {
            logger.error('Unable to connect to the database: ' + config.database, err);
            return null;
        });


    db.models = {};

    const pathModels = path.join(__dirname, '../models', config.database);

    fs.readdirSync(pathModels)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const model = require(path.join(pathModels, file))(sequelize, Sequelize.DataTypes)
            // db[model.name] = model;
            db.models[model.name] = model;
        });

    Object.keys(db.models).forEach(modelName => {
        if (db.models[modelName].associate) {
            db.models[modelName].associate(db.models);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
};
