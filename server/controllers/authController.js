import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// Register

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    const checkUser = await User.findOne({ email });
    console.log(checkUser, 'HELLE');
    if (checkUser) {
      return res.json({
        success: false,
        message: 'User already exists',
      });
    }

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

// login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.json({
        success: false,
        message: 'User not found',
      });
    }

    // const user = await User.create({ userName, email, password });
    // res.status(201).json({ user });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: `${error.message} - User login failed`,
    });
  }
};

export { loginUser, registerUser };
