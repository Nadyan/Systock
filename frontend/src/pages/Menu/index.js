import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import PersonIcon from '@mui/icons-material/Person';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';

import logo from '../../assets/SYStock_logo_branco.png';
//import rocket_white from '../../assets/rocket_white.png';

const styles = {
    appBarLogo: {
        height: 30
    },
    appBar: {
        background: '#232931'
    },
    drawer: {
        sx: {
            backgroundColor: "#232931"
        }
    },
    listItem: {
        mt: 1
    },
    listItemIcon: {
        color: 'white',
    }
};

const links = [
    {
        name: "Início",
        icon: <HomeIcon />,
        route: "/home"
    },
    { 
        name: "Produtos",
        icon: <ViewQuiltIcon />,
        route: "/products"
    },
    { 
        name: "Clientes",
        icon: <PersonIcon />,
        route: "/customers"
    },
    { 
        name: "Negociação",
        icon: <FormatListBulletedIcon />,
        route: "/negotiation"
    }
];

export default function Menu() {

    const history = useHistory();

    const [user, setUser] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const getList = () => (
        <div style={{ width: 200 }} onClick={() => setMenuOpen(false)}>
            {links.map((item, index) => (
                <ListItem button key={index} component={Link} to={item.route}>
                    <ListItemIcon sx={styles.listItemIcon}>{item.icon}</ListItemIcon>
                    <ListItemText sx={styles.listItemIcon}>{item.name}</ListItemText>
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
            <AppBar position="static" sx={styles.appBar}>
                <Toolbar>
                    <Tooltip title="Menu">
                        <Button
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                            onClick={() => setMenuOpen(true)}
                        >
                            <MenuIcon />
                        </Button>
                    </Tooltip>
                    <Box
                        component="img"
                        sx={styles.appBarLogo}
                        alt="SYStock"
                        src={logo}
                    />

                    <Grid container justifyContent="flex-end">
                        <Tooltip title={user}>
                            <Button
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleLogout}
                            >
                                <AccountCircleIcon sx={{ color: 'white' }}/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Pesquisar">
                            <Button
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <SearchIcon sx={{ color: 'white' }}/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Sair">
                            <Button
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleLogout}
                            >
                                <PowerSettingsNewIcon sx={{ color: 'white' }}/>
                            </Button>
                        </Tooltip>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer open={menuOpen} anchor={"left"} onClose={() => setMenuOpen(false)} PaperProps={styles.drawer}>   
                <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
                    
                    {getList()}
                    
                </Container>
            </Drawer>
        </Box>
    );
}
