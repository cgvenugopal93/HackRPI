import * as React from 'react';
//import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
/*import Grid from '@material-ui/core/Grid';
import {Link as LinkDom} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';*/
import CreateToolbar from '../components/createFeed'

//import { Link } from 'react-router-dom';
//import { useTranslate } from 'react-admin';
//import { Customer, Order } from '../types';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        //maxWidth: 400,
        maxHeight: 400,
        overflowY: 'scroll'
    },
    danger: {
        backgroundColor: ' #d9534f',
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
}));

const NewsFeed = (props) => {
    const classes = useStyles();
    //console.log(props)
    console.log(props)
    return (
        <Card className={classes.root}>
            <CardHeader 
                title={'News Feed'}  
                action={<CreateToolbar update={props.update}/>
                    }/>
            <List dense={true}>
                { props.feeds.map(feed => (
                    <ListItem
                        className={(feed.is_danger === "1")? classes.danger : null} 
                        key={feed.feed_id}
                        //button
                    >
                        <ListItemAvatar>
                            {feed.avatar ? (
                                <Avatar
                                    src={`${
                                        feed.avatar
                                    }?size=32x32`}
                                />
                            ) : (
                                <Avatar />
                            )}
                        </ListItemAvatar>
                        {/*new Date(feed.date).toLocaleString(
                                'en-GB', { year: "numeric", month: "long", day: "numeric" }
                            ).split(',')[0], f*/}
                        <ListItemText
                            primary={feed.is_anonymous === "0" ? feed.name : 'Anonymous'} 
                            secondary={            
                                <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  {feed.comment}
                                </Typography>
                                <br/>
                                {new Date(feed.created_at).toLocaleString(
                                'en-GB', { year: "numeric", month: "long", day: "numeric" }
                                ).split(',')[0]}
                              </React.Fragment>
                                }
                        >
                        </ListItemText>
                        <Divider variant="inset" component="li" />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default NewsFeed;
