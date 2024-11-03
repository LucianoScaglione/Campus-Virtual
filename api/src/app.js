const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const UsersRouters = require('./routes/Users.js');
const CurriculumUnitRouters = require('./routes/CurriculumUnit.js');
const PublicationsRouters = require('./routes/Publications.js');

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};


require('./db.js');

const server = express();

server.name = 'API';
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use('/uploads', express.static('uploads'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.use('/users', UsersRouters);
server.use('/curriculumunit', CurriculumUnitRouters);
server.use('/publications', PublicationsRouters)
server.use(cors(corsOptions));
server.use(express.json());

module.exports = server;