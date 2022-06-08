import React, { useState } from 'react';
import Swal from 'sweetalert2';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import api from '../../services/api';
import systock_logo from '../../assets/systock_logo.png';

const theme = createTheme();

export default function Register() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    async function handleRegister(event) {
        event.preventDefault();

        try {
            const admin = 0;
            var msg = '';

            if (senha !== confSenha) {
                msg = 'Campo de confirmação de senha não confere com campo senha!';
            } else if (nome === '' || email === '') {
                msg = 'Preencha todos os campos para cadastrar';
            }
            if (msg !== '') {
                Swal.fire({
                    title: msg,
                    type: 'warning',
                    showConfirmButton: true
                });
            }

            const data = {
                nome,
                email,
                senha,
                admin
            };

            const response = await api.post('users', data);
            
            Swal.fire({
                text: `Usuário ${response.data.nome} cadastrado com sucesso!`,
                type: 'success',
                showConfirmButton: true
            });
        } catch (err) {
            var erro = '';

            if (err.response !== undefined) {
                erro = err.response.data;
            } else {
                erro = err;
            }

            Swal.fire({
                title: 'Problemas no cadastro',
                text: erro,
                type: 'warning',
                showConfirmButton: true
            });
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
                    <CardMedia
                        component="img"
                        height="80"
                        image={systock_logo}
                        alt="SYStock"
                    />

                    <Typography component="h1" variant="h5" sx={{ mt: 3 }} textAlign="center">
                        Cadastre-se aqui para começar a utilizar o sistema
                    </Typography>

                    <Box component="form" onSubmit={handleRegister} noValidate>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField 
                                    margin="normal" 
                                    required 
                                    fullWidth 
                                    id="nome" 
                                    label="Nome" 
                                    name="nome" 
                                    autoComplete="nome" 
                                    autoFocus
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    margin="normal"
                                    required 
                                    fullWidth 
                                    id="email" 
                                    label="e-mail" 
                                    name="email" 
                                    autoComplete="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} xm={6} xl={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="senha"
                                    label="Senha"
                                    type="password"
                                    id="senha"
                                    autoComplete="current-password"
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} xm={6} xl={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confSenha"
                                    label="Confirmar Senha"
                                    type="password"
                                    id="confSenha"
                                    autoComplete="current-password"
                                    value={confSenha}
                                    onChange={e => setConfSenha(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}> 
                            Cadastrar usuário
                        </Button>

                        <Alert severity="info">
                            <strong>
                                <Link href="/" variant="body2">
                                    Ou clique aqui para fazer o login
                                </Link>
                            </strong>
                        </Alert>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
