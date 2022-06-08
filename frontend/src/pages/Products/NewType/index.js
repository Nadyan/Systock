import React, { useState } from 'react';
import Swal from 'sweetalert2';

import api from '../../../services/api';

export default function NewType(props) {

    const [descricao, setDescricao] = useState('');

    function resetFields() {
        setDescricao('');
    }

    function verifyFields(pDescricao) {
        var blancField = '';

        if (pDescricao === '') {
            blancField += 'Descrição';
        }

        return blancField;
    }

    async function handleNewType(event) {
        event.preventDefault();

        const blancFields = verifyFields(descricao);

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
                descricao
            };
    
            try {
                const response = await api.post('tipos_prod', data);
    
                Swal.fire({
                    type: 'success',
                    title: `Tipo ${descricao} cadastrado com sucesso`,
                    timer: 1800,
                    showConfirmButton: false
                });
                
                resetFields();
            } catch (err) {
                Swal.fire({
                    type: 'error',
                    title: `Erro ao cadastrar tipo ${descricao}. Tente novamente`,
                    text: err,
                    showConfirmButton: true,
                    confirmButtonText: "OK"
                });
            } 
        }
    }

    return(
        <div id="modalNewType" className="modal modal-tipo">
            <div className="modal-content">
                <h1>Cadastrar novo tipo de produto</h1>

                <div className="input-field">
                    <i className="material-icons prefix">label</i>
                    <input 
                        id="descricao"
                        type="text"
                        className="validate"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <label htmlFor="descricao">Descrição</label>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#" onClick={resetFields} className="modal-close waves-effect btn botao-cancelar"><i className="material-icons left">clear</i>Sair</a>
                <a href="#" onClick={handleNewType} className="waves-effect btn botao-confirmar"><i className="material-icons left">check</i>Confirmar</a>
            </div>
        </div>
    );
}