require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const indexRouter = require('./routes/index');

const app = express();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const MEDIA_SERVICE_URL = process.env.MEDIA_SERVICE_URL || 'http://localhost:8080';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use(
  ['/users', '/refresh_tokens'],
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ status: 'error', message: 'User service tidak dapat dijangkau' });
      },
    },
  })
);

app.use(
  '/media',
  createProxyMiddleware({
    target: MEDIA_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ status: 'error', message: 'Media service tidak dapat dijangkau' });
      },
    },
  })
);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: `Route ${req.method} ${req.originalUrl} tidak ditemukan` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('API Gateway berjalan di port ' + PORT);
});

module.exports = app;
