import React from 'react';

import './style.css';

export default function NewProduct() {

    /*
        modelo, marca, descricao, tipo, fornecedor, valorCompra, cfop
    */

    return(
        <div id="modalNewProduct" className="modal modal-produto">
            <div className="modal-content">
                <h1>Cadastrar novo produto</h1>

                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">class</i>
                        <input id="tipo" type="text" className="validate"/>
                        <label for="tipo">Tipo</label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">business_center</i>
                        <input id="fornecedor" type="text" className="validate"/>
                        <label for="fornecedor">Fornecedor</label>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">layers</i>
                        <input id="marca" type="text" className="validate"/>
                        <label for="marca">Marca</label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">dashboard</i>
                        <input id="modelo" type="text" className="validate"/>
                        <label for="modelo">Modelo</label>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">attach_money</i>
                        <input id="valor" type="number" className="validate"/>
                        <label for="valor">Valor de Compra</label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">info_outline</i>
                        <input id="cfop" type="number" className="validate"/>
                        <label for="cfop">CFOP</label>
                    </div>
                </div>

                <div className="input-field">
                    <i className="material-icons prefix">comment</i>
                    <input id="descricao" type="text" className="validate"/>
                    <label for="descricao">Descrição</label>
                </div>

            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect btn botao-cancelar"><i className="material-icons left">clear</i>Cancelar</a>
                <a href="#!" className="modal-close waves-effect btn botao-confirmar"><i className="material-icons left">check</i>Confirmar</a>
            </div>
        </div>
    );
}