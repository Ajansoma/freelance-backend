const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');

const verifyToken = function (req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, 'you are not authethicated'));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, 'Token is not valid'));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
module.exports = verifyToken;
