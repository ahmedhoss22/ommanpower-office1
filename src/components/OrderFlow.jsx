import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Button, Modal, TextField, Typography, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import { useTranslation  } from 'react-i18next';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Api from './../config/Config';

const OrderFlow = ({data,update})=> {
  const { t, i18n } = useTranslation();
  const navigate=useNavigate() 
   let { email,id, delivery, embassyProcedures, externalRequest, foreig, laborMinistry, ticket,client_id} =data
   let visa =data.visaStatus
   let card=data.cardStatus
   const [confirm, setConfirm] = useState(false);
   const [item,setItem]=useState()
   const [itemMsg,setMsg]=useState()
    const handleSubmit= useCallback(()=>{
        setConfirm(false)
        if(!localStorage.getItem('office'))  navigate('/signin')
        let token=JSON.parse(localStorage.getItem('office')).token
        Api.put('/updateOrderStatus',{
            id,
            item,
            client_id,
            email
        },{
          headers:{
            'authorization':`Barear ${token}`
          }
        })
        .then((result)=>{
            update()
        })
        .catch((err)=>{
          if(err.response.status==401) navigate('/signin') 
        })
    })
    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100%',
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex:100000000
    };
    const handleConfirmClose =()=> setConfirm(false)
    const handleClick=useCallback((item,itemMsg)=>{
    setItem(item)
    setMsg(itemMsg)
    setConfirm(true)
    })
   return (
        <>
        <Grid container spacing={2} style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
           {/* <Grid item lg={3} md={4} sm={6} xs={12} >
            <Card sx={{ maxWidth: 275 }} style={{minHeight:"150px"}}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">{t("finished.card")}</Typography>
                </CardContent>
                <CardActions>
                {
                card=='pending'?<Button onClick={()=>handleClick("card","National card")} size="small" variant="outlined"  style={{backgroundColor: '#1976d2', marginTop: '5px', color: '#fff',marginLeft:"50%",transform:"translateX(-50%)"}}>{t('finished.done')}</Button>:
                <AiOutlineCheckCircle color='' style={{ marginTop: '5px', fontSize: '32px',color:"rgb(40, 167, 69)",marginLeft:"50%",transform:"translateX(-50%)"}} /> 
                } 
                </CardActions>
            </Card>
           </Grid>
           <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 275 }} style={{minHeight:"150px"}}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">{t("finished.visa")} </Typography>
                </CardContent>
                <CardActions>
                {
                visa=='pending'?<Button onClick={()=>handleClick("visa","Visa")} size="small" variant="outlined"  style={{backgroundColor: '#1976d2', marginTop: '5px', color: '#fff',marginLeft:"50%",transform:"translateX(-50%)"}}>{t('finished.done')}</Button>:
                <AiOutlineCheckCircle color='' style={{ marginTop: '5px', fontSize: '32px',color:"rgb(40, 167, 69)",marginLeft:"50%",transform:"translateX(-50%)"}} /> 
                } 
                </CardActions>
            </Card>
           </Grid> */}
           <Grid item lg={4} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 275 }} style={{minHeight:"150px"}}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">{t("finished.labor")}</Typography>
                </CardContent>
                <CardActions>
                {
                laborMinistry=='pending'?<Button onClick={()=>handleClick("laborMinistry","Work certification contract, Ministry of Labor")} size="small" variant="outlined"  style={{backgroundColor: '#1976d2', marginTop: '5px', color: '#fff',marginLeft:"50%",transform:"translateX(-50%)"}}>{t('finished.done')}</Button>:
                <AiOutlineCheckCircle color='' style={{ marginTop: '5px', fontSize: '32px',color:"rgb(40, 167, 69)",marginLeft:"50%",transform:"translateX(-50%)"}} /> 
                } 
                </CardActions>
            </Card>
           </Grid>
           <Grid item lg={4} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 275 }} style={{minHeight:"150px"}}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">{t("finished.foreign")}</Typography>
                </CardContent>
                <CardActions>
                {
                foreig=='pending'?<Button onClick={()=>handleClick("foreig","Work certification contract, Ministry of Foreign Affairs")} size="small" variant="outlined"  style={{backgroundColor: '#1976d2', marginTop: '5px', color: '#fff',marginLeft:"50%",transform:"translateX(-50%)"}}>{t('finished.done')}</Button>:
                <AiOutlineCheckCircle color='' style={{ marginTop: '5px', fontSize: '32px',color:"rgb(40, 167, 69)",marginLeft:"50%",transform:"translateX(-50%)"}} /> 
                } 
                </CardActions>
            </Card>
           </Grid>
           <Grid item lg={4} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 275 }} style={{minHeight:"150px"}}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">{t("finished.empassy")} </Typography>
                </CardContent>
                <CardActions>
                {
                embassyProcedures=='pending'?<Button onClick={()=>handleClick("embassyProcedures","Embassy procedures")} size="small" variant="outlined"  style={{backgroundColor: '#1976d2', marginTop: '5px', color: '#fff',marginLeft:"50%",transform:"translateX(-50%)"}}>{t('finished.done')}</Button>:
                <AiOutlineCheckCircle color='' style={{ marginTop: '5px', fontSize: '32px',color:"rgb(40, 167, 69)",marginLeft:"50%",transform:"translateX(-50%)"}} /> 
                } 
                </CardActions>
            </Card>
           </Grid>
           <Grid item lg={4} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 275 }} style={{minHeight:"150px"}}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">{t("finished.external")} </Typography>
                </CardContent>
                <CardActions>
                {
                externalRequest=='pending'?<Button onClick={()=>handleClick("externalRequest","External request")} size="small" variant="outlined"  style={{backgroundColor: '#1976d2', marginTop: '5px', color: '#fff',marginLeft:"50%",transform:"translateX(-50%)"}}>{t('finished.done')}</Button>:
                <AiOutlineCheckCircle color='' style={{ marginTop: '5px', fontSize: '32px',color:"rgb(40, 167, 69)",marginLeft:"50%",transform:"translateX(-50%)"}} /> 
                } 
                </CardActions>
            </Card>
           </Grid>
           <Grid item lg={4} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 275 }} style={{minHeight:"150px"}} >
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">{t("finished.ticket")} </Typography>
                </CardContent>
                <CardActions>
                {
                ticket=='pending'?<Button onClick={()=>handleClick("ticket","Ticket (date - time)")} size="small" variant="outlined"  style={{backgroundColor: '#1976d2', marginTop: '5px', color: '#fff',marginLeft:"50%",transform:"translateX(-50%)"}}>{t('finished.done')}</Button>:
                <AiOutlineCheckCircle color='' style={{ marginTop: '5px', fontSize: '32px',color:"rgb(40, 167, 69)",marginLeft:"50%",transform:"translateX(-50%)"}} /> 
                } 
                </CardActions>
            </Card>
           </Grid>
           <Grid item lg={4} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 275 }} style={{minHeight:"150px"}}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center">{t("finished.delivery")}</Typography>
                </CardContent>
                <CardActions>
                {
                delivery=='pending'?<Button onClick={()=>handleClick("delivery","Delivery")} size="small" variant="outlined"  style={{backgroundColor: '#1976d2', marginTop: '5px', color: '#fff',marginLeft:"50%",transform:"translateX(-50%)"}}>{t('finished.done')}</Button>:
                <AiOutlineCheckCircle color='' style={{ marginTop: '5px', fontSize: '32px',color:"rgb(40, 167, 69)",marginLeft:"50%",transform:"translateX(-50%)"}} /> 
                } 
                </CardActions>
            </Card>
           </Grid>
        </Grid>
    <Dialog style={style} open={confirm} onClose={handleConfirmClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {`Are you sure to confirm ${itemMsg} ?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {t("finished.confirmMsg")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmClose} variant='contained' color='error'>{t("finished.cancel")}</Button>
        <Button onClick={handleSubmit} autoFocus variant='contained' color='success'>{t("finished.confirm")}</Button>
      </DialogActions>
    </Dialog>
        </>
    )
}
export default OrderFlow