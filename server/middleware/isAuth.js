import jwt from 'jsonwebtoken';

const isAuth = (req) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) throw new Error('You need to login.');

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  return decoded.userId; // Return the userId from the token payload
};

export default isAuth;
