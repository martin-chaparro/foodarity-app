const { Model, DataTypes } = require('sequelize');

class City extends Model {
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
        lat: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        lon: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        state_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Address);
    this.belongsTo(models.State, { foreignKey: 'state_id', as: 'state' });
  }
}

module.exports = City;
