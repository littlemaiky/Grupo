const { Model, DataTypes, Sequelize } = require('sequelize');

const PAQUETERIA_TABLE = 'paquet';
//comtuimos el esquema, con esto contruiremos la base de datos.
const PaqueteriaSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.UUID
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  cantidad: {
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
class Paqueteria extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAQUETERIA_TABLE,
      modelName: 'Paqueteria',
      timestamps: false,
    }
  }
}

module.exports = { PAQUETERIA_TABLE, PaqueteriaSchema, Paqueteria };
