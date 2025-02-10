import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { languageMiddleware } from '../middleware/languageMiddleware.js';
const router = express.Router();

router.post('/register', languageMiddleware, registerUser);
router.post('/login', languageMiddleware, loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', languageMiddleware, authMiddleware, (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: 'Authenticated user',
    user,
  });
});

export default router;
