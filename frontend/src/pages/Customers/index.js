import React, { useState, useEffect } from 'react';
import M from "materialize-css";
import Swal from 'sweetalert2';

import Menu from '../Menu';
//import NewCustomer from './NewCustomer';
import api from '../../services/api';

import './style.css'
import NewCustomer from './NewCustomer';

export default function Customers() {
    const [clientes, setCustomers] = useState([]);
    const [atualizaClientes, setAtualizaClientes] = useState(false);

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {direction: 'up', hoverEnabled: true});

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {dismissible: false});

        var elems = document.querySelectorAll('.tooltipped');
        var options = {
            inDuration: 100, 
            outDuration: 100,
            margin: 0,
            exitDelay: 0,
            enterDelay: 0
        }
        var instances = M.Tooltip.init(elems, options);

        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, '');
    });

    function refreshCustomerList() {
        api.get('clients').then(response => {
            setCustomers(response.data);
        })
    }

    useEffect(() => {
        api.get('clients').then(response => {
            setCustomers(response.data);
        })
    }, [atualizaClientes]);

    function handleDeleteCustomer(id) {
        try {
            Swal.fire({
                title: 'Excluir cliente?',
                text: "Essa ação não poderá ser desfeita!",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: "Não",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!'
            }).then((result) => {
                if (result.value) {
                    api.delete(`clients/${id}`);
                
                    Swal.fire({
                        title: 'Cliente excluído com sucesso',
                        type: 'success',
                        timer: 1800,
                        showConfirmButton: false
                    });
                    setCustomers(clientes.filter(cliente => cliente.id !== id));
                }
            });
        } catch (err) {
            Swal.fire({
                type: 'error',
                title: 'Erro ao excluir cliente',
                text: 'Tente novamente',
                showConfirmButton: true,
                confirmButtonText: "OK"
            });
        }
    }

    function handleLocateOnMap(endereco, bairro, cidade, uf) {
        // TO DO
        // Locate customer address on google maps and show on screen
    }

    return(
        <div>
            <Menu />
            
            <div className="customer-container">

                <h1>Clientes Cadastrados</h1>

                <ul>
                    {clientes.map(cliente => (
                        <li key={cliente.id}>
                            <strong className="header-info">{cliente.nome}</strong>
                            <div className="divider"></div>
                            <div className="info-container">
                                <strong>Endereço:</strong>
                                <p>{`${cliente.endereco} - ${cliente.bairro} - ${cliente.cidade} - ${cliente.uf}`}</p>
                            </div>
                            <div className="info-container">
                                {(
                                    () => {
                                        if (cliente.tipo === 'F') {
                                            return <strong>CPF:</strong>
                                        } else {
                                            return <strong>CNPJ:</strong>
                                        }
                                    }
                                )()}
                                <p>{cliente.cpfCnpj}</p>
                            </div>
                            <p>{cliente.email}</p>
                            <div className="option-button">
                                <button title="Localizar no mapa" onClick={() => handleLocateOnMap(cliente.endereco, cliente.bairro, cliente.cidade, cliente.uf)} className="tooltipped" data-position="bottom" data-tooltip="I am a tooltip">
                                    <i className="material-icons location">location_on</i>
                                </button>
                                <button title="Editar">
                                    <i className="material-icons edit tooltiped">create</i>
                                </button>
                                <button onClick={() => handleDeleteCustomer(cliente.id)} title="Excluir">
                                    <i className="material-icons delete">delete</i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="fixed-action-btn">
                    <a className="btn-floating btn-large fab modal-trigger tooltipped" href="#modalNewCustomer" data-position="left" data-tooltip="Cadastrar novo cliente">
                        <i className="material-icons">library_add</i>
                    </a>
                <NewCustomer refreshCustomerList={refreshCustomerList}/>
            </div>
        </div>
    );
}