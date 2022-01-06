const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./database/connection');
const CompanyType = require('./models/CompanyType');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4001;

    this.environment = process.env.NODE_ENV;

    this.paths = {
      apiv1: '/api/v1',
    };

    // middlewares
    this.middlewares();

    // Rutas de Aplicacion
    this.routes();
  }

  // express instance
  getExpressInstance() {
    return this.app;
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(this.paths.apiv1, require('./routes/api'));
  }

  async connectDb() {
    try {
      console.log('||--> Establishing connection with database: <--||');
      switch (this.environment) {
        case 'production':
          console.log('||--> Production mode setting in: authenticate<--||');
          await connection.authenticate();
          break;
        case 'test':
          console.log('||--> Test mode setting in: force = false<--||');
          await connection.sync({ force: false });
          break;
        case 'development':
        default:
          console.log('||--> Development mode setting in: force = true<--||');
          await connection.sync({ force: false });
          break;
      }
      console.log('||--> Database connection established..: <--||');
    } catch (error) {
      console.log('Could not connect to the database...');
      console.log(error);
    }
  }

 async seedTypes() {
  try {
    console.log('||--> Seed database...: <--||');
    await CompanyType.bulkCreate([{type: 'Comercio'}, {type: 'ONG'}]);
  } catch (error) {
    console.log('||--> Seed not completed...: <--||');
  }
}

  start() {
    this.app.listen(this.port, async () => {
      console.log(`||--> Http server running in port:${this.port} <--||`);
      await this.connectDb();
      await this.seedTypes();
    });
  }
}

module.exports = Server;
