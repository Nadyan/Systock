import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import logo from '../../assets/SYStock_logo_branco.png';
import rocket_white from '../../assets/rocket_white.png';

export default function Menu() {

    const history = useHistory();

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});

        var elems = document.querySelectorAll('.tooltipped');
        var options = {
            inDuration: 100, 
            outDuration: 100,
            margin: 0,
            exitDelay: 0,
            enterDelay: 0
        }
        var instances = M.Tooltip.init(elems, options);
    });

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="menu-container">
            <nav>
                <div className="nav-wrapper">
                    <ul className="left">
                        <li><a href=""><i data-target="slide-out" className="material-icons sidenav-trigger">menu</i></a></li>
                        <li><img src={logo} className="navbar-logo"/></li>
                    </ul>
                    <ul className="right" style={{marginRight: "25px"}}>
                        <li><a href="/home" className="tooltipped" data-position="bottom" data-tooltip="Ir para a página inicial"><i className="material-icons">home</i></a></li>
                        <li><a href="" className="tooltipped" data-position="bottom" data-tooltip="Pesquisar"><i className="material-icons">search</i></a></li>
                        <li><button onClick={handleLogout} className="tooltipped" data-position="bottom" data-tooltip="Sair"><i className="material-icons">power_settings_new</i></button></li>
                    </ul>
                </div>
            </nav>

            <ul id="slide-out" className="sidenav">
                <li>
                    <div className="background center-align" style={{marginBottom:"15px"}}>
                        <img className="center-align sidenav-logo" src={rocket_white}/>
                    </div>
                </li>
                <li><a className="subheader">Cadastro</a></li>
                <li><a href="/customers" className="waves-effect"><i className="material-icons">people</i>Cliente</a></li>
                <li><a href="/products" className="waves-effect"><i className="material-icons">view_quilt</i>Produto</a></li>
                
                <li><a className="subheader">Operação</a></li>
                <li><a href="/negotiation" className="waves-effect"><i className="material-icons">list</i>Orçamento</a></li>
                
                {
                    /*
                        <li><a href="" className="waves-effect"><i className="material-icons">shopping_cart</i>Venda</a></li>
                        <li><a href="" className="waves-effect"><i className="material-icons">play_for_work</i>Entrada</a></li>
                        
                        <li><a className="subheader">Relatório</a></li>
                        <li><a href="" className="waves-effect"><i className="material-icons">timeline</i>Vendas</a></li>
                        <li><a href="" className="waves-effect"><i className="material-icons">toc</i>Clientes</a></li>
                        <li><a href="" className="waves-effect"><i className="material-icons">view_comfy</i>Estoque</a></li>
                    */
                }
            </ul>
        </div>
    );
}