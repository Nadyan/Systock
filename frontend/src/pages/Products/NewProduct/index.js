import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CurrencyInput from 'react-currency-masked-input'

import './style.css';
import api from '../../../services/api';

export default function NewProduct(props) {

    const [codigo, setCodigo] = useState('');
    const [tipo, setTipo] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [valorCompra, setValorCompra] = useState('');
    const [cfop, setCfop] = useState('');
    const [descricao, setDescricao] = useState('');

    function resetFields() {
        setCodigo('');
        setTipo('');
        setFornecedor('');
        setMarca('');
        setModelo('');
        setValorCompra('');
        setCfop('');
        setDescricao('');

        //M.updateTextFields;
    }

    function verifyFields(pCodigo, pModelo, pMarca, pDescricao, pTipo, pFornecedor, pValorCompra, pCfop) {
        var blancField = '';
        alert(pValorCompra);

        if (pCodigo === '') {
            blancField += 'Código';
        }
        if (pTipo === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Tipo';
        }
        if (pFornecedor === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Fornecedor';
        }
        if (pMarca === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Marca';
        }
        if (pModelo === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Modelo';
        }
        if (pValorCompra === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Valor de Compra';
        }
        if (pCfop === '' && !Number.isInteger(pCfop)) {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'CFOP';
        }
        /*
        if (pDescricao === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Descrição';
        }
        */

        return blancField;
    }

    async function handleNewProduct(event) {
        event.preventDefault();

        const blancFields = verifyFields(codigo, modelo, marca, descricao, tipo, fornecedor, valorCompra, cfop);

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
                codigo,
                modelo, 
                marca, 
                descricao, 
                tipo, 
                fornecedor, 
                valorCompra, 
                cfop
            };
    
            try {
                const response = await api.post('products', data);
    
                Swal.fire({
                    type: 'success',
                    title: `Produto ${marca} ${modelo} cadastrado com sucesso`,
                    timer: 1800,
                    showConfirmButton: false
                });
                
                setCodigo('');
                setTipo('');
                setFornecedor('');
                setMarca('');
                setModelo('');
                setValorCompra('');
                setCfop('');
                setDescricao('');
                
               props.refreshProductList(); // atualiza a lista de produtos cadastrados
    
            } catch (err) {
                Swal.fire({
                    type: 'error',
                    title: `Erro ao cadastrar produto ${marca} ${modelo}`,
                    text: 'Tente novamente',
                    showConfirmButton: true,
                    confirmButtonText: "OK"
                });
            } 
        }
    }

    return(
        <div id="modalNewProduct" className="modal modal-produto">
            <div className="modal-content">
                <h1>Cadastrar novo produto</h1>

                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">label</i>
                        <input 
                            id="codigo"
                            type="text"
                            className="validate"
                            value={codigo}
                            onChange={e => setCodigo(e.target.value)}
                        />
                        <label htmlFor="codigo">Código</label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">class</i>
                        <input 
                            id="tipo" 
                            type="text" 
                            className="validate"
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                        />
                        <label htmlFor="tipo">Tipo</label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">business_center</i>
                        <input 
                            id="fornecedor" 
                            type="text" 
                            className="validate"
                            value={fornecedor}
                            onChange={e => setFornecedor(e.target.value)}/>
                        <label htmlFor="fornecedor">Fornecedor</label>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">layers</i>
                        <input 
                            id="marca" 
                            type="text" 
                            className="validate"
                            value={marca}
                            onChange={e => setMarca(e.target.value)}/>
                        <label htmlFor="marca">Marca</label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">dashboard</i>
                        <input 
                            id="modelo" 
                            type="text" 
                            className="validate"
                            value={modelo}
                            onChange={e => setModelo(e.target.value)}/>
                        <label htmlFor="modelo">Modelo</label>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">attach_money</i>
                        <CurrencyInput 
                            id="valor"  
                            className="validate"
                            onChange={e => setValorCompra(10*e.target.value)}
                        />
                        <label htmlFor="valor">Valor de Compra</label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">info_outline</i>
                        <input 
                            id="cfop" 
                            type="number" 
                            className="validate"
                            value={cfop}
                            onChange={e => setCfop(e.target.value)}/>
                        <label htmlFor="cfop">CFOP</label>
                    </div>
                </div>

                <div className="input-field">
                    <i className="material-icons prefix">comment</i>
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
                <a href="#" onClick={handleNewProduct} className="waves-effect btn botao-confirmar"><i className="material-icons left">check</i>Confirmar</a>
            </div>
        </div>
    );
}