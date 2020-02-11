const User = require('../models/User');
const bcrypt = require('bcryptjs');
module.exports = {
  async update(req, res) {
    const { email, password } = req.body;
    const userId = req.user._id;

    try {
      const emailExist = await User.findOne({ email }).lean();
      if (emailExist) {
        return res.status(400).send({ error: 'Email already in use.' });
      }

      const user = await User.findById(userId);
      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass) {
        res.status(401).send({ error: 'Wrong Password' });
      }

      user.email = email;
      await user.save();
      res.send({ message: 'Email Changed Succesfully' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
