// 'use strict';
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
//
// const env = process.env.NODE_ENV || 'dev';
// const config = require('../connections/config')[env];
//
// const db = {};
//
// let sequelize;
// sequelize = new Sequelize(
//     config.database,
//     config.userName,
//     config.userPass,
//     {
//       host: config.host,
//       dialect: config.dialect,
//       port: config.port,
//       // define: database.db.params.define,
//       underscored: false,
//       pool: {
//         max: 1,
//         min: 0,
//         idle: 20000,
//         acquire: 20000
//       }
//     }
// );
//
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
//
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
//
// module.exports = db;
