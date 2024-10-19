const { sign, verify } = require('jsonwebtoken');

const createAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15min',
  });
};

const createRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const sendAccessToken = (res, req, accesstoken, name) => {
  res.send({
    accesstoken,
    name,
    email: req.body.email,
    message: 'Login Succeeded',
  });
};

const sendRefreshToken = (res, refreshToken) => {
  res.cookie('refreshtoken', refreshToken, {
    httpOnly: true,
    path: '/refresh_token',
  });
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
