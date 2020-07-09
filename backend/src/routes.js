const express = require('express');

const routes = express.Router();

const productController = require('./controllers/productController');

routes.get('/products', productController.index);
routes.post('/products', productController.create);
routes.delete('/products/:id', productController.delete);

module.exports = routes;