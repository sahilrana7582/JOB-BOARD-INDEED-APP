const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const key = process.env.JWT_KEY;

    if (!token) {
      return next(new AppError('You Are Not Logged In', 404));
    }

    const decode = await jwt.verify(token, key);
    if (!decode) {
      return next(new AppError('Invalid Token', 401));
    }
    req.id = decode?.userID;
    next();
  } catch (e) {
    console.log('Error While Getting Cookie', e);
  }
};

module.exports = isAuth;
