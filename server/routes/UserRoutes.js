import { compare, hash } from 'bcrypt';
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

//Delete User by Id
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await User.deleteOne({ _id: userId });
    res.status(200).json({
      message: 'User was deleted succesfully',
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

//Get all users
router.get('/', async (req, res) => {
  try {
    const user = await User.find();

    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

//Get user by id
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

//Add new user
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hash(password, 10);

  try {
    const user = await User.find({ email });

    if (user.length > 0) {
      return res.status(409).json({
        message: 'User already exists',
      });
    } else {
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();

      const signedUpUser = user && user._id;
      const accesstoken = createAccessToken(signedUpUser);
      const refreshtoken = createRefreshToken(signedUpUser);

      user.refreshtoken = refreshtoken;

      sendRefreshToken(res, refreshtoken);
      sendAccessToken(res, req, accesstoken);
    }

    res.status(200).json({
      message: 'User was created succesfully',
      name,
    });
  } catch (error) {
    res.status(500).json({
      message: `Signup failed ${error.message}`,
      error,
    });
  }
});

//Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  try {
    const user = await User.find({ email });
    // console.log(user[0].name);
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

    //Does the user exist
    if (user.length === 0) {
      return res.status(401).json({
        message: 'User does not exist',
      });
    }
    const valid = await compare(password, user[0].password);
    //Wrong password
    if (!valid) {
      return res.status(401).json({
        message: 'Invalid password',
      });
    }

    const accesstoken = createAccessToken(user[0]._id);
    const refreshtoken = createRefreshToken(user[0]._id);

    user[0].refreshtoken = refreshtoken;

    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken, user[0].name);
  } catch (error) {
    res.status(401).json({
      message: 'Auth failed',
    });
  }
});

// 3. Logout a user
router.post('/logout', (_req, res) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });

  return res.send({
    message: 'Logged out',
  });
});

router.post('/refresh_token', async (req, res) => {
  const token = req.cookies.refreshtoken;
  // token is valid, check if user exist
  const { email } = req.body;
  const user = await User.find({ email });

  // If we don't have a token in our request
  if (!token) return res.send({ accesstoken: '' });
  // We have a token, let's verify it!
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }

  if (user.length === 0) return res.send({ accesstoken: '' });
  // user exist, check if refreshtoken exist on user
  if (user.refreshtoken !== token) return res.send({ accesstoken: '' });
  // token exist, create new Refresh- and accesstoken
  const accesstoken = createAccessToken(user.id);
  const refreshtoken = createRefreshToken(user.id);
  // update refreshtoken on user in db
  // Could have different versions instead!
  user.refreshtoken = refreshtoken;
  // All good to go, send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
});

// 4. Protected route
router.post('/protected', async (req, res) => {
  try {
    const userId = isAuth(req);

    if (userId !== null) {
      res.send({
        data: 'This is protected data.',
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

export default router;
