import React, { useState, useEffect } from 'react';
import M from "materialize-css";

import Menu from '../Menu';
import NewProduct from './NewProduct';
import api from '../../services/api';

import './style.css'

export default function Home() {

    const [produtos, setProdutos] = useState([]);
    const [atualizaProdutos, setAtualizaProdutos] = useState(false);

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {direction: 'up', hoverEnabled: true});

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {dismissible: false});
    });

    useEffect(() => {
        api.get('products').then(response => {
            setProdutos(response.data);
        })
    }, [atualizaProdutos]);

    async function handleDeleteProduct(id) {
        try {
            await api.delete(`products/${id}`);
            setProdutos(produtos.filter(produto => produto.id !== id));
        } catch (err) {
            alert('Erro ao deletar produto.');
        }
    }

    return(
        <div>
            <Menu />
            
            <div className="product-container">

                <h1>Produtos Cadastrados</h1>

                <ul>
                    {produtos.map(produto => (
                        <li key={produto.id}>
                            <strong>Tipo</strong>
                            <p>{produto.tipo}</p>

                            <strong>Marca</strong>
                            <p>{produto.marca}</p>

                            <strong>Modelo</strong>
                            <p>{produto.modelo}</p>

                            <strong>Valor Compra</strong>
                            <p>{produto.valorCompra}</p>

                            <p>{produto.descricao}</p>

                            <div className="option-button">
                                <button className="tooltipped" data-position="bottom" data-tooltip="Editar">
                                    <i className="material-icons edit">create</i>
                                </button>
                                <button onClick={() => handleDeleteProduct(produto.id)} className="tooltipped" data-position="bottom" data-tooltip="Excluir">
                                    <i className="material-icons delete">delete</i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="fixed-action-btn">
                <a className="btn-floating btn-large fab">
                    <i className="large material-icons">list</i>
                </a>
                <ul>
                    <li><a class="btn-floating red modal-trigger tooltipped" href="#modalNewType" data-position="left" data-tooltip="Administrar tipos de produtos"><i class="material-icons">library_books</i></a></li>
                    <li><a class="btn-floating green modal-trigger tooltipped" href="#modalNewProvider" data-position="left" data-tooltip="Administrar fornecedores"><i class="material-icons">business</i></a></li>
                    <li><a class="btn-floating blue modal-trigger tooltipped" href="#modalNewProduct" data-position="left" data-tooltip="Cadastrar novo produto"><i class="material-icons">library_add</i></a></li>
                </ul>
                <NewProduct />
            </div>
        </div>
    );
}