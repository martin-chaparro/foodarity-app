const { Model, DataTypes } = require('sequelize');

class Company extends Model {
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
        areaCode: {
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
          type: DataTypes.JSON,
          allowNull: true,
        },
        banner: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        status: {
          // cuenta habilitada o no
          type: DataTypes.ENUM(
            'Habilitada',
            'Deshabilitada',
            'Pendiente',
            'Banneada'
          ),
          allowNull: false,
        },
        deleted: {
          // cuenta eliminada o no
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        ownerId: {
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
    this.belongsTo(models.CompanyType, { foreignKey: 'type_id', as: 'type' });
    this.hasMany(models.User);
    this.hasOne(models.Address, { as: 'address' });
    this.hasMany(models.Product);
  }
}

module.exports = Company;
