const { Router } = require('express');

const rutaPrincipal = Router();

const productosRouter = require('./productos');

rutaPrincipal.use('/productos',productosRouter);

module.exports = rutaPrincipal;