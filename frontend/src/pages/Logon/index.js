import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import systock_logo from '../../assets/systock_logo.png';

export default function Logon() {

    const [usuario, setUsuario] = useState('');
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

            api.post('users/login').then(response => {
                if (response.value === 204) {
                    history.push('/home');
                } else {
                    throw new Error(response.Error);
                }
            });

            //history.push('/home');
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
                            id="usuario" 
                            type="text"
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                        />
                        <label for="usuario">Usuário</label>
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
                        <Link className="button btn waves-effect waves-light green darken-1" to="/home" >Entrar
                            <i className="material-icons left">check</i>
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    );
}