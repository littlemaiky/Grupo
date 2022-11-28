const { INSUMO_TABLE, InsumoSchema, Insumo } = require('./insumos.models');
const { PAQUETERIA_TABLE, PaqueteriaSchema, Paqueteria } = require('./paqueterias.models');

function setupModels(sequelize) {
  Insumo.init(InsumoSchema, Insumo.config(sequelize));
  Paqueteria.init(PaqueteriaSchema, Paqueteria.config(sequelize));
}

module.exports = setupModels;
