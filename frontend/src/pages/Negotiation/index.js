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
            
            <div className="negotiation-container">
                

            </div>
        </div>
    );
}