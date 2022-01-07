const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        photo: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        expirationDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('published', 'reserved', 'sold', 'expired'),
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Category);
  }
}

module.exports = Product;
