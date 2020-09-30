import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';

import './style.css';
import api from '../../../services/api';

export default function AddProduct(props) {
    
    const [produtoInput, setProdutoInput] = useState(''); // produto selecionado no campo select
    const [fornecedores, setFornecedores] = useState([]);

    const [produto, setProduto] = useState(''); // produto escolhido através do fornecedor
    
    function resetFields() {
        setProdutoInput('');
        setFornecedores([]);
        setProduto('');

        //M.updateTextFields;
    }

    useEffect(() => {
        if (produtoInput !== '') {
            refreshFornecList(produtoInput.value);
        } else {
            refreshFornecList('');
        }
    }, [produtoInput]);

    function refreshFornecList(pCodProduto) {
        if (pCodProduto === '') {
            setFornecedores([]);
        } else {
            api.get(`products/getFornecs/${pCodProduto}`).then(response => {
                // busca os produtos que tem o código 'produtoInput.value'
                // dessa forma irá trazer o produto com seus diferentes fornecedores
                setFornecedores(response.data);
            });
        }
    }

    async function handleAddProduct(event) {
        event.preventDefault();

        if (produtoInput === '') {
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
                        className="select"
                        options={props.listaProdutos}
                        onChange={setProdutoInput}
                        defaultValue={produtoInput}
                        placeholder="Escolher produto..."
                    />
                </div>

                <div className="fornecs-group">
                    <ul>
                        {fornecedores.map(fornecedor => (
                            <li key={fornecedor.id} onClick={() => setProduto(fornecedor.id)}>
                                <strong className="header-info">{fornecedor.codigo}</strong>
                                <strong className="header-info">{`${fornecedor.marca} ${fornecedor.modelo}`}</strong>
                                <div className="divider"></div>
                                <div className="info-container">
                                    <strong>Tipo:</strong>
                                    <p>{fornecedor.tipo}</p>
                                </div>
                                <div className="info-container">
                                    <strong>Fornecedor:</strong>
                                    <p>{fornecedor.fornecedor}</p>
                                </div>
                                <div className="info-container">
                                    <strong>Valor Compra:</strong>
                                    <p>
                                        {
                                            Intl.NumberFormat(
                                                'pt-BR', 
                                                {
                                                    style: 'currency',
                                                    currency:'BRL'
                                                }
                                            ).format(fornecedor.valorCompra)
                                        }
                                    </p>
                                </div>
                                <p>{fornecedor.descricao}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}