import React from 'react';

import './style.css';
import systock_logo from '../../assets/systock_logo.png';

export default function NotFound() {

    return (
        <div className="error-container">
            <div>
                <img src={systock_logo} alt="Systock" />
            </div> 
            
            <div className="loader"></div>
        </div>
    );
}
