import React from 'react';

import Menu from '../Menu';
import logo from '../../assets/rocket_black.png';

import './style.css'

export default function Home() {
    //const userName = localStorage.getItem('userName');
    const token = sessionStorage.getItem('auth-token');

    // TO DO: Verificar validade do token

    return(
        <div>
            <Menu />
            <div className="background-container">
                <img src={logo} className="backgroung-home-logo" />
            </div>
        </div>
    );
}