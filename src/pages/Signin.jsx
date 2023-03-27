import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Api from './../config/Config';
import "../css/signin.css"
const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [emailError,setEmailError]=useState(false)
  const [passwordError,setPasswordError]=useState(false)
  const [emailErrorMsg,setEmailErrorMsg]=useState('')
  const [passErrorMsg,setPassErrorMsg]=useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Api.post('/office/signin/',{
      email: data.get('email'),
      pass: data.get('password'),
    })
    .then((result)=>{
      localStorage.setItem('office',JSON.stringify(result.data))
      setPasswordError(false)
      setEmailError(false)
      navigate('/')
    })
    .catch((err)=>{
      if(err.response.status==404){
        setEmailError(true)
        setEmailErrorMsg(err.response.data)
        setPasswordError(false)
      }else if(err.response.status==403){
        setPassErrorMsg(err.response.data)
        setPasswordError(true)
        setEmailError(false)
      }else{
        setPasswordError(false)
        setEmailError(false)        
      }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="overlay"></div>
      <Container component="main" maxWidth="xs" className='signin'>
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            {
            emailError?<TextField error={emailError} helperText={emailErrorMsg} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
            :          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
            }
            {
            passwordError?<TextField error={passwordError} helperText={passErrorMsg} margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
            :<TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
            }
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}