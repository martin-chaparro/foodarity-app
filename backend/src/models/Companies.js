const { Model, DataTypes } = require('sequelize');

class Companies extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        website: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        logo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        banner: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          // cuenta habilitada o no
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(
      models.CompanyType
      // {
      //   as: 'company_type',
      //   foreignKey: 'id',
      // }
    );
  }
}

module.exports = Companies;
