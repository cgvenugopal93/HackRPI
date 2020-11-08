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

function Signup() {
  let formdata = new FormData();
  //const apiUrl='http://192.168.1.222:8000/api/signup'
  
  const apiUrl='http://project611.diveintojava.com/api/signup'
  const [first_name,setFirst_name]=useState('');
  const [last_name,setLast_name]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password,setConfirmPassword]=useState('');
  const history = useHistory();
    const submit=(e) => {
        formdata.append("first_name",first_name)
        formdata.append("last_name",last_name)
        formdata.append("email",email)
        formdata.append("password", password)
        
        e.preventDefault();
        console.log('logging in')
        console.log(email)
        console.log(password)
        const creds=JSON.stringify({email:email,password:password})
        fetch(apiUrl,{
          method:'POST',
          body:formdata
        })
        .then(res=>res.json())
        .then(json=>{
          history.push("/")
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
            Sign up
          </Typography>
          <form onSubmit={submit} className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoFocus
              value={first_name} onChange={e => setFirst_name(e.target.value) }
            >
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              autoFocus
              value={last_name} onChange={e => setLast_name(e.target.value) }
            >
            </TextField>
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="confirm password"
              type="password"
              id="confirm_password"
              
              value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}
            >
            </TextField>
            {password===confirm_password?null:<div color='red'>Password and confirm password do not match</div>}
          
            <Button
            
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!(password===confirm_password)}
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          
        </div>
      </Container>
    </div>
  );
}

export default Signup;