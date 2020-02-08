const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      return res.status(400).send({ error: 'Missing token' });
    }
    const token = req.header('Authorization').split(' ')[1];

    if (!token) return res.status(400).send({ error: 'Token is missing.' });

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid Token' });
  }
};
