const { Model, DataTypes } = require('sequelize');

class PaymentMethod extends Model {
  static init(sequelize) {
    super.init(
      {
        method: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Order)
  }
}

module.exports = PaymentMethod;
