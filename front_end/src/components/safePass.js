import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
//import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
//import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Modal from '@material-ui/core/Modal';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import Divider from '@material-ui/core/Divider';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const useStyles = makeStyles((theme) => ({
  safe: {
    maxWidth: 345,
    textAlign: "center",
    backgroundColor: '#5cb85c',
  },
  danger: {
    maxWidth: 345,
    textAlign: "center",
    backgroundColor: '#d9534f',
  },
  warning: {
    maxWidth: 345,
    textAlign: "center",
    backgroundColor: '#f0ad4e',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    position: 'absolute',
    height: 600,
    overflowY: 'scroll',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
export default function SafePassport(props) {
  const classes = useStyles();
  const details = props.passinfo[0]
  const [expanded, setExpanded] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const passStyle = (details.status === 'Safe')? classes.safe : (details.status === 'Warning')? classes.warning : classes.danger
  const passIcon = (details.status === 'Safe')? <CheckCircleIcon /> : (details.status === 'Warning')? <WarningIcon /> : <ErrorIcon />
  //const passInfo = (details.status === 'safe')? <CheckCircleIcon /> : (details.status === 'warning')? <WarningIcon /> : <ErrorIcon />
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={passStyle}>
      <CardHeader
        title="SafePass Clearance"
        
      />
      { passIcon }
      {/*<CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />*/}
      <CardContent>
        <Typography variant="h5" component="h5">
            {details.status}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {details.info}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        { (details.status !== 'Safe') ?
            <IconButton aria-label="history" onClick={handleOpen}><LocationOnIcon /></IconButton>: null
        }
      </CardActions>
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <div style={modalStyle} className={classes.paper}>
        <Typography variant="h5" component="h5">Possible exposure regions</Typography>
          <List>
          { details.traces ? 
              details.traces.map((history) => (
              <ListItem style={{padding: '0px'}} key={history.user_trace_id}>
                <ListItemText primary={history.location} 
                     secondary={new Date(history.created_at).toLocaleString(
                      'en-GB', { year: "numeric", month: "long", day: "numeric" }
                       ).split(',')[0]}/>
                <Divider/>
                </ListItem>
          )) : null }
          </List>
          </div>
        </Modal>
    </Card>
  );
}