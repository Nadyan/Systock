const express = require('express');

const routes = express.Router();

const productController = require('./controllers/productController');
const clientController = require('./controllers/clientController');
const negotiationController = require('./controllers/negotiationController');
const fornecedorController = require('./controllers/fornecedorController');

routes.get('/products', productController.index);
routes.get('/products/select', productController.selectField);
routes.get('/products/:id', productController.getProduct);
routes.get('/products/getFornecs/:codigo', productController.getFornecs);
routes.post('/products', productController.create);
routes.delete('/products/:id', productController.delete);

routes.get('/clients', clientController.index);
routes.get('/clients/select', clientController.selectField);
routes.post('/clients', clientController.create);
routes.delete('/clients/:id', clientController.delete);

routes.get('/negotiation', negotiationController.index);
routes.post('/negotiation', negotiationController.create);
routes.delete('/negotiation/delete/:idTemp', negotiationController.delete);
routes.delete('/negotiation/deleteAll', negotiationController.deleteAll);

routes.get('/fornecedores', fornecedorController.index);
routes.get('/fornecedores/select', fornecedorController.selectField);
routes.get('/fornecedores/:id', fornecedorController.getFornecedor);
routes.post('/fornecedores', fornecedorController.create);
routes.delete('/fornecedores/:id', fornecedorController.delete);

module.exports = routes;
