const express = require('express');

const routes = express.Router();

const productController = require('./controllers/productController');
const clientController = require('./controllers/clientController');
const negotiationTempController = require('./controllers/negotiationTempController');

routes.get('/products', productController.index);
routes.get('/products/select', productController.select);
routes.post('/products', productController.create);
routes.delete('/products/:id', productController.delete);

routes.get('/clients', clientController.index);
routes.get('/clients/select', clientController.select);
routes.post('/clients', clientController.create);
routes.delete('/clients/:id', clientController.delete);

routes.get('/negotiation_temp', negotiationTempController.index);
routes.post('/negotiation_temp', negotiationTempController.create);
routes.delete('/negotiation_temp/:id', negotiationTempController.delete);

module.exports = routes;