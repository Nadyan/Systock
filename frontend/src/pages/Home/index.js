import React from 'react';

import Menu from '../Menu';
import logo from '../../assets/rocket_black.png';

export default function Home() {
    return(
        <div>
            <Menu />
            <div className="background-container">
                <img src={logo} className="backgroung-home-logo" alt="SYStock"/>
            </div>
        </div>
    );
}