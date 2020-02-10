/* eslint-disable no-console */
// Import Dependencies
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  perMessageDeflate: false
});
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const aws = require('aws-sdk');
aws.config.region = 'eu-west-1';

//Import Config
require('dotenv').config();
const S3_BUCKET = process.env.S3_BUCKET;
const port = process.env.PORT || 8001;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_URL = process.env.DB_URL;
const DB_COLLECTION = process.env.DB_COLLECTION;
const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}${DB_COLLECTION}`;

console.log = (function(log, inspect) {
  return function() {
    return log.apply(
      this,
      Array.prototype.map.call(arguments, function(arg) {
        return inspect(arg, { depth: 1, colors: true });
      })
    );
  };
})(console.log, require('util').inspect);

// Connect to DB
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to DB');
    }
  }
);

// Logging middleware
app.use(morgan('tiny'));

//Other Middleware
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());

//Routing
require('./routes')(app);

//socket.io
require('./socket.io/socketio')(io);

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const hash = Math.round(Math.random() * 1000 + Math.random() * 1000);
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
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3-eu-west-1.amazonaws.com/profile-images/${hash}-${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
  console.log(req.body);
  res.send(req.body);
});

server.listen(port, () => console.log(`Server running on port ${port}.`));
