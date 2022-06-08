import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import {
    CheckBoxOutlineBlankOutlined,
    HomeOutlined,
    InboxOutlined,
    MailOutline
} from "@mui/icons-material";

import logo from '../../assets/SYStock_logo_branco.png';
import rocket_white from '../../assets/rocket_white.png';

export default function Menu() {

    const history = useHistory();

    const [user, setUser] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const data = [
        {
            name: "Home",
            icon: <HomeOutlined />,
            route: "/home"
        },
        { 
            name: "Produtos",
            icon: <InboxOutlined />,
            route: "/products"
        },
        { 
            name: "Clientes",
            icon: <CheckBoxOutlineBlankOutlined />,
            route: "/customers"
        },
        { 
            name: "Negociação",
            icon: <MailOutline />,
            route: "/negotiation"
        }
    ];

    const getList = () => (
        <div style={{ width: 300 }} onClick={() => setMenuOpen(false)}>
            {data.map((item, index) => (
                <ListItem button key={index} component={Link} to={item.route} sx={{ mt: 1 }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                </ListItem>
            ))}
        </div>
    );

    useEffect(() => {
        setUser(localStorage.getItem('user-email') || '');       
    }, []);

    function handleLogout() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                <Button
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setMenuOpen(true)}
                >
                    <MenuIcon />
                </Button>
                <Drawer open={menuOpen} anchor={"left"} onClose={() => setMenuOpen(false)}>
                    {getList()}
                </Drawer>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );

        {
            /*
                <div className="menu-container">
            <nav>
                <div className="nav-wrapper">
                    <ul className="left">
                        <li><a href="#"><i className="sidenav-trigger material-icons" data-target="slide-out">menu</i></a></li>
                        <li><img src={logo} className="navbar-logo"/></li>
                    </ul>
                    <ul className="right" style={{marginRight: "25px"}}>
                        <li><a href="" className="tooltipped" data-position="bottom" data-tooltip={user}><i className="material-icons">account_circle</i></a></li>
                        <li><a href="/home" className="tooltipped" data-position="bottom" data-tooltip="Ir para a página inicial"><i className="material-icons">home</i></a></li>
                        <li><a href="" className="tooltipped" data-position="bottom" data-tooltip="Pesquisar"><i className="material-icons">search</i></a></li>
                        <li><button onClick={handleLogout} className="tooltipped" data-position="bottom" data-tooltip="Sair"><i className="material-icons">power_settings_new</i></button></li>
                    </ul>
                </div>
            </nav>

            <ul id="slide-out" className="sidenav">
                <li>
                    <div className="background center-align" style={{marginBottom:"15px"}}>
                        <img className="center-align sidenav-logo" src={rocket_white}/>
                    </div>
                </li>
                <li><a className="subheader">Cadastro</a></li>
                <li><a href="/customers" className="waves-effect"><i className="material-icons">people</i>Cliente</a></li>
                <li><a href="/products" className="waves-effect"><i className="material-icons">view_quilt</i>Produto</a></li>
                
                <li><a className="subheader">Operação</a></li>
                <li><a href="/negotiation" className="waves-effect"><i className="material-icons">list</i>Orçamento</a></li>
                
                <li><a className="subheader">Configuração</a></li>
                <li><a href="/parameters" className="waves-effect"><i className="material-icons">settings</i>Parâmetros</a></li>

                    </ul>
                </div>
            */
        }
}