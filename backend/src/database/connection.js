const Sequelize = require('sequelize');
const ConfigDB = require('../config/database');

const connection = new Sequelize(ConfigDB);

const User = require('../models/User');
const Role = require('../models/Role');
const Address = require('../models/Address');
const City = require('../models/City');
const State = require('../models/State');

// Models Init
User.init(connection);
Address.init(connection);
City.init(connection);
State.init(connection);

// Associate
Role.associate(connection.models);
User.associate(connection.models);
Address.associate(connection.models);
City.associate(connection.models);
State.associate(connection.models);

module.exports = connection;
