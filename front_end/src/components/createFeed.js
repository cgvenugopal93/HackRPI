import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
// Form Content
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles({
  filters: {
    paddingTop: 0
  }
});


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CreateToolbar = (props) => {
  const user=JSON.parse(localStorage.user)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [feedContent, setFeedContent] = React.useState('')
  const [checked, setChecked] = React.useState(false);
  //const [location, setLocation] = React.useState([])
  //const apiUrl='http://192.168.1.222:8000/api/feed'
  
  const apiUrl='http://project611.diveintojava.com/api/feed'
  
  /*const handleLocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
        setLocation([position.coords.latitude, position.coords.longitude])
        });
    }*/
   const toggleChecked = () => {
    setChecked(!checked);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

  const submitFeed = (evt) => {
      evt.preventDefault();
      //handleLocation();
      fetch(apiUrl, { 
        method: "POST",       
    
        body: JSON.stringify({ 
            user: user.user_id, 
            comment: feedContent,
            is_anonymous: checked ? 1 : 0
            //location: location.toLocaleString()
        }), 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
        }).then(response => response.json())
        .then(json1 => {
         fetch(apiUrl).then(res=>res.json()).then(json=>{
            localStorage.setItem('feed',JSON.stringify(json))
        })          
          props.update(JSON.parse(localStorage.getItem('feed')))
          setOpen(false);
          //props.update([])
        }); 
        //console.log(feedContent, checked, location)
  }

  return (
    <div className={classes.filters}>
      <IconButton onClick={handleClickOpen}>
        <AddIcon/>
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Create New Feed
        </DialogTitle>
        <DialogContent dividers>
            <Typography variant="body2"  component="p">
                Spread to the community or flag your COVID status!
            </Typography>
            <form noValidate autoComplete="off">
                <TextareaAutosize id="news_feed" label="Feed Content"
                aria-label="Public Feed" rowsMin={15} style={{'width': '100%'}}  placeholder="Enter your message" 
                value={feedContent}  onChange={(evt) => setFeedContent(evt.target.value)}/>
                <br/>
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={toggleChecked} name="checkedA" />}
                    label="Anonymous"
                />
                <Typography variant="body2"  component="p">
                    Please enable location to enable transparency
                </Typography>
            </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={submitFeed} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateToolbar;
