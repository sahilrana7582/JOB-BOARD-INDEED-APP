const jwt = require('jsonwebtoken');

const generateToken = (user, res) => {
  const jwt = require('jsonwebtoken');
  const key = process.env.JWT_KEY;

  const token = jwt.sign({ userID: user._id }, key, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'PRODUCTION',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

module.exports = generateToken;
