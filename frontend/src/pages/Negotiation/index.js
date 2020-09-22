import React, { useState, useEffect } from 'react';
import M from "materialize-css";
import Swal from 'sweetalert2';

import Menu from '../Menu';
//import NewCustomer from './NewCustomer';
import api from '../../services/api';

import './style.css'

export default function Negotiation() {

    return(
        <div>
            <Menu />
            <div className="container">
                <h1>Elaboração de Orçamento</h1>
            </div>
            <div className="negotiation-container">
                <div className="item-container">
                    1
                </div>
                <div className="value-container">
                    <p>Produtos:</p>
                    <p>Serviços:</p>
                </div>

            </div>
        </div>
    );
}