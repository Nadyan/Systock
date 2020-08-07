import React from 'react';
import M from "materialize-css";

import Menu from '../Menu';
import NewProduct from './NewProduct';

import './style.css'

export default function Home() {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {});

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
                <a className="btn-floating btn-large tooltipped fab modal-trigger" data-position="left" data-tooltip="Cadastrar novo produto" href="#modalNewProduct">
                    <i className="large material-icons">library_add</i>
                </a>
                <NewProduct />
            </div>
        </div>
    );
}