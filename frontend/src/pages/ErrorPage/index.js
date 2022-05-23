import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import systock_logo from '../../assets/systock_logo.png';

export default function Logon() {

    const history = useHistory();

    return (
        <div className="error-container">
            <div>
                <img src={systock_logo} alt="Systock" />
            </div>
            <div>  
                <h1>Você precisa efetuar o login para acessar essa página</h1>
            </div>
            <div className="buttons-div">
                <Link className="button btn waves-effect waves-light blue darken-1" to="/" >Efetuar login
                    <i className="material-icons left">login</i>
                </Link>
            </div>
        </div>
    );
}