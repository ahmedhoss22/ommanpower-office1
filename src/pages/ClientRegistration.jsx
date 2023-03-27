import { Button, InputLabel, TextField ,Alert} from '@mui/material';
import React from 'react'
import { useState , useRef} from 'react';
import Api from './../config/Config';
import Snackbar from '@mui/material/Snackbar';
import { useTranslation  } from 'react-i18next';
import FormData from "form-data"
import LinearProgress from '@mui/material/LinearProgress';
import { fetchUnfinished } from '../redux/reducers/orders';
import { useDispatch } from 'react-redux';
const ClientRegistration = () => {
  const dispatch=useDispatch()
  const form=useRef([])
  const { t, i18n } = useTranslation();
  const [error,setError]=useState()
  const [openNotify, setNotify] = React.useState(false);
  const [submited,setSubmited]=useState(false)
  const [loading,setLoading]=useState(false)
  const [clientData, setClientData] = useState({
    name: '',
    email:'',
    password:'',
    id: '',
    phone: '',
    workLocation: '',
    liveLocation: '',
    permissibility: '',
    workerPassport:"",
    salaryCertificate: '',
  });
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify(false)
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    const form=new FormData(event.currentTarget);
    console.log(form.get('phone'));
    if(form.get('phone').length != 8 ){
      setNotify(true)
      setError("Phone number must be equal 8 numbers")
      return
    }
    setLoading(true)
    await Api.post('/clientData/registration',{
      name:form.get('name'),
      email:form.get('email'),
      password:form.get('password'),
      card:form.get("card"),
      visa:form.get("visa"),
      phone:form.get("phone"),
      nationalId:form.get('id'),
      work:form.get("work"),
      address:form.get("address"),
      passport:form.get("passport").toLowerCase()
    },{headers: {'Content-Type': 'multipart/form-data'}})
    .then( (res)=>{
      dispatch(fetchUnfinished())
      setLoading(false)
      setSubmited(true)
      console.log(res.data);
      setTimeout(()=> setSubmited(false),2000)
      setClientData({ name: '', email:'', password:'', id: '', phone: '', workLocation: '', liveLocation: '', permissibility: '', salaryCertificate: '', workerPassport:""})
    setNotify(false)
    }).catch(err=> {
      setLoading(false)
      setNotify(true)
      setError(err.response.data)
    })  
  }
  return (
    <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?"ltr":'rtl'}}>
      <h2 className='text-2xl font-bold'>{t("client.title")}</h2>
      <form className='md:w-1/2 sm:w-full' ref={form} onSubmit={(e)=>handleSubmit(e)}>
          <TextField  value={clientData.name} required label={t("client.name")} name='name' fullWidth variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, name: e.target.value})}}/>
          <TextField value={clientData.email} type="email" required fullWidth label={t("client.email")} name='email' variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, email: e.target.value})}}/>
          <TextField value={clientData.password} type="password" required fullWidth label={t("client.password")} name='password' variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, password: e.target.value})}}/>
          <TextField value={clientData.id} type="number" required fullWidth label={t("client.card")} name='id' variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, id: e.target.value})}}/>
          <TextField value={clientData.workerPassport} type="text" required fullWidth label={t("client.passport")} name='passport' variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, workerPassport: e.target.value})}}/>
          <InputLabel id="file">{t("client.visa")}</InputLabel>
          <TextField value={clientData.permissibility} required labelId='file' type='file' name='visa' fullWidth variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, permissibility: e.target.value})}}/>
          <InputLabel id="file">{t("client.card")}</InputLabel>
          <TextField value={clientData.salaryCertificate} required labelId='file' type='file' name='card' fullWidth variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, salaryCertificate: e.target.value})}}/>
          <TextField value={clientData.phone} type="number" required label={t("client.phone")} name='phone' fullWidth variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, phone: e.target.value})}}/>
          <TextField value={clientData.workLocation} required label={t("client.work")} name='work' fullWidth variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, workLocation: e.target.value})}}/>
          <TextField value={clientData.liveLocation} required label={t("client.address")} name='address' fullWidth variant="outlined" margin='dense' onChange={(e) => {setClientData({ ...clientData, liveLocation: e.target.value})}}/>
          {!loading && <Button type='submit' variant="contained" size='large' style={{ background: '#28a745', marginTop: '20px'}}>{t("client.register")}</Button>}
          {loading && <LinearProgress style={{margin:"40px 0"}}/>}
          {submited?<Alert className='my-5' severity="success">{t("client.dataSent")}</Alert>
          :<Alert className='my-5' severity="info">{t("client.fillData")}</Alert>  
        }
      </form>
      <Snackbar id='snack-bar' open={openNotify} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            {error}
            </Alert>
          </Snackbar>
    </div>
  )
}

export default ClientRegistration