const User = require('../models/User');
const bcrypt = require('bcryptjs');
module.exports = {
  async update(req, res) {
    const { newPassword, oldPassword } = req.body;
    const userId = req.user._id;

    try {
      const user = await User.findById(userId);
      const validPass = await bcrypt.compare(oldPassword, user.password);

      if (!validPass) {
        res.status(401).send({ error: 'Wrong Password' });
      }

      //Hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashPassword;
      await user.save();
      res.send({ message: 'Password Changed Succesfully' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
