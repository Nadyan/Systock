import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';
import M from "materialize-css";

import './style.css';
import api from '../../../services/api';

export default function AddProduct(props) {
    
    const [produtoInput, setProdutoInput] = useState(''); // produto selecionado no campo select
    const [fornecedores, setFornecedores] = useState([]);

    const [produto, setProduto] = useState(''); // produto escolhido através do fornecedor
    const [quantidade, setQuantidade] = useState('');
    
    function resetFields() {
        setProdutoInput('');
        setFornecedores([]);
        setProduto('');
        setQuantidade('');

        var elems = document.getElementsByClassName('choose-fornec-li');
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.border = '2px solid #ebebeb';
        }

        M.updateTextFields();
    }

    useEffect(() => {
        if (produtoInput !== '') {
            refreshFornecList(produtoInput.value);
            setProduto('');
        } else {
            refreshFornecList('');
            setProduto('');
        }
    }, [produtoInput]);

    function chamaSetProduto(pId) {
        setProduto(pId);
        
        var elems = document.getElementsByClassName('choose-fornec-li');
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.border = '2px solid #ebebeb';
        }

        document.getElementById(`li_${pId}`).style.border = "2px solid #007bff";
    }

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

        if (produtoInput === '' || produto === '') {
            Swal.fire({
                type: 'warning',
                title: 'Selecione um produto para ser adicionado ao orçamento',
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        } else if (quantidade === '' || quantidade === 0) {
            Swal.fire({
                type: 'warning',
                title: 'Informe uma quantidade válida',
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        } else {
            const tipoItem = 'P', servico = '', valorServico = 0;
            
            const data = {
                tipoItem,
                produto, // ID do produto
                quantidade,
                servico,
                valorServico
            };
            
            try {
                const response = await api.post('negotiation_temp', data);

                Swal.fire({
                    type: 'success',
                    title: `Produto adicionado ao orçamento`,
                    timer: 1800,
                    showConfirmButton: false
                });
                
                resetFields();
                props.refreshProductList(); // atualiza a lista de produtos adicionados
            } catch (err) {
                Swal.fire({
                    type: 'error',
                    title: 'Erro ao adicionar produto',
                    text: 'Tente novamente',
                    showConfirmButton: true,
                    confirmButtonText: 'OK'
                });
            } 
        }
    }

    return (
        <div id="modalAddProduct" className="modal modal-add-produto">
            <div className="modal-content">
                <h1>Adicionar novo produto</h1>

                <div className="input-field">
                    <Select
                        className="select"
                        options={props.listaProdutos}
                        onChange={setProdutoInput}
                        placeholder="Escolher produto..."
                        defaultValue=""
                    />
                </div>
                
                <div className="input-field">
                    <i className="material-icons prefix">add_shopping_cart</i>
                    <input 
                        id="quantidade" 
                        type="number" 
                        className="validate"
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                    />
                    <label htmlFor="quantidade">Quantidade</label>
                </div>

                <div className="fornecs-group">
                    <ul>
                        {fornecedores.map(fornecedor => (
                            <li key={fornecedor.id} onClick={() => chamaSetProduto(fornecedor.id)} id={`li_${fornecedor.id}`} className="choose-fornec-li">
                                <strong className="header-info">{fornecedor.codigo}</strong>
                                <strong className="header-info">{`${fornecedor.marca} ${fornecedor.modelo}`}</strong>
                                <div className="divider"></div>
                                <div className="info-container">
                                    <strong>Tipo:</strong>
                                    <p>{fornecedor.tipo}</p>
                                </div>
                                <div className="info-container">
                                    <strong>Fornecedor:</strong>
                                    <p>{fornecedor.nome_fornec}</p>
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
                                            ).format(fornecedor.valor_compra)
                                        }
                                    </p>
                                </div>
                                <p>{fornecedor.descricao}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className="modal-footer">
                <div className="fixed-action-btn">
                    <a href="#" onClick={resetFields} className="modal-close waves-effect btn botao-cancelar"><i className="material-icons left">clear</i>Sair</a>
                    <a href="#" onClick={handleAddProduct} className="waves-effect btn botao-confirmar"><i className="material-icons left">check</i>Confirmar</a>
                </div>
            </div>
        </div>
    );
}
