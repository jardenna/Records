import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// Register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: 'User already exists. Please login',
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
      message: 'Registration successful',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `User registration failed`,
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
        message: 'User not found. Please register first',
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password,
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: 'Invalid password',
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      'CLIENT_SECRET_KEY',
      { expiresIn: '60m' },
    );

    res.cookie('token', token, { httpOnly: true, secure: false }).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.userName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message} - User login failed`,
    });
  }
};
// Middleware to check if user is logged in

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user',
    });
  }

  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user',
    });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out successfully!',
  });
};

export { authMiddleware, loginUser, logoutUser, registerUser };
