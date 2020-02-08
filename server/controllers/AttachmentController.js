const Attachment = require('../models/Attachment');

module.exports = {
  async create(req, res) {
    const attachment = new Attachment({
      title: req.body.title,
      user: req.user._id,
      filepath: req.body.filepath
    });

    try {
      const savedAttachment = await attachment.save();
      res.send(savedAttachment.toJSON());
    } catch (error) {
      res.status(400).send();
    }
  },
  async destroy(req, res) {
    const userid = req.user._id;
    const { id } = req.params;
    const attachment = await Attachment.findById(id);

    if (!attachment) {
      return res.status(400).send({ error: "Attachment doesn't exist" });
    } else if (attachment.user != userid) {
      return res.status(401).send({ error: 'Access Denied' });
    }
    try {
      const result = attachment.remove();

      if (result) {
        return res.send(`Attachment: "${result.title}" deleted`);
      } else {
        return res.status(400).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.send({ error: error.message });
    }
  }
};
