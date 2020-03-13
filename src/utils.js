const jwt = require('jsonwebtoken');

const { APP_SECRET } = process.env;

const verifyToken = token => {
  try {
    if (token) {
      return jwt.verify(token, APP_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

module.exports = {
  verifyToken,
};
