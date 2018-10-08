"use strict";
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const Config = require('./config/config');
const db = {};

const sequelize = new Sequelize(Config.DBCONFIG.dbname,Config.DBCONFIG.dbuser,Config.DBCONFIG.dbpwd,{
    host: Config.DBCONFIG.dbserver,
    dialect: Config.DBCONFIG.dbtype,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});
//检测是否连接成功
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:',err);
    });

let modelsPath = path.join(__dirname, '/models/');

    fs
    .readdirSync(modelsPath)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      var model = sequelize.import(path.join(modelsPath, file));
      db[model.name] = model;
    });
  
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

// 同步数据库模型到数据库
//sequelize.sync({force:true,logging: false}).then(() => console.log('同步数据库模型成功...'));
//  sequelize.sync({alter:true,logging: false}).then(() => console.log('同步数据库模型成功...'));


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;