import React from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

export default function NotFound() {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box 
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <CircularProgress color="inherit" />
            </Box>
        </Container>
    );
}
