const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(400).send({ error: 'Token is missing.' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified.user;
    next();
  } catch (error) {
    console.log('Invalid Token');
    console.log(error);

    res.status(400).send({ error: 'Invalid Token' });
  }
};
