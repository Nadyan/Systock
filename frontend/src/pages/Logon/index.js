import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import './style.css';

import systock_logo from '../../assets/systock_logo.png';

export default function Logon() {
    return (
        <div className="logon-container">
            <section>
                <img src={systock_logo} alt="Systock" />
                <form>
                    <h1>Faça seu Login</h1>
                    <input type="text" placeholder="Usuário" />
                    <input type="password" placeholder="Senha" />
                    
                    <div className="buttons-div">
                        <button class="btn waves-effect waves-light green darken-1" type="submit" name="entrar">Entrar
                            <i class="material-icons left">check</i>
                        </button>
                        <button class="btn waves-effect waves-light blue darken-1" type="submit" name="cadastrar">Cadastrar
                            <i class="material-icons left">exit_to_app</i>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}