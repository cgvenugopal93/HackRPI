import React from 'react';
import {useState} from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {Link as LinkDom} from 'react-router-dom'
import Newsfeed from '../pages/newsfeed'
import SafePass from './safePass'
import passdetails from '../pages/passDetails'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Maps from './googleMaps'

import InfoIcon from '@material-ui/icons/Info';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        SafePass
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 260,
  },
}));

export default function HomePage() {

    console.log(localStorage)
    console.log(localStorage.feed)
    const [feed,setFeed]=useState(JSON.parse(localStorage.feed))

    const user=JSON.parse(localStorage.user)
    console.log(user)
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    //const apiUrl="http://192.168.1.222:8000/api"
    
    const apiUrl='http://project611.diveintojava.com/api'
    fetch(`${apiUrl}/safepass/${user.user_id}`).then(res=>res.json())
      .then(json=>{
      localStorage.setItem('pass',JSON.stringify(json))
    })
    fetch(`${apiUrl}/feed`).then(res=>res.json())
        .then(json=>{
        localStorage.setItem('feed',JSON.stringify(json))
      })

    fetch(`${apiUrl}/latlong`).then(res=>res.json())
      .then(json=>{
      localStorage.setItem('latlong',JSON.stringify(json))
    })
    setTimeout(() => {
      console.log()
    }, 1500);
    const passdetails = useState(JSON.parse(localStorage['pass']))
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    console.log(localStorage)

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar)}>
            <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                SafePass
            </Typography>
                <LinkDom to="/about"><IconButton><InfoIcon/></IconButton></LinkDom>
                <LinkDom to="/"><IconButton onClick={() => localStorage.clear()}><ExitToAppIcon/></IconButton></LinkDom>
            </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} md={4} lg={9}>
                <Maps/>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper >
                <SafePass passinfo={passdetails} />
              </Paper>
            </Grid>
            <Grid item lg={12}>
                <Newsfeed feeds={feed.reverse() } update={setFeed} />              
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
