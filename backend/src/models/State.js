const { Model, DataTypes } = require('sequelize');

class State extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = State;
