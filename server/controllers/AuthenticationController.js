const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function jwtSignUser(user) {
  return jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: '5 days'
  });
}

module.exports = {
  async register(req, res) {
    //Check if email exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send({ error: 'Email already in use.' });
    }
    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const imageNumber = Math.floor(Math.random() * 50);
    const profileImage = `https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`;
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      profileImage
    });
    try {
      const savedUser = await user.save();
      const savedUserJson = savedUser.toJSON();
      //Respond with the user id
      res.send({
        user: savedUserJson,
        token: jwtSignUser(savedUserJson)
      });
    } catch (err) {
      res.status(400).send({ error: err });
    }
  },
  async login(req, res) {
    //Check if email exists
    const user = await User.findOne({ email: req.body.email }).populate({
      path: 'boards',
      select: ['_id', 'title']
    });
    if (!user) return res.status(403).send({ error: "Email doesn't exist." });

    //Check correct password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(403).send({ error: 'Password is wrong.' });

    const userJson = user.toJSON();
    //Create and assign JWT
    const token = jwtSignUser(userJson);
    res.header('auth-token', token).send({
      user: userJson,
      token
    });
  }
};
