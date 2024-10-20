import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// Create Access Token
const createAccessToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15min',
    });
  } catch (error) {
    console.error('Error creating access token:', error);
    throw error;
  }
};

// Create Refresh Token
const createRefreshToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });
  } catch (error) {
    console.error('Error creating refresh token:', error);
    throw error;
  }
};

// Send Access Token
const sendAccessToken = (res, req, accesstoken, name) => {
  res.send({
    accesstoken,
    name,
    email: req.body.email,
    message: 'Login succeeded',
  });
};

// Send Refresh Token (sets the token as a cookie)
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
