const { Model, DataTypes, INTEGER } = require('sequelize');

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        quantity: {
          type:INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {as: 'buyer'})
    this.belongsTo(models.Company, {as: 'company'})
    this.belongsTo(models.Product, {as: 'product'})
    this.belongsTo(models.PaymentMethod, {as: 'paymentMethod'})
  }
}

module.exports = Order;
