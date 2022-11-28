const { Model, DataTypes, Sequelize } = require('sequelize');

const INSUMO_TABLE = 'insums';
//comtuimos el esquema, con esto contruiremos la base de datos.
const InsumoSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.UUID
  },
  insumm: {
    allowNull: false,
    type: DataTypes.STRING
  },
  codigo: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: { //campo de seguimiento
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};
//constuimos la clase va aser usada para poder aceder al elemento creado en la DB
class Insumo extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSUMO_TABLE,
      modelName: 'Insumo',
      timestamps: false,
    }
  }
}

module.exports = { INSUMO_TABLE, InsumoSchema, Insumo };

