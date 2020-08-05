import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import Routes from './routes';

import './global.css';

export default function App() {

  M.AutoInit();

  return (
    <Routes />
  );
}
