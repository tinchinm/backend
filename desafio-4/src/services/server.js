const express = require('express');
const app = express();

const mainRouter = require('../routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', mainRouter );

module.exports = app;