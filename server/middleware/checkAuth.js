import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  //Protect routes if not loged in
  try {
    const token = '';

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userData = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      message: 'Auth failed please log in',
    });
  }

  next();
};
export { checkAuth };
