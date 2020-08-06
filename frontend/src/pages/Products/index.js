import React from 'react';
import M from "materialize-css";

import Menu from '../Menu';

import './style.css'

export default function Home() {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {});
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
                <a className="btn-floating btn-large tooltipped fab" data-position="left" data-tooltip="Adicionar novo produto">
                    <i className="large material-icons">library_add</i>
                </a>
            </div>
      
        </div>
    );
}