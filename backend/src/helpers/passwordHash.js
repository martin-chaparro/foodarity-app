const bcryptjs = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const passwordHashed = await bcryptjs.hash(password, salt);
  return passwordHashed;
};

const comparePassword = async (passwordOld, passwordUser) => {
  const result = await bcryptjs.compare(passwordOld, passwordUser);
  return result;
};

module.exports = { hashPassword, comparePassword };
