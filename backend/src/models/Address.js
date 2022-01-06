const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
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

  static associate(models) {
    this.belongsTo(models.State);
    this.belongsTo(models.City);
    // this.hasOne(models.Companies, {foreignKey: 'company'})
  }
}

module.exports = Address;
