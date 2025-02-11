import jwt from 'jsonwebtoken';
import { t } from '../utils/translator.js';

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

export { authMiddleware, tokenBlacklist };
