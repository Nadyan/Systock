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

    const [valorTotal, setValorTotal] = useState(0);
    const [valorProdutos, setValorProdutos] = useState(10.58);
    const [valorServicos, setValorServicos] = useState(112.76);

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
                                    <strong className="header-info">{`${item.codigo} - ${item.marca} ${item.modelo}`}</strong>
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
                        <div className="value-item">
                            <p>Produtos:</p>
                            <strong>
                                {
                                    Intl.NumberFormat(
                                        'pt-BR', 
                                        {
                                            style: 'currency',
                                            currency:'BRL'
                                        }
                                    ).format(valorProdutos)
                                }
                            </strong>
                        </div>
                        <div className="value-item">
                            <p>Serviços:</p>
                            <strong>
                                {
                                    Intl.NumberFormat(
                                        'pt-BR', 
                                        {
                                            style: 'currency',
                                            currency:'BRL'
                                        }
                                    ).format(valorServicos)
                                }
                            </strong>
                        </div>
                        <div className="divider"></div>
                        <div className="value-item">
                            <p>Total:</p>
                            <strong>
                                {
                                    Intl.NumberFormat(
                                        'pt-BR', 
                                        {
                                            style: 'currency',
                                            currency:'BRL'
                                        }
                                    ).format(valorTotal)
                                }
                            </strong>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}