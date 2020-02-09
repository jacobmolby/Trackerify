/* eslint-disable no-console */
// Import Dependencies
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

//Import Config
require('dotenv').config();
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

server.listen(port, () => console.log(`Server running on port ${port}.`));
