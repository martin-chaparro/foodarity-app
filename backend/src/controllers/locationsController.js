const { Op } = require('sequelize');
const City = require('../models/City');
const State = require('../models/State');

const getCities = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    try {
      const cities = await City.findAll({
        include: [{ model: State, as: 'state' }],
        order: [['name', 'ASC']],
      });
      res.json(cities);
    } catch (error) {
      res.send(error);
    }
  } else {
    try {
      const cities = await City.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: [{ model: State, as: 'state' }],
        order: [['name', 'ASC']],
      });
      res.json(cities);
    } catch (error) {
      res.send(error);
    }
  }
};

const getCitiesByState = async (req, res) => {
  const { stateId } = req.params;
  const { name } = req.query;

  if (!stateId) {
    return res.status(400).json({ message: 'Missing stateId' });
  }

  if (!name) {
    try {
      const cities = await City.findAll({
        where: { state_id: stateId },
        include: [{ model: State, as: 'state' }],
        order: [['name', 'ASC']],
      });
      return res.json(cities);
    } catch (error) {
      return res.send(error);
    }
  } else {
    try {
      const cities = await City.findAll({
        where: {[Op.and]: [{ name: {[Op.iLike]: `%${name}%`} }, { state_id: stateId }] },
        include: [{ model: State, as: 'state' }],
        order: [['name', 'ASC']],
      });
      return res.json(cities);
    } catch (error) {
      return res.send(error);
    }
  }
  
};

const getStates = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    try {
      const states = await State.findAll({
        order: [['name', 'ASC']],
      });
      res.json(states);
    } catch (error) {
      res.send(error);
    }
  } else {
    try {
      const states = await State.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        order: [['name', 'ASC']],
        attributes: ['id', 'name', 'lat', 'lon'],
      });
      res.json(states);
    } catch (error) {
      res.send(error);
    }
  }
};

module.exports = {
  getStates,
  getCities,
  getCitiesByState,
};
