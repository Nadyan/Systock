require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const estrategiasAutenticacao = require('./authentication/strategy');

const app = express();

app.use(cors({ exposedHeaders: 'Authorization' })); // dev
/* se for em prod, usar o cors assim:
    app.use(cors({
        origin: "http://meusite.com"
    }))
*/
app.use(express.json());
app.use(routes);

app.listen(3333);