const getHome = async (req, res) => {
  res.json({
    msg: 'Home Controller - Works',
  });
};

module.exports = {
  getHome,
};
