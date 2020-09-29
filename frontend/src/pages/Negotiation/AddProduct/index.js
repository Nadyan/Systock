import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';

import './style.css';
import api from '../../../services/api';

export default function AddProduct(props) {
    
    const [produto, setProduto] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    
    function resetFields() {
        setProduto('');
        setFornecedor('');

        //M.updateTextFields;
    }

    async function handleAddProduct(event) {
        event.preventDefault();

        if (produto === '') {
            Swal.fire({
                type: 'warning',
                title: `Selecione um produto para ser adicionado ao orçamento.`,
                showConfirmButton: true,
                confirmButtonText: "OK"
            });
        } else {
            const tipo = 'P', servico = '', valorServico = 0;

            const data = {
                tipo,
                produto, // ID do produto
                servico,
                valorServico
            };
    
            try {
                const response = await api.post('negotiation_temp', data);
    
                Swal.fire({
                    type: 'success',
                    title: `Produto adicionado com sucesso`,
                    timer: 1800,
                    showConfirmButton: false
                });
                
                resetFields();
                props.refreshProductList(); // atualiza a lista de produtos adicionados
            } catch (err) {
                Swal.fire({
                    type: 'error',
                    title: `Erro ao adicionar produto`,
                    text: 'Tente novamente',
                    showConfirmButton: true,
                    confirmButtonText: "OK"
                });
            } 
        }
    }

    return (
        <div id="modalAddProduct" className="modal modal-add-produto">
            <div className="modal-content">
                <h1>Cadastrar novo produto</h1>

                <div className="input-field">
                    <Select
                        options={props.listaProdutos}
                        onChange={setProduto}
                        defaultValue={produto}
                        placeholder="Escolher produto..."
                    />
                </div>
            </div>
        </div>
    );
}