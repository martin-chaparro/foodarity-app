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
          type: DataTypes.TEXT,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        photo: {
          type: DataTypes.TEXT, // TODO ACOMODAR
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
        status: {
          type: DataTypes.ENUM('published', 'finished', 'canceled'),
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
    this.belongsTo(models.Category, { as: 'category' });
    this.belongsTo(models.Company, { as: 'company' });
    this.belongsTo(models.User, { as: 'publisher' });
  }
}

module.exports = Product;
