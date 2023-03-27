import React, { useState, useEffect } from 'react';
import {makeStyles} from '@mui/styles';
import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
// import io from 'socket.io-client';
// const socket = io('http://localhost:4000');
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '100%',
    padding: '15px'
  },
  headBG: {
      backgroundColor: '#e0e0e0',
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const Chat = () => {
  let roomId=1
  let userId=2
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     socket.emit('join room', roomId, userId);
//     socket.on('message received', message => {
//       setMessages(prevMessages => [...prevMessages, message]);
//     },[]);

//     return () => {
//       socket.disconnect();
//     };
//   }, [roomId, userId]);
//   const handleSubmit = event => {
//     event.preventDefault();
//     socket.emit('send message', roomId, newMessage);
//     setMessages(prevMessages => [...prevMessages, newMessage]);
//     setNewMessage('');
//   };

  return (
      <div>
        <h2>Comming soon !</h2>
        {/* <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                        <ListItemText secondary="online" align="right"></ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="success" aria-label="add"><AiOutlineSend style={{ fontSize: '24px'}}/></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid> */}
      </div>
  );
}

export default Chat;