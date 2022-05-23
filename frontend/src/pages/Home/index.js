import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Menu from '../Menu';
import logo from '../../assets/rocket_black.png';
import verifyToken from '../../services/verifyToken';

import './style.css'

export default function Home() {
    const history = useHistory();

    useEffect(() => {  
        (async () => {
            const validToken = await verifyToken();
            if (!validToken) {
                history.push('/ErrorPage');
            }
        })();
    }, []);

    return(
        <div>
            <Menu />
            <div className="background-container">
                <img src={logo} className="backgroung-home-logo" />
            </div>
        </div>
    );
}