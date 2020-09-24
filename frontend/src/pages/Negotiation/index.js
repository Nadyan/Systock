import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import M from "materialize-css";
import Swal from 'sweetalert2';

import Menu from '../Menu';
//import NewCustomer from './NewCustomer';
import api from '../../services/api';

import './style.css'

export default function Negotiation() {

    const [itens, setItens] = useState([]);
    const [atualizaItens, setAtualizaItens] = useState(false);
    const [cliente, setCliente] = useState(''); //cliete.value, cliente.label
    const [listaClientes, setListaClientes] = useState([]);

    useEffect(() => {
        api.get('clients/select').then(response => {
            setListaClientes(response.data);
        });
        api.get('products').then(response => {
            setItens(response.data);
        });
    }, [atualizaItens]);

    function handleDeleteItem(id) {
        try {
            Swal.fire({
                title: 'Excluir item?',
                text: "Essa ação não poderá ser desfeita!",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: "Não",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!'
            }).then((result) => {
                if (result.value) {
                    api.delete(`negotiation_temp/${id}`);
                    setItens(itens.filter(item => item.id !== id));
                }
            });
        } catch (err) {
            Swal.fire({
                type: 'error',
                title: 'Erro ao excluir item',
                text: 'Tente novamente',
                showConfirmButton: true,
                confirmButtonText: "OK"
            });
        }
    }

    return(
        <div>
            <Menu />
            
            <div className="container">
                <h1>Elaboração de Orçamento</h1>
            
                <div className="input-field">
                    <Select
                        options={listaClientes}
                        onChange={setCliente}
                        defaultValue={cliente}
                        placeholder="Escolher cliente..."
                    />
                </div>
                
                <div className="negotiation-container">
                    <div className="item-container">
                        <ul>
                            {itens.map(item => (
                                <li key={item.id}>
                                    <strong className="header-info">{item.codigo}</strong>
                                    <strong className="header-info">{`${item.marca} ${item.modelo}`}</strong>
                                    <div className="divider"></div>
                                    <div className="info-container">
                                        <strong>Fornecedor:</strong>
                                        <p>{item.fornecedor}</p>
                                    </div>
                                    <div className="info-container">
                                        <strong>Valor:</strong>
                                        <p>
                                            {
                                                Intl.NumberFormat(
                                                    'pt-BR', 
                                                    {
                                                        style: 'currency',
                                                        currency:'BRL'
                                                    }
                                                ).format(item.valor)
                                            }
                                        </p>
                                    </div>
                                    <p>{item.descricao}</p>
                                    <div className="option-button">
                                        <button>
                                            <i className="material-icons edit tooltiped">create</i>
                                        </button>
                                        <button onClick={() => handleDeleteItem(item.id)}>
                                            <i className="material-icons delete">delete</i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="option-buttons-container">
                            <a class="waves-effect waves-light btn botao-produto light-blue accent-4"><i class="material-icons left">add</i>Adicionar Produto</a>
                            <a class="waves-effect waves-light btn botao-servico green"><i class="material-icons left">add</i>Adicionar Serviço</a>
                        </div>
                    </div>

                    <div className="value-container">
                        <p>Produtos:</p>
                        <p>Serviços:</p>
                    </div>

                </div>
            </div>
        </div>
    );
}