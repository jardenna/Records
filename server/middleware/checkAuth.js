const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
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
