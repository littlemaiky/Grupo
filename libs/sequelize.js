const { Sequelize } = require('sequelize');

const { config } = require('./../config/confing');
const setupModels = require('./../db/models');// llamamos al nombre de la carpeta

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI=`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI,{
  dialect: 'postgres',
  logging: true
});

setupModels(sequelize);
sequelize.sync();//le decimos que haga una sincronizacion

module.exports = sequelize;
