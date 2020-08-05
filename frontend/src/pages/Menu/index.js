import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import './style.css';

import logo from '../../assets/SYStock_logo_branco.png';
import rocket_white from '../../assets/rocket_white.png';

export default function Menu() {

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });

    return(
        <div>
            <nav>
                <div className="nav-wrapper">
                    <ul className="left">
                        <li><a href=""><i data-target="slide-out" className="material-icons sidenav-trigger">menu</i></a></li>
                        <li><img src={logo} className="navbar-logo"/></li>
                    </ul>
                    <ul className="right">
                        <li><a href=""><i className="material-icons">search</i></a></li>
                        <li><a href=""><i className="material-icons">refresh</i></a></li>
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
                <li><a href="" className="waves-effect"><i className="material-icons">people</i>Cliente</a></li>
                <li><a href="" className="waves-effect"><i className="material-icons">view_quilt</i>Produto</a></li>
                
                <li><a className="subheader">Operação</a></li>
                <li><a href="" className="waves-effect"><i className="material-icons">list</i>Orçamento</a></li>
                <li><a href="" className="waves-effect"><i className="material-icons">shopping_cart</i>Venda</a></li>
                <li><a href="" className="waves-effect"><i className="material-icons">play_for_work</i>Entrada</a></li>
                
                <li><a className="subheader">Relatório</a></li>
                <li><a href="" className="waves-effect"><i className="material-icons">timeline</i>Vendas</a></li>
                <li><a href="" className="waves-effect"><i className="material-icons">toc</i>Clientes</a></li>
                <li><a href="" className="waves-effect"><i className="material-icons">view_comfy</i>Estoque</a></li>
            </ul>
        </div>
    );
}