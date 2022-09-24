const jwt = require("jsonwebtoken");

exports.generateToken = async (user, time) => {
  const payload = {
    _id: user._id,
  };
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: time,
  });
};
exports.isExistent = async (user, username, error, res) => {
  const existingUser = await user.findOne({
    username,
  });

  if (existingUser) {
    return true;
  }
  return false;
};
exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
