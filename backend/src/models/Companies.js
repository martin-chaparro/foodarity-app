const { Model, DataTypes } = require('sequelize');

class Companies extends Model {
  static init(sequelize) {
    super.init(
      {//Primary Key
        id: {
        type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        },
        // //Foreing Key de tabla type_company
        // type_id:{},
        // //Foreing Key de tabla address
        // address_id:{},
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        website:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        banner:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:{ //cuenta habilitada o no
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = User;