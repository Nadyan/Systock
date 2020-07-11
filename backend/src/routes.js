const express = require('express');

const routes = express.Router();

const productController = require('./controllers/productController');
const clientController = require('./controllers/clientController');

routes.get('/products', productController.index);
routes.post('/products', productController.create);
routes.delete('/products/:id', productController.delete);

routes.get('/clients', clientController.index);
routes.post('/clients', clientController.create);
routes.delete('/clients/:id', clientController.delete);

module.exports = routes;