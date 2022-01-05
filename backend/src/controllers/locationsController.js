const City = require('../models/City');
const State = require('../models/State');

const getCities = async (req, res) => {
  const cities = await City.findAll();
  res.json(cities);
};

const getStates = async (req, res) => {
  const states = await State.findAll();
  res.json(states);
};

module.exports = {
  getStates,
  getCities,
};
