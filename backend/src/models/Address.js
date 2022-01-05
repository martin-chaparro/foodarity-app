const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
          type: DataTypes.INTEGER(4),
          allowNull: false,
        },
        state_id: {
          type: DataTypes.INTEGER(4),
          allowNull: false,
        },
        zipcode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Address;
