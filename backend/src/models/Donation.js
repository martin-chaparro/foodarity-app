const { Model, DataTypes } = require('sequelize');

class Donation extends Model {
  static init(sequelize) {
    super.init(
      {
        // id: {
        //   type: DataTypes.INTEGER,
        //   primaryKey: true,
        //   allowNull: false,
        // },
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
          type: DataTypes.JSON,
          allowNull: true,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    // se agrega una ForeingKey categoriId a la tabla Donation
    this.belongsTo(models.Category, { as: 'category' });
    this.belongsTo(models.Company, { as: 'ong' });
    this.belongsTo(models.Company, { as: 'commerce' });
    this.belongsTo(models.User, { as: 'publisher' });
  }
}

module.exports = Donation;
