import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Menu from '../Menu';
import NewProduct from './NewProduct';
import NewType from './NewType';
import api from '../../services/api';

export default function Products() {

    const [produtos, setProdutos] = useState([]);
    const [atualizaProdutos, setAtualizaProdutos] = useState(false);

    function refreshProductList() {
        api.get('products').then(response => {
            setProdutos(response.data);
        });
    }

    useEffect(() => {
        api.get('products').then(response => {
            setProdutos(response.data);
        });
    }, [atualizaProdutos]);

    function handleDeleteProduct(id) {
        try {
            Swal.fire({
                title: 'Excluir produto?',
                text: "Essa ação não poderá ser desfeita!",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: "Não",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!'
            }).then((result) => {
                if (result.value) {
                    api.delete(`products/${id}`);
                
                    Swal.fire({
                        title: 'Produto excluído com sucesso',
                        type: 'success',
                        timer: 1800,
                        showConfirmButton: false
                    });
                    setProdutos(produtos.filter(produto => produto.id !== id));
                }
            });
        } catch (err) {
            Swal.fire({
                type: 'error',
                title: 'Erro ao excluir produto',
                text: 'Tente novamente',
                showConfirmButton: true,
                confirmButtonText: "OK"
            });
        }
    }

    return(
        <div>
            <Menu />
            
            <div className="product-container">

                <h1>Produtos Cadastrados</h1>

                <ul>
                    {produtos.map(produto => (
                        <li key={produto.id}>
                            <strong className="header-info">{produto.codigo}</strong>
                            <strong className="header-info">{`${produto.marca} ${produto.modelo}`}</strong>
                            <div className="divider"></div>
                            <div className="info-container">
                                <strong>Tipo:</strong>
                                <p>{produto.tipo}</p>
                            </div>
                            <div className="info-container">
                                <strong>Fornecedores:</strong>
                                <p>{produto.fornecedor}</p>
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
                                        ).format(produto.valor_compra)
                                    }
                                </p>
                            </div>
                            <p>{produto.descricao}</p>
                            <div className="option-button">
                                <button>
                                    <i className="material-icons edit tooltiped">create</i>
                                </button>
                                <button onClick={() => handleDeleteProduct(produto.id)}>
                                    <i className="material-icons delete">delete</i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="fixed-action-btn">
                <a className="btn-floating btn-large fab">
                    <i className="large material-icons">list</i>
                </a>
                <ul>
                    <li><a className="btn-floating red modal-trigger tooltipped" href="#modalNewType" data-position="left" data-tooltip="Administrar tipos de produtos"><i className="material-icons">library_books</i></a></li>
                    <li><a className="btn-floating green modal-trigger tooltipped" href="#modalNewProvider" data-position="left" data-tooltip="Administrar fornecedores"><i className="material-icons">business</i></a></li>
                    <li><a className="btn-floating blue modal-trigger tooltipped" href="#modalNewProduct" data-position="left" data-tooltip="Cadastrar novo produto"><i className="material-icons">library_add</i></a></li>
                </ul>
                <NewProduct refreshProductList={refreshProductList}/>
                <NewType />
            </div>
        </div>
    );
}