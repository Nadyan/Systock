import React, { useState } from 'react';
import Swal from 'sweetalert2';

import './style.css';
import api from '../../../services/api';

export default function NewProduct(props) {

    const [tipo, setTipo] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [valorCompra, setValorCompra] = useState('');
    const [cfop, setCfop] = useState('');
    const [descricao, setDescricao] = useState('');

    async function handleNewProduct(event) {
        event.preventDefault();

        const data = {
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

    return(
        <div id="modalNewProduct" className="modal modal-produto">
            <div className="modal-content">
                <h1>Cadastrar novo produto</h1>

                <div className="input-group">
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
                        <input 
                            id="valor" 
                            type="number" 
                            className="validate"
                            value={valorCompra}
                            onChange={e => setValorCompra(e.target.value)}/>
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
                <a href="#" className="modal-close waves-effect btn botao-cancelar"><i className="material-icons left">clear</i>Sair</a>
                <a href="#" onClick={handleNewProduct} className="waves-effect btn botao-confirmar"><i className="material-icons left">check</i>Confirmar</a>
            </div>
        </div>
    );
}