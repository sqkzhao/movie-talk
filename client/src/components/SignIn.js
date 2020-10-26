import React, { useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router'

import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container } from '@material-ui/core';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// ----------------------------- SIGNIN ----------------------------- //
export default function SignIn(props) {
  const classes = useStyles();

  const { setCurrentUserId } = props;
  const [loginState, setLoginState] = useState({
    email:"",
    password:""
  })
  const [errorState, setErrorState] = useState("")

  const loginHandler = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8000/login", loginState, {withCredentials:true})
      .then(res => {
        if(res.data.msg === "success!") {
          setCurrentUserId(res.data.id);
          navigate('/')
        } else {
          setErrorState(res.data.msg)
        }
      })
      .catch(err => console.log(err))
  }

  const changeHandler = e => {
    setLoginState({
        ...loginState,
        [e.target.name]:e.target.value
    })
  }

  return (
    <Container component="main" maxWidth="xs" style={{background:'white'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate onSubmit={loginHandler}>
          {errorState ? 
          <div>
            <TextField
              autoComplete="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              error
              id="email"
              label="Email"
              autoFocus
              onChange={changeHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errorState}
              onChange={changeHandler}
            />
          </div> :
          <div>
            <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={changeHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changeHandler}
            />
          </div>}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link to='/sign_up' variant="body2">
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}