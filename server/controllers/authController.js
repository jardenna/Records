import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import generateTokenAndSetCookie from '../utils/token.js';
import { t } from './translator.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: t('userAlreadyExist', req.lang),
      });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser, res);

    res.status(200).json({
      success: true,
      message: t('signupSucceeded', req.lang),
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('signupFailed', req.lang),
    });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: t('noUser', req.lang),
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password,
    );

    if (!checkPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: t('invalidPassword', req.lang),
      });
    }

    generateTokenAndSetCookie(checkUser, res);

    res.status(200).json({
      success: true,
      message: t('loginSucceeded', req.lang),
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

  if (!token) {
    return res.status(401).json({
      success: false,
      message: t('unAuthorizedUser', req.lang),
    });
  }

  if (tokenBlacklist.has(token)) {
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

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  const token = req.cookies.token;

  if (token) {
    tokenBlacklist.add(token); // Add token to blacklist
  }

  res.status(200).json({
    success: true,
    message: t('loggedOut', req.lang),
  });
};

export { authMiddleware, loginUser, logoutUser, registerUser };
