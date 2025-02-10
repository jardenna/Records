import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { t } from './translator.js';

// Register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: t('userAlreadyExist', req.lang),
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: t('signupSucceeded', req.lang),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('signupFailed', req.lang),
    });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.json({
        success: false,
        message: t('noUser', req.lang),
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password,
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: t('invalidPassword', req.lang),
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60m' },
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({
        success: true,
        message: t('loginsucceeded', req.lang),
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          username: checkUser.username,
        },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message} - ${t('loginFailed', req.lang)}`,
    });
  }
};

// Middleware to check if user is logged in
const tokenBlacklist = new Set(); // Store invalidated tokens in memory

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token || tokenBlacklist.has(token)) {
    return res.status(401).json({
      success: false,
      message: t('unAuthorizedUser', req.lang),
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: t('unAuthorizedUser', req.lang),
    });
  }
};

// Logout
const logoutUser = (req, res) => {
  const token = req.cookies.token;

  if (token) {
    tokenBlacklist.add(token); // Add token to blacklist
  }

  res.clearCookie('token').json({
    success: true,
    message: t('loggedOut', req.lang),
  });
};

export { authMiddleware, loginUser, logoutUser, registerUser };
