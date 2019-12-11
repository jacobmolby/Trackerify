// Import Dependencies
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//Import Config
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8000;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_URL = process.env.DB_URL;
const DB_COLLECTION =
  process.env.DB_COLLECTION || 'test?retryWrites=true&w=majority';
const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}${DB_COLLECTION}`;

// Connect to DB
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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
app.use(cors());
app.use(express.json());

//Routing
require('./routes')(app);

//socket.io
require('./socketio')(io);

server.listen(port, () => console.log(`Server running on port ${port}.`));
