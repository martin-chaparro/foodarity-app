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
        state: {
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
    this.belongsTo(models.State); // TODO relacionar a travez el atributo STATE(id)
  }
}

module.exports = City;
