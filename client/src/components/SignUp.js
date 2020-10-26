import React, { useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

import { Avatar, Button, CssBaseline, TextField,Grid, Box, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
    return (
        <Typography color="textSecondary" align="center">
            Copyright © Movie Talk 2020
        </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// ----------------------------- SIGNUP ----------------------------- //
export default function SignUp() {
    const classes = useStyles();

    const [formState, setFormState] = useState({
        firstName:'',
        LastName:'',
        email:'',
        password:'',
        confirmPassword: '',
    })
    const [errorState, setErrorState] = useState({})

    const changeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users", formState, {withCredentials:true})
            .then(res => {
                alert("Register successfully!")
                navigate("/sign_in")
            })
            .catch(err => {
                const { errors } = err.response.data;
                const errorObj = {}
                for(const key of Object.keys(errors)) {
                    errorObj[key] = errors[key]
                }
                setErrorState(errorObj)
    })}

    return (
        <Container component="main" maxWidth="xs" style={{background:'white'}}>
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">Sign up</Typography>

            <form className={classes.form} noValidate onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        {errorState['firstName'] ? 
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            label="First Name"
                            autoFocus
                            error
                            id="outlined-error-helper-text"
                            helperText={errorState['firstName'].message}
                            onChange={changeHandler}
                        /> : 
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            onChange={changeHandler}
                        /> }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {errorState['lastName'] ? 
                        <TextField
                            autoComplete="lname"
                            name="lastName"
                            variant="outlined"
                            required
                            fullWidth
                            autoFocus
                            error
                            id="outlined-error-helper-text"
                            label="Last Name"
                            helperText={errorState['lastName'].message}
                            onChange={changeHandler}
                        /> : 
                        <TextField
                            autoComplete="lname"
                            name="lastName"
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            autoFocus
                            onChange={changeHandler}
                        /> }
                    </Grid>
                    <Grid item xs={12}>
                        {errorState['email'] ? 
                        <TextField
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            label="Email Address"
                            autoFocus
                            error
                            id="outlined-error-helper-text"
                            helperText={errorState['email'].message}
                            onChange={changeHandler}
                        /> : 
                        <TextField
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoFocus
                            onChange={changeHandler}
                        /> }
                    </Grid>
                    <Grid item xs={12}>
                        {errorState['password'] ? 
                        <TextField
                            autoComplete="password"
                            name="password"
                            variant="outlined"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoFocus
                            error
                            id="outlined-error-helper-text"
                            helperText={errorState['password'].message}
                            onChange={changeHandler}
                        /> : 
                        <TextField
                            autoComplete="password"
                            name="password"
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            autoFocus
                            onChange={changeHandler}
                        /> }
                    </Grid>
                    <Grid item xs={12}>
                        {errorState['confirmPassword'] ? 
                        <TextField
                            autoComplete="confirmPassword"
                            name="confirmPassword"
                            variant="outlined"
                            required
                            fullWidth
                            label="Confirm Password"
                            autoFocus
                            type="password"
                            error
                            id="outlined-error-helper-text"
                            helperText={errorState['confirmPassword'].message}
                            onChange={changeHandler}
                        /> : 
                        <TextField
                            autoComplete="confirmPassword"
                            name="confirmPassword"
                            variant="outlined"
                            required
                            type="password"
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            autoFocus
                            onChange={changeHandler}
                        /> }
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Link to="/sign_in" variant="body2">
                    Already have an account? Sign in
                </Link>
            </form>
        </div>
        <Box mt={5}><Copyright /></Box>
        </Container>
    );
}