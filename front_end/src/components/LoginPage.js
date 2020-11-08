import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as LinkDom,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  let formdata = new FormData();
  //const apiUrl='http://192.168.1.222:8000/api/log'
  const apiUrl='http://project611.diveintojava.com/api/log'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
    const submit=(e) => {
        formdata.append("email",email)
        formdata.append("password", password)
        e.preventDefault();
        console.log('logging in')
        console.log(email)
        console.log(password)
        fetch(apiUrl,{
          method:'POST',
          body:formdata
        })
        .then(res=>res.json())
        .then(json=>{
          if (json.error===undefined){
            console.log(json)
            localStorage.setItem('user',JSON.stringify(json))
            //const apiUrl='http://192.168.1.222:8000/api'
            const apiUrl='http://project611.diveintojava.com/api'
            fetch(`${apiUrl}/feed`)
            .then(res=>res.json())
            .then(json=>{
              localStorage.setItem('feed',JSON.stringify(json))
            })
            fetch(`${apiUrl}/latlong`)
            .then(res=>res.json())
            .then(json=>{
              localStorage.setItem('latlong',JSON.stringify(json))
              console.log(json)
            })

            navigator.geolocation.getCurrentPosition(function(position) {
            localStorage.setItem('currentPosition',JSON.stringify({lat: 42.9611427097942,lng: -78.81628445531712}))
            console.log(localStorage)
            });
            fetch(`${apiUrl}/safepass/${json.user_id}`)
            .then(res=>res.json())
            .then(json=>{
              localStorage.setItem('pass',JSON.stringify(json))
            })
            
            setTimeout(() => {
              history.push("/home")
            }, 1000);
  
          }
          else{
            setPassword("")
          }
        })
    }
  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={submit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email} onChange={e => setEmail(e.target.value) }
            >
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password} onChange={e => setPassword(e.target.value)}
            >
            </TextField>
          
            <Button
            
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkDom to="/signup" >
                  Sign up
                </LinkDom>
              </Grid>
            </Grid>
          </form>
          
        </div>
      </Container>
    </div>
  );
}

export default Login;