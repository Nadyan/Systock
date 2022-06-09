import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

import Menu from '../Menu';
import logo from '../../assets/rocket_black.png';

export default function Home() {
    return(
        <div>
            <Menu />
            
            <CssBaseline />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '80vh' }}
            >
                <Grid item xs={3}>
                    <CardMedia
                        component="img"
                        height="160"
                        image={logo}
                        alt="SYStock"
                        sx={{ opacity: 0.05 }}
                    />
                </Grid>
            </Grid> 
        </div>
    );        
}
