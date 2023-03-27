import React, { useState ,useEffect } from 'react';
import { Button, InputLabel, TextField, Alert } from '@mui/material';
import Api from './../config/Config';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation  } from 'react-i18next';
import DialogTitle from '@mui/material/DialogTitle';
const Settings = () => {
  const { t, i18n } = useTranslation();
  let type=JSON.parse(localStorage.getItem('office')).type =="admin"
  const navigate=useNavigate()
  const [openNotify, setNotify] = React.useState(false);
  const [msg,setMsg]=React.useState("")
  const [typeMsg,setType]=React.useState("success")
  const [dialog,setDialog]=useState(false)
  const handleClose = (event, reason) => {
    setNotify(false)
    if (reason === 'clickaway') {
      return;
    }}
  const [officeData, setOfficeData] = useState({
    image: '',
    officeName: '',
    address: '',
    email:''
  });
  useEffect(()=>{
    if(!localStorage.getItem('office'))  navigate('/signin')
    let token=JSON.parse(localStorage.getItem('office')).token
    Api.get('/office/data',{
      headers:{
        'authorization':`Barear ${token}`
      }
    })
    .then((res)=>{
        setOfficeData(res.data)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  },[])
  function handleSubmit(event){
    event.preventDefault();  
    if(!localStorage.getItem('office')) return navigate('/signin');
    let token=JSON.parse(localStorage.getItem('office')).token
    const form=new FormData(event.currentTarget);
    Api.post('/office/update',{
      name:form.get('name'),
      image:form.get('image'),
      address:form.get('address'),
      email:form.get('email'),
      password:form.get('password'),
    },{
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization':`Barear ${token}`,
      }
    })
    .then((result)=>{
      setNotify(true)
      setMsg(result.data)
      setType('success')
      result.status==203 && setDialog(true) 
    })
    .catch((err)=>{
      setNotify(true)
      setMsg(err.response.data)
      setType('warning')
    }) 
  }

  return (
    <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      <h2 className='text-2xl font-bold'>{t("setting.title")}</h2>
    {
      type?
      <form className='md:w-1/2 sm:w-full' onSubmit={handleSubmit}>
          <InputLabel id="image">{t("setting.image")}</InputLabel>
          <TextField required labelId='image' type='file' name='image' fullWidth variant="outlined" margin='dense' onChange={(e) => {setOfficeData({ ...officeData, image: e.target.value})}}/>
          <TextField required label={t("setting.name")} labelId='name' value={officeData.officeName} name='name' fullWidth variant="outlined" margin='dense' onChange={(e) => {setOfficeData({ ...officeData, name: e.target.value})}}/>
          <TextField required label={t("setting.email")} helperText={t("setting.msg")} type="email" labelId='email' value={officeData.email} name='email' fullWidth variant="outlined" margin='dense' onChange={(e) => {setOfficeData({ ...officeData, email: e.target.value})}}/>
          <TextField required label={t("setting.password")} type="password" labelId='name' name='password' fullWidth variant="outlined" margin='dense' onChange={(e) => {setOfficeData({ ...officeData, password: e.target.value})}}/>
          <TextField required label={t("setting.address")} name='address' fullWidth variant="outlined" value={officeData.address} margin='dense' onChange={(e) => {setOfficeData({ ...officeData, address: e.target.value})}}/>
          <Button variant="contained" size='large' type='submit' style={{ background: '#28a745', marginTop: '20px'}}>{t("setting.save")}</Button>
      </form>
      :<h2 className='mt-16' style={{textAlign:'center'}}>Sorry, content not avilable</h2>
    }
      <Snackbar id='snack-bar' open={openNotify} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeMsg} sx={{ width: '100%' }}>
        {msg}
        </Alert>
      </Snackbar>
      <Dialog open={dialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {t("setting.dialog")}
      </DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color='success' onClick={()=>{navigate('/signin')}} autoFocus>
        {t("setting.signin")}
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default Settings