import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import styled from "styled-components";

const HomeGrid = () => {
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setPageHeight(window.innerHeight);
        };

        // Add a resize event listener to update the page height
        window.addEventListener('resize', handleResize);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const H4 = styled.div``;
    return (
        <div style={{ height: `${pageHeight}px`, overflowY: 'auto' }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <H4>TATACOMM</H4>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">JSWSTEEL</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">TCS</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">SBICARD</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">MARICO</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">ZOMATO</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">POWERGRID</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">IRFC</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">IDEA</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">ASHOKA</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6">SAIL</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
};

export default HomeGrid;
