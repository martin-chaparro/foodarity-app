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
          defaultValue: 'Pendiente',
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
    this.belongsTo(models.CompanyType, { foreignKey: 'company_type_id', as: 'type' });
    this.hasMany(models.User, {as: 'user'});
    this.hasOne(models.Address, { as: 'address' });
    this.hasMany(models.Product);
    this.hasMany(models.Donation);
    this.hasMany(models.Order);
  }
}

module.exports = Company;
