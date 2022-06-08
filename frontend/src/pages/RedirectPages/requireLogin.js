import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';

import systock_logo from '../../assets/systock_logo.png';

export default function RequireLogin() {

    return (
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

                <Alert severity="warning" sx={{ mt: 3 }}>
                    <strong>
                        É necessário efetuar login para continuar!
                    </strong>
                </Alert>

                <Link href="/" variant="body2" sx={{ mt: 3 }}>
                    Clique aqui para efetuar login
                </Link>
            </Box>
        </Container>
    );
}