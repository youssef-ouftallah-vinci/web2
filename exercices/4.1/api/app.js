const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:7000', 'http://localhost:666'],
};

const filmsRouter = require('./routes/films');
const authRouter = require('./routes/auths');

const app = express();

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/films', filmsRouter);
app.use('/auths', authRouter);

module.exports = app;
