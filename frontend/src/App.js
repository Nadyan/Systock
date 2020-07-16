import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import Logon from './pages/Logon';
import './global.css';

function App() {

  M.AutoInit();
  
  return (
    <Logon />
  );
}

export default App;
