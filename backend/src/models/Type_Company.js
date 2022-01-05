const { Model, DataTypes } = require('sequelize');

class Type_Company extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('Commerce','ONG'), //solo puede tomar uno de los valores 
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Type_Company;
