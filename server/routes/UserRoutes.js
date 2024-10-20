import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

import { isAuth } from '../middleware/isAuth.js';
import {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} from '../token.js';

const router = express.Router();

// Delete User by Id
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await User.deleteOne({ _id: userId });
    res.status(200).json({
      message: 'User was deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by id
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new user (Signup)
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user
    await newUser.save();

    // Generate tokens
    const userId = newUser._id;
    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken(userId);

    // Store refresh token in user record
    newUser.refreshtoken = refreshToken;
    await newUser.save();

    // Send tokens and response
    sendRefreshToken(res, refreshToken); // Set refresh token in cookies
    sendAccessToken(res, req, accessToken, newUser.name); // Send access token as response
  } catch (error) {
    res.status(500).json({
      message: `Signup failed: ${error.message}`,
    });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate tokens
    const userId = user._id;
    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken(userId);

    // Store refresh token in user record
    user.refreshtoken = refreshToken;
    await user.save();

    // Send tokens
    sendRefreshToken(res, refreshToken); // Set refresh token in cookies
    sendAccessToken(res, req, accessToken, user.name); // Send access token as response
  } catch (error) {
    res.status(500).json({
      message: `Login failed: ${error.message}`,
    });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });
  return res.send({
    message: 'Logged out successfully',
  });
});

// Refresh token endpoint
router.post('/refresh_token', async (req, res) => {
  const token = req.cookies.refreshtoken;

  // If no token is provided
  if (!token) return res.send({ accesstoken: '' });

  let payload = null;
  try {
    // Verify the refresh token
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }

  // Find the user in the database
  const user = await User.findById(payload.userId);
  if (!user || user.refreshtoken !== token) {
    return res.send({ accesstoken: '' });
  }

  // Generate new tokens
  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  // Update the refresh token in the user's record
  user.refreshtoken = refreshToken;
  await user.save();

  // Send new tokens
  sendRefreshToken(res, refreshToken);
  return res.send({ accesstoken: accessToken });
});

// Protected route
router.post('/protected', (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId) {
      res.send({ data: 'This is protected data.' });
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
