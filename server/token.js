import jwt from 'jsonwebtoken';

const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15min',
  });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
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
export {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
