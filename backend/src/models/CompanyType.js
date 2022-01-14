const { Model, DataTypes } = require('sequelize');

class CompanyType extends Model {
  static init(sequelize) {
    super.init(
      {
        type: {
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
    this.hasMany(models.Company);
   // se agrega una ForeingKey donationId a la tabla Donation
    this.hasMany(models.Donation);
  }
}

module.exports = CompanyType;
