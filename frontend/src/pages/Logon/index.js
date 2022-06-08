import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import systock_logo from '../../assets/systock_logo.png';
import api from '../../services/api';

const theme = createTheme();

export default function Logon() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        if (email === '' || senha === '') {
            Swal.fire({
                type: 'warning',
                title: 'Email e Senha obrigatórios',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            try {
                const response = await api.post('users/login', { email, senha });
                
                const token = response.headers.authorization;
                if (token) {
                    localStorage.setItem('user-email', email);
                    sessionStorage.setItem('auth-token', token);
                    Swal.fire({
                        type: 'success',
                        title: 'Login efetuado com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    history.push('/home');
                }
            } catch (err) {
                var erro = 'Falha de comunicação com o servidor'
                if (err.response.data) {
                    erro = err.response.data.err;
                }
                
                Swal.fire({
                    type: 'warning',
                    title: `${erro}`,
                    text: `Tente novamente`,
                    showConfirmButton: true,
                    confirmButtonText: "OK"
                });
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box 
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box component="form" onSubmit={handleLogin} noValidate>
                        
                        <CardMedia
                            component="img"
                            height="80"
                            image={systock_logo}
                            alt="SYStock"
                        />

                        <Alert severity="warning" sx={{ mt: 5, mb: 1 }}>
                            Acesso restrito - Faça o login para continuar
                        </Alert>
                        
                        <TextField 
                            margin="normal" 
                            required 
                            fullWidth 
                            id="email" 
                            label="e-mail" 
                            name="email" 
                            autoComplete="email" 
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="senha"
                            label="senha"
                            type="password"
                            id="senha"
                            autoComplete="current-password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}> 
                            Entrar
                        </Button>

                        <Alert severity="info" sx={{ mt: 3 }}>
                            <strong>
                                <Link href="/register" variant="body2">
                                    Ou clique aqui para registrar uma conta
                                </Link>
                            </strong>
                        </Alert>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );       
}
