import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Menu from '../Menu';
import NewProduct from './NewProduct';
import NewType from './NewType';
import api from '../../services/api';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TextField from '@mui/material/TextField';

import "./style.css"

export default function Products() {

    const [produtos, setProdutos] = useState([]);
    const [atualizaProdutos, setAtualizaProdutos] = useState(false);
    const [search, setSearch] = useState('');

    const fabStyle = {
        position: "relative",
        bgcolor: "#b6b6b6"
      };

    function refreshProductList() {
        api.get('products').then(response => {
            setProdutos(response.data);
        });
    }

    useEffect(() => {
        api.get('products').then(response => {
            let retorno = response.data;
            if (search !== '') {
                var search_lower = search.toLowerCase();
                setProdutos(
                    retorno.filter(produto => (
                            produto.codigo.toLowerCase().includes(search_lower)
                            || produto.marca.toLowerCase().includes(search_lower)
                            || produto.modelo.toLowerCase().includes(search_lower)
                            || produto.descricao.toLowerCase().includes(search_lower)
                        )
                    )
                );
            } else {
                setProdutos(retorno);
            }
        });
    }, [atualizaProdutos, search]);

    function handleDetailProduct(id) {
        return
    }

    function handleEditProduct(id) {
        Swal.fire({
            type: 'info',
            title: 'Funcionalidade indisponível',
            showConfirmButton: true,
            confirmButtonText: "OK"
        });
    }

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

                <h1>Produtos</h1>
                <Box sx={{display: "grid", gridTemplateColumns: 'repeat(4, 1fr)', margin: 3, gap: 3}}>
                    <TextField id="search_field" label="Pesquisar" variant="outlined" value={search} onChange={e => setSearch(e.target.value)}/>
                    <Fab variant="extended" sx={fabStyle}>
                        <AddIcon sx={{ mr: 1 }} />
                        Novo Tipo
                    </Fab>
                    <Fab variant="extended" sx={fabStyle}>
                        <AddIcon sx={{ mr: 1 }} />
                        Novo fornecedor
                    </Fab>
                    <Fab variant="extended" sx={fabStyle}>
                        <AddIcon sx={{ mr: 1 }} />
                        Novo Produto
                    </Fab>
                </Box>

                <List>
                    {produtos.map(produto => (
                        <ListItem key={produto.id}>
                            <Card sx={
                                        {
                                            width: '100%',
                                            borderRight: 5,
                                            borderColor: "#007bff",
                                            backgroundColor: "#f5f4f4"
                                        }
                                    }>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {produto.codigo}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {produto.marca} - {produto.modelo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <b>Categoria:</b> {produto.tipo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <b>Fornecedores:</b> {produto.fornecedor}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <b>Valor compra: </b>  
                                        {
                                            Intl.NumberFormat(
                                                'pt-BR', 
                                                {
                                                    style: 'currency',
                                                    currency:'BRL'
                                                }
                                            ).format(produto.valor_compra)
                                        }
                                    </Typography>
                                    <Typography sx={{ paddingTop: 2 }}>
                                        {produto.descricao}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <Tooltip title="Ver detalhes">
                                        <Button
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="delete"
                                            onClick={() => handleDetailProduct(produto.id)}
                                        >
                                            <ManageSearchIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={`Excluír ${produto.codigo}`}>
                                        <Button
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="delete"
                                            onClick={() => handleDeleteProduct(produto.id)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={`Editar ${produto.codigo}`}>
                                        <Button
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="delete"
                                            onClick={() => handleEditProduct(produto.id)}
                                        >
                                            <EditIcon />
                                        </Button>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </ListItem>
                    ))}
                </List>
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
