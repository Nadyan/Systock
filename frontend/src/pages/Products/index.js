import React from 'react';
import M from "materialize-css";

import Menu from '../Menu';
import NewProduct from './NewProduct';

import './style.css'

export default function Home() {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {direction: 'up', hoverEnabled: true});

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {dismissible: false});
    });

    return(
        <div>
            <Menu />
            
            <div className="product-container">

                <h1>Produtos Cadastrados</h1>

                <ul>
                    <li>
                        <strong>CASO:</strong>
                        <p>Caso teste</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>Descrição teste</p>

                        <strong>VALOR:</strong>
                        <p>Valor teste</p>

                        <div className="option-button">
                            <a href="" className="tooltipped" data-position="bottom" data-tooltip="Editar">
                                <i className="material-icons edit">create</i>
                            </a>
                            <a href="" className="tooltipped" data-position="bottom" data-tooltip="Excluir">
                                <i className="material-icons delete">delete</i>
                            </a>
                        </div>
                    </li>

                    <li>
                        <strong>CASO:</strong>
                        <p>Caso teste</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>Descrição teste</p>

                        <strong>VALOR:</strong>
                        <p>Valor teste</p>

                        <div className="option-button">
                            <a href="" className="tooltipped" data-position="bottom" data-tooltip="Editar">
                                <i className="material-icons edit">create</i>
                            </a>
                            <a href="" className="tooltipped" data-position="bottom" data-tooltip="Excluir">
                                <i className="material-icons delete">delete</i>
                            </a>
                        </div>
                    </li>

                    <li>
                        <strong>CASO:</strong>
                        <p>Caso teste</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>Descrição teste</p>

                        <strong>VALOR:</strong>
                        <p>Valor teste</p>

                        <div className="option-button">
                            <a href="" className="tooltipped" data-position="bottom" data-tooltip="Editar">
                                <i className="material-icons edit">create</i>
                            </a>
                            <a href="" className="tooltipped" data-position="bottom" data-tooltip="Excluir">
                                <i className="material-icons delete">delete</i>
                            </a>
                        </div>
                    </li>

                    <li>
                        <strong>CASO:</strong>
                        <p>Caso teste</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>Descrição teste</p>

                        <strong>VALOR:</strong>
                        <p>Valor teste</p>

                        <div className="option-button">
                            <a href="" className="tooltipped" data-position="bottom" data-tooltip="Editar">
                                <i className="material-icons edit">create</i>
                            </a>
                            <a href="" className="tooltipped" data-position="bottom" data-tooltip="Excluir">
                                <i className="material-icons delete">delete</i>
                            </a>
                        </div>
                    </li>
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