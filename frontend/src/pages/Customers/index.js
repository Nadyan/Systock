import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Menu from '../Menu';
import api from '../../services/api';
import NewCustomer from './NewCustomer';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AddIcon from '@mui/icons-material/Add';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export default function Customers() {
    const [clientes, setCustomers] = useState([]);
    const [atualizaClientes, setAtualizaClientes] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [openModalAdd, setopenModalAdd] = useState(false);

    useEffect(() => {
        api.get('clients').then(response => {
            const data = response.data.sort((a, b) => a.nome.localeCompare(b.nome))
            setCustomers(data);
        });
    }, [atualizaClientes]);

    const speedDialActions = [
        { icon: <AddIcon />, name: 'Adicionar Cliente' },
    ];

    const handleOpenModalAdd = () => setopenModalAdd(true);
    const handleCloseModalAdd = () => setopenModalAdd(false);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function refreshCustomerList() {
        setAtualizaClientes(!atualizaClientes);
    }

    function handleEditCustomer(customer) {
        Swal.fire({
            type: 'error',
            title: 'Função não implementada',
            showConfirmButton: true,
            confirmButtonText: "OK"
        });
    }

    function handleDeleteCustomer(id) {
        try {
            Swal.fire({
                title: 'Excluir cliente?',
                text: "Essa ação não poderá ser desfeita!",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: "Não",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!'
            }).then((result) => {
                if (result.value) {
                    api.delete(`clients/${id}`);
                
                    Swal.fire({
                        title: 'Cliente excluído com sucesso',
                        type: 'success',
                        timer: 1800,
                        showConfirmButton: false
                    });
                    setCustomers(clientes.filter(cliente => cliente.id !== id));
                }
            });
        } catch (err) {
            Swal.fire({
                type: 'error',
                title: 'Erro ao excluir cliente',
                text: 'Tente novamente',
                showConfirmButton: true,
                confirmButtonText: "OK"
            });
        }
    }

    const getCustomers = () => (
        clientes.map(cliente => (
            <Accordion expanded={expanded === cliente.id} 
                onChange={handleExpand(cliente.id)} TransitionProps={{ unmountOnExit: true }}>

                <AccordionSummary expandIcon={<ExpandMoreIcon />} 
                    aria-controls={`${cliente.id}bh-content`} id={`${cliente.id}bh-header`}
                >
                    <Typography sx={{ width: '50%', flexShrink: 0 }} variant="h6">
                        <strong>
                            {cliente.nome}
                        </strong>
                    </Typography>
                    <Grid container justifyContent="flex-end" sx={{ mr:1 }}>
                        <Chip label={cliente.tipo === 'F' ? "Pessoa física" : "Pessoa Jurídica"} />
                    </Grid>
                </AccordionSummary>

                <AccordionDetails>
                    <List>
                        <Divider><Chip label="Dados" variant="outlined"/></Divider>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary={`${cliente.endereco} - ${cliente.bairro} - ${cliente.cidade} - ${cliente.uf}`} />
                        </ListItem>
                        {(
                            () => {
                                var dado='', label='';
                                cliente.tipo === 'F' ? dado = cliente.cpf : dado = cliente.cnpj;
                                cliente.tipo === 'F' ? label = 'CPF' : label = 'CNPJ';
                                if (cliente.tipo !== 'F' && cliente.inscr_estadual!=='') { 
                                    dado = `${dado} - Insc. Estadual: ${cliente.inscr_estadual}` 
                                }
                                return (
                                    <ListItem disablePadding>
                                        <ListItemIcon>
                                            <AssignmentIndIcon />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={dado !== '' ? `${label} ${dado}` : `${label} não informado`} />
                                    </ListItem>
                                );
                            }
                        )()}
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary={cliente.email !== '' ? cliente.email : 'E-mail não informado'} />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary={cliente.telefone !== '' ? cliente.telefone : 'Telefone não informado'} />
                        </ListItem>
                    </List>

                    <Divider><Chip label="Ações" variant="outlined"/></Divider>

                    <Grid container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1}}>
                        <Tooltip title={`Excluír ${cliente.nome}`}>
                            <Button
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="delete"
                                onClick={() => handleDeleteCustomer(cliente.id)}
                            >
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title={`Editar ${cliente.nome}`}>
                            <Button
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="delete"
                                onClick={() => handleEditCustomer(cliente)}
                            >
                                <EditIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        ))
    );

    return(
        <div>
            <Menu />
            
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" 
                    sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    Clientes
                </Typography>
                {getCustomers()}                
            </Container>

            <SpeedDial ariaLabel="Menu de clientes" 
                sx={{ position: 'absolute', bottom: 20, right: 20  }} icon={<MenuOpenIcon />}
            >
                {
                    speedDialActions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleOpenModalAdd}
                        />
                    ))
                }
            </SpeedDial>

            <Modal
                open={openModalAdd}
                onClose={handleCloseModalAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <NewCustomer refreshCustomerList={refreshCustomerList} />
                </Box>
            </Modal>
        </div>
    );
}
