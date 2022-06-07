import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { requireLogin } from './services/authorization';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Home from './pages/Home';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Negotiation from './pages/Negotiation';
import Parameters from './pages/Parameters';
import NotFound from './pages/RedirectPages/notFound';
import Loading from './pages/RedirectPages/loading';

export default function Routes() {
    return (
        <BrowserRouter>
            <GuardProvider guards={[requireLogin]} error={NotFound} loading={Loading}>
                <Switch>
                    <Route path="/" exact component={Logon} />
                    <Route path="/register" component={Register} />
                    <GuardedRoute  path="/home" meta={{ authenticate: true }} component={Home} />
                    <GuardedRoute path="/products" meta={{ authenticate: true }} component={Products} />
                    <GuardedRoute path="/customers" meta={{ authenticate: true }} component={Customers} />
                    <GuardedRoute path="/negotiation" meta={{ authenticate: true }} component={Negotiation} />
                    <GuardedRoute path="/parameters" meta={{ authenticate: true }} component={Parameters} />
                </Switch>
            </GuardProvider>
        </BrowserRouter>
    );
}