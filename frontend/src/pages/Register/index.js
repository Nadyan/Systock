import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import systock_logo from '../../assets/systock_logo.png';

export default function Register() {
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={systock_logo} alt="SyStock" />
                    
                    <h1>Cadastro</h1>
                    <p>Faça o cadastro para iniciar o gerenciamento de suas vendas!</p>

                    <Link to="/" className="button btn waves-effect waves-light blue darken-1">
                        Retornar
                        <i className="material-icons left">reply</i>
                    </Link>
                </section>

                <form>
                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="nome" class="validate"/>
                        <label for="nome">Nome</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input id="email" class="validate"/>
                        <label for="email">e-mail</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">local_phone</i>
                        <input id="telefone" class="validate"/>
                        <label for="telefone">Telefone</label>
                    </div>
                    <div className="input-group">
                        <div className="input-field">
                            <i className="material-icons prefix">lock</i>
                            <input id="senha" type="password"/>
                            <label for="senha">Senha</label>
                        </div>
                        <div className="input-field">
                            <input id="confSenha" type="password"/>
                            <label for="confSenha">Confirmar Senha</label>
                        </div>
                    </div>

                    <button className="button btn waves-effect waves-light green darken-1" type="submit">Cadastrar
                        <i className="material-icons left">check</i>
                    </button>
                </form>
            </div>
        </div>
    );
}