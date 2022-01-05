const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./database/connection');
const State = require('./models/State');
const provincias = require('./database/seeders/data/provincias.json');
const City = require('./models/City');
const municipios = require('./database/seeders/data/municipios.json');

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
          await connection.sync({ force: true });
          break;
      }
      console.log('||--> Database connection established..: <--||');
    } catch (error) {
      console.log('Could not connect to the database...');
      console.log(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async seed() {
    console.log('||--> Seed database...: <--||');
    try {
      provincias.provincias.forEach((prov) => {
        State.create({
          id: prov.id,
          name: prov.nombre,
          lat: prov.centroide.lat,
          lon: prov.centroide.lon,
        });
      });
      municipios.municipios.forEach((muni) => {
        City.create({
          id: muni.id,
          name: muni.nombre,
          lat: muni.centroide.lat,
          lon: muni.centroide.lon,
          state: muni.provincia.id,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  start() {
    this.app.listen(this.port, async () => {
      console.log(`||--> Http server running in port:${this.port} <--||`);
      await this.connectDb();
      await this.seed();
    });
  }
}

module.exports = Server;
