const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        lote: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
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
        publicationDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        expirationDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('published', 'reserved', 'sold', 'expired'),
          allowNull: false,
          defaultValue: 'published',
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Category);
    this.hasOne(models.Company);
  }
}

module.exports = Product;
