import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import systock_logo from '../../assets/systock_logo.png';
import api from '../../services/api';

export default function Logon() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            // FAZER

            //const response = await api.post('sessions', { usuario, senha });

            // salva no storage do navegador
            //localStorage.setItem('userId', usuario);
            //localStorage.setItem('userName', reponse.data.nome); 

            const response = await api.post('users/login', { email, senha });
            
            const token = response.headers.authorization;
            if (token) {
                localStorage.setItem('auth-token', token);
                history.push('/home');
            }
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="logon-container">
            <section>
                <img src={systock_logo} alt="Systock" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input 
                            id="email" 
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">lock</i>
                        <input 
                            id="senha" 
                            type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                        <label for="senha">Senha</label>
                    </div>
                    <div className="buttons-div">
                        <Link className="button btn waves-effect waves-light blue darken-1" to="/register" >Cadastrar
                            <i className="material-icons left">exit_to_app</i>
                        </Link>
                        <button className="button btn waves-effect waves-light green darken-1" onClick={handleLogin} >Entrar
                            <i className="material-icons left">check</i>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}