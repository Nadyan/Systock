import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import systock_logo from '../../assets/systock_logo.png';

import './style.css';

export default function Register() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    function handleRegister(event) {
        event.preventDefault();

        try {
            const admin = 0;

            if (senha !== confSenha) {
                alert('Campo de confirmação de senha não confere com campo senha!');
                return;
            } else if (nome === '' || email === '') {
                alert('Preencha todos os campos');
                return;
            }

            const data = {
                nome,
                email,
                senha,
                admin
            };

            const response = api.post('users', data);
        } catch (err) {
            alert(err);
        }
    }

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

                <form onSubmit={handleRegister}>
                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input 
                            id="nome" 
                            className="validate"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <label for="nome">Nome</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input 
                            id="email" 
                            className="validate"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                        <label for="email">e-mail</label>
                    </div>
                    <div className="input-group">
                        <div className="input-field">
                            <i className="material-icons prefix">lock</i>
                            <input 
                                id="senha" 
                                type="password"
                                value={senha}
                                className="validate"
                                onChange={e => setSenha(e.target.value)}/>
                            <label for="senha">Senha</label>
                        </div>
                        <div className="input-field">
                            <input 
                                id="confSenha" 
                                type="password"
                                value={confSenha}
                                className="validate"
                                onChange={e => setConfSenha(e.target.value)}/>
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