import React from 'react';
import { Typography, Paper } from '@mui/material';

const Home = () => {
    return (
        <>
            <Paper
                sx={{
                    p: 5,
                    height: 140,
                    width: '80%'
                }}
            >
                <Typography component="h2" variant="h6" color="primary">
                    The report function is under development.
                </Typography>
            </Paper>
        </>
    );
};

export default Home;
