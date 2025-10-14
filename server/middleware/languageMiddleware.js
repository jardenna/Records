const languageMiddleware = (req, res, next) => {
  req.lang = req.headers['x-language'] || 'en';
  next();
};

export default languageMiddleware;
