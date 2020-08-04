import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import systock_logo from '../../assets/systock_logo.png';

export default function Logon() {
    return (
        <div className="logon-container">
            <section>
                <img src={systock_logo} alt="Systock" />
                <form>
                    <h1>Faça seu login</h1>
                    <div className="input-field">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="usuario" type="text"/>
                            <label for="usuario">Usuário</label>
                    </div>
                    <div className="input-field">
                            <i className="material-icons prefix">lock</i>
                            <input id="senha" type="password"/>
                            <label for="senha">Senha</label>
                    </div>
                    <div className="buttons-div">
                        <Link className="button btn waves-effect waves-light blue darken-1" to="/register" >Cadastrar
                            <i className="material-icons left">exit_to_app</i>
                        </Link>
                        <Link className="button btn waves-effect waves-light green darken-1" to="/home" >Entrar
                            <i className="material-icons left">check</i>
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    );
}