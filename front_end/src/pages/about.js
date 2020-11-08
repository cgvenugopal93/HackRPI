import * as React from 'react';
//import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
//import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import {Link as LinkDom} from 'react-router-dom'
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Image Import
import ibm from './img/IBM_cloud.png'
import gcp from './img/GCP_cloud.png'
import app from './img/app.svg'
import map from './img/map.svg'
import news from './img/news.svg'
import biz from './img/business.svg'
import sec from './img/security.svg'
import saty from './img/saty.jpg'
import guhan from './img/guhan.jpg'
import venu from './img/venu.jpg'
import vinay from './img/vinay.JPG'


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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    //color: theme.palette.text.secondary,
    },
  center: {
      textAlign: 'center'
  }
 }));

export default function AboutPage() {
const classes = useStyles();
return(
    <div className={classes.root}>
    <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            SafePass
        </Typography>
            <LinkDom to="/about"><IconButton><InfoIcon/></IconButton></LinkDom>
            <LinkDom to="/"><IconButton><ExitToAppIcon/></IconButton></LinkDom>
        </Toolbar>
        </AppBar>

        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" className={classes.center}>
                About SafePass
            </Typography>
            <Typography component="p" variant="body1">
                SafePass, is the safe passport that is required for all of us in the COVID times. Recently, all of us have been affected due to the 
                pandemic especially small businesses.
            </Typography>
            <Typography component="p" variant="body1">
                We want to engage the public and businesses safely using the SafePass platform. Our platform tracks user location securedly and gives immediate
                alerts to the user if there was a trace of them being in contact with any COVID infected person. We give the user a SafePass token by default
                which updates it's status based on proximity with any infected person. Anyone on the platform can report status of COVID or public updates privately.
            </Typography>
            <Typography component="p" variant="body1">
                Our platform is equipped with <strong>Google Maps API</strong> and the <strong>IBM Cloud NLU API</strong> to understand user's post and derive
                COVID status from t
            </Typography>
          </Paper>
        </Grid>

        {/* Features Grid */}
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
                Neat UI
            </Typography>
            <img src={app} alt="SafePass Users" style={{height: 150}}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
                SafePass Passport
            </Typography>
            <img src={sec} alt="SafePass Passport" style={{height: 150}}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
                Quick updates
            </Typography>
            <img src={news} alt="SafePass News" style={{height: 150}}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
                Map hotspots
            </Typography>
            <img src={map} alt="SafePass Map" style={{height: 150}}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
                Engaging Business
            </Typography>
            <img src={biz} alt="SafePass Business" style={{height: 150}}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
                Built with latest Tech
            </Typography>
            <img src={ibm} alt="IBM cloud" style={{height: 100}}/>
            <img src={gcp} alt="GCP cloud" style={{height: 100}}/>
          </Paper>
        </Grid>

        {/* Team Name */}
        <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
                <img src={venu} alt="Venu" style={{height: 200}}/>
                <Typography component="h1" variant="h5">
                    Venugopal CR
                </Typography>
                <Typography component="p" variant="body1">
                    Backend Developer
                </Typography>
                <Typography component="p" variant="body1">
                    php
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
                <img src={vinay} alt="Vinay" style={{height: 200}}/>
                <Typography component="h1" variant="h5">
                    Vinay KN
                </Typography>
                <Typography component="p" variant="body1">
                    Backend Developer
                </Typography>
                <Typography component="p" variant="body1">
                    php
                </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <img src={saty} alt="Saty" style={{height: 200}}/>
            <Typography component="h1" variant="h5">
                Shathesh Kumar    
            </Typography>
            <Typography component="p" variant="body1">
                    Frontend Developer
            </Typography>
            <Typography component="p" variant="body1">
                    React JS
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <img src={guhan} alt="Guhan" style={{height: 200}}/>
            <Typography component="h1" variant="h5">
                Hari Guhan 
            </Typography>
            <Typography component="p" variant="body1">
                Frontend Developer
            </Typography>
            <Typography component="p" variant="body1">
                    React JS
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      </Container>
        </main>
    </div>);
}