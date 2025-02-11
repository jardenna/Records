import bcrypt from 'bcrypt';
import { tokenBlacklist } from '../middleware/authMiddleware.js';
import User from '../models/UserModel.js';
import { validatePassword } from '../utils/passwordValidator.js';
import generateTokenAndSetCookie from '../utils/token.js';
import { t } from '../utils/translator.js';

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

    if (password) {
      const passwordErrorKey = validatePassword(password);

      if (passwordErrorKey) {
        return res.status(400).json({
          message: t(passwordErrorKey, req.lang),
        });
      }
    }

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

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  try {
    const checkUser = await User.findOne({ email });

    if (!email) {
      return res.status(401).json({
        message: 'Email must be provided',
      });
    }

    if (!validEmail.test(email)) {
      return res.status(422).json({
        message: 'Invalid email address',
      });
    }

    if (!password) {
      return res.status(401).json({
        message: 'Password must be provided',
      });
    }

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

export { loginUser, logoutUser, registerUser };
