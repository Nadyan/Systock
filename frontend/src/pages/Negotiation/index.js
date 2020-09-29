import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import M from "materialize-css";

import AddProduct from './AddProduct';
import Menu from '../Menu';
import api from '../../services/api';

import './style.css'

export default function Negotiation() {

    const [itens, setItens] = useState([]);
    const [atualizaItens, setAtualizaItens] = useState(false);
    const [cliente, setCliente] = useState(''); //cliete.value, cliente.label
    const [listaClientes, setListaClientes] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);

    const [valorTotal, setValorTotal] = useState(0);
    const [valorProdutos, setValorProdutos] = useState(0);
    const [valorServicos, setValorServicos] = useState(0);

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {dismissible: false});
    });

    useEffect(() => {
        api.get('clients/select').then(response => {
            setListaClientes(response.data);
        });
        api.get('products/select').then(response => {
            setListaProdutos(response.data);
        });
    }, [atualizaItens]);

    function refreshProductList() {
        api.get('negotiation_temp').then(response => {
            setItens(response.data);
        });
    }

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
                            <a className="waves-effect waves-light btn botao-produto light-blue accent-4 modal-trigger" href="#modalAddProduct"><i className="material-icons left">add</i>Adicionar Produto</a>
                            <a className="waves-effect waves-light btn botao-servico green modal-trigger" href="#modalAddMO"><i className="material-icons left">add</i>Adicionar Serviço</a>
                            <AddProduct refreshProductList={refreshProductList} listaProdutos={listaProdutos}/>
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