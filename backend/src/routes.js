const express = require('express');
const passport = require('passport');
const routes = express.Router();

const middlewares = require('./authentication/middlewares');

const productController = require('./controllers/productController');
const clientController = require('./controllers/clientController');
const negotiationController = require('./controllers/negotiationController');
const fornecedorController = require('./controllers/fornecedorController');
const servicosController = require('./controllers/servicoController');
const tiposProdController = require('./controllers/tiposProdController');
const userController = require('./controllers/userController');

routes.post('/users', 
            middlewares.bearer, 
            userController.create);
routes.get('/users', userController.index);
routes.get('/users/id/:id', userController.getUserById);
routes.get('/users/email/:email', userController.getUserByEmail);
routes.delete('/users/:id', userController.delete);
routes.post('/users/login', 
            middlewares.local,
            userController.login);

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

routes.get('/servicos', servicosController.index);
routes.get('/servicos/select', servicosController.selectField);
routes.get('/servicos/:id', servicosController.getServico);
routes.post('/servicos', servicosController.create);
routes.delete('/servicos/:id', servicosController.delete);

routes.get('/tipos_prod', tiposProdController.index);
routes.get('/tipos_prod/select', tiposProdController.selectField);
routes.get('/tipos_prod/:id', tiposProdController.getTipoProd);
routes.post('/tipos_prod', tiposProdController.create);
routes.delete('/tipos_prod/:id', tiposProdController.delete);

module.exports = routes;
