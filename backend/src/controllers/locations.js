const getStates = async (req, res) => {
  res.json({
    msg: 'todo getstates...',
  });
};

const getCities = async (req, res) => {
  res.json({
    msg: 'todo getcities...',
  });
};

module.exports = {
  getStates,
  getCities,
};
