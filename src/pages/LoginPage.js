import React from 'react'
import { Container, Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles({
    paper: { padding: 40, margin: "20px auto", width: '700px', height: '60vh', marginTop: '100px' }
});

export default function LoginPage() {
    const classes = useStyles();
    return (
        <Container style={{ backgroundColor: 'F9FAFC' }}>
            <Paper style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${"https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"})`
            }} elevation={10} className={classes.paper}>
                <Stack sx={{ mb: 5 }}>
                    <Typography variant="h4" gutterBottom>
                        Sign In
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'text.secondary' }}>Wellness Booking Portal Flow System</Typography>
                </Stack>
                <LoginForm />
            </Paper>
        </Container>







    )
}
