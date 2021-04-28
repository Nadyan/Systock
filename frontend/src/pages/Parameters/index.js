import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Menu from '../Menu';
import api from '../../services/api';

import './style.css'

export default function Products() {

    const [profitMargin, setProfitMargin] = useState('');
    const [refreshParams, setRefreshParams] = useState(false);

    useEffect(() => {
        /*
        api.get('parameters').then(response => {
            parameters = response.data;
            
            setProfitMargin(parameters[0]);
            // ...
        })
        */
    }, [refreshParams]);

    async function handleSave(event) {
        event.preventDefault();

        const blancFields = verifyFields(profitMargin);

        if (blancFields) {
            Swal.fire({
                type: 'warning',
                title: `Os seguintes campos devem ser preenchidos corretamente:`,
                text: `${blancFields}`,
                showConfirmButton: true,
                confirmButtonText: "OK"
            });
        } else {
            const data = {
                profitMargin
            };
    
            try {
                const response = await api.post('parameters', data);
    
                Swal.fire({
                    type: 'success',
                    title: `Parâmetros atualizados com sucesso`,
                    timer: 1800,
                    showConfirmButton: false
                });
            } catch (err) {
                Swal.fire({
                    type: 'error',
                    title: `Erro ao atualizar parâmetros`,
                    text: 'Tente novamente',
                    showConfirmButton: true,
                    confirmButtonText: "OK"
                });
            } 
        }
    }

    function verifyFields(pProfitMargin) {
        var blancField = '';

        if (pProfitMargin === '' || isNaN(pProfitMargin)) {
            blancField += 'Margem de lucro';
        }

        return blancField;
    }

    return(
        <div>
            <Menu />
            
            <div className="parameter-container">

                <h1>Parâmetros</h1>

                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">attach_money</i>
                        <input 
                            id="profitMargin"
                            type="number"
                            className="validate"
                            value={profitMargin}
                            onChange={e => setProfitMargin(e.target.value)}
                        />
                        <label htmlFor="profitMargin">Margem de lucro (%)</label>
                    </div>
                </div>

                <div className="modal-footer">
                    <a href="#" onClick={handleSave} className="waves-effect btn botao-confirmar"><i className="material-icons left">check</i>Salvar</a>
                </div>
            </div>

        </div>
    );
}