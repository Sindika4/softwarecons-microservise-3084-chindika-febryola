require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const mediaRouter = require('./routes/media');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/media', mediaRouter);

app.listen(PORT, () => {
  console.log(`Server Chindika jalan di http://localhost:${PORT}`);
});

module.exports = app;