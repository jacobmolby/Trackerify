const User = require('../models/User');
//S3 config
const aws = require('aws-sdk');
aws.config.region = 'eu-west-1';
const S3_BUCKET = process.env.S3_BUCKET;

module.exports = {
  async create(req, res) {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const hash = Math.floor(100000 + Math.random() * 900000);
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: `profile-images/${hash}-${fileName}`,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      const returnData = {
        signedRequest: data,
        imageUrl: `https://${S3_BUCKET}.s3-eu-west-1.amazonaws.com/profile-images/${hash}-${fileName}`,
        imageKey: `${hash}-${fileName}`
      };
      res.send(returnData);
    });
  },
  async update(req, res) {
    const { imageUrl } = req.body;

    try {
      const user = await User.findById(req.user._id);
      const oldImageUrl = user.profileImage;
      user.profileImage = imageUrl;
      await user.save();
      if (oldImageUrl !== 'img/no-profile-picture.png') {
        const s3 = new aws.S3();
        const imageKey = oldImageUrl.split('s3-eu-west-1.amazonaws.com/')[1];
        const params = {
          Bucket: S3_BUCKET,
          Key: imageKey
        };
        //Deletes the old image from the S3 bucket
        s3.deleteObject(params, function(err, data) {
          if (err) console.log(err, err.stack);
        });
      }
      res.send({ message: 'Succes' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async destroy(req, res) {
    try {
      const user = await User.findById(req.user._id).select('profileImage');
      if (user.profileImage === 'img/no-profile-picture.png') {
        return res.status(400).send({ error: 'User has no profile image.' });
      }
      user.profileImage = 'img/no-profile-picture.png';
      await user.save();
      res.send({ message: 'Succes' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
