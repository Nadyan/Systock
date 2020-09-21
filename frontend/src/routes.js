import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Home from './pages/Home';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Negotiation from './pages/Negotiation';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/customers" component={Customers} />
                <Route path="/negotiation" component={Negotiation} />
            </Switch>
        </BrowserRouter>
    );
}