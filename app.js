require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rate-limiter');
const routes = require('./routes/index');
const { handlerErrors } = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const options = {
  origin: [
    'http://localhost:3000',
    'https://panfilok.diploma.nomoredomains.club',
    'http://panfilok.diploma.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT, DATA_BASE } = require('./utils/config');

const app = express();

app.use('*', cors(options));
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect(DATA_BASE);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handlerErrors);

app.listen(PORT);
