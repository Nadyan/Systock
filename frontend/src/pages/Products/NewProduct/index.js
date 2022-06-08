import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import CurrencyInput from 'react-currency-masked-input';

import api from '../../../services/api';

export default function NewProduct(props) {

    const [codigo, setCodigo] = useState('');
    const [id_tipo, setTipo] = useState('');
    const [id_fornecedor, setFornecedor] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [valor_compra, setValorCompra] = useState('');
    const [cfop, setCfop] = useState('');
    const [descricao, setDescricao] = useState('');
    const [listaTipos, setListaTipos] = useState([]);
    const [listaFornecedores, setListaFornecedores] = useState([]);

    useEffect(() => {
        api.get('tipos_prod/select').then(response => {
            setListaTipos(response.data);
        });
        api.get('fornecedores/select').then(response => {
            setListaFornecedores(response.data);
        });
    }, [codigo]);

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

    function verifyFields(pCodigo, pModelo, pMarca, pTipo, pFornecedor, pValorCompra, pCfop) {
        var blancField = '';

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
        if (!Number.isInteger(pCfop)) {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'CFOP';
        }

        return blancField;
    }

    async function handleNewProduct(event) {
        event.preventDefault();

        const blancFields = verifyFields(codigo, modelo, marca, id_tipo, id_fornecedor, valor_compra, cfop);

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
                marca,
                modelo,
                descricao,
                valor_compra,
                cfop,
                id_tipo,
                id_fornecedor
            };
    
            try {
                const response = await api.post('products', data);
    
                Swal.fire({
                    type: 'success',
                    title: `Produto ${marca} ${modelo} cadastrado com sucesso`,
                    timer: 1800,
                    showConfirmButton: false
                });
                
                resetFields();
                props.refreshProductList(); // atualiza a lista de produtos cadastrados
            } catch (err) {
                Swal.fire({
                    type: 'error',
                    title: `Erro ao cadastrar produto ${marca} ${modelo}. Tente novamente`,
                    text: err,
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

                <div className="input-group">
                    <div className="input-field">
                        <Select
                            styles={{
                                menu: provided => ({ ...provided, zIndex: 9999 })
                            }}
                            options={listaTipos}
                            onChange={setTipo}
                            defaultValue={id_tipo}
                            placeholder="Escolher tipo..."
                        />
                    </div>

                    <div className="input-field">
                        <Select
                            styles={{
                                menu: provided => ({ ...provided, zIndex: 9999 })
                            }}
                            options={listaFornecedores}
                            onChange={setFornecedor}
                            defaultValue={id_fornecedor}
                            placeholder="Escolher fornecedor..."
                        />
                    </div>
                </div>

            </div>
            <div className="modal-footer">
                <a href="#" onClick={resetFields} className="modal-close waves-effect btn botao-cancelar"><i className="material-icons left">clear</i>Sair</a>
                <a href="#" onClick={handleNewProduct} className="waves-effect btn botao-confirmar"><i className="material-icons left">check</i>Confirmar</a>
            </div>
        </div>
    );
}