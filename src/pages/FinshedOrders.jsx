import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, Link ,Outlet} from 'react-router-dom';
import Api from './../config/Config';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useTranslation  } from 'react-i18next';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import CircularProgressWithLabel from './../components/Progress';
import { useSelector, useDispatch } from 'react-redux';
import { fetchfinished } from './../redux/reducers/orders';
const FinshedOrders = () => {

  const data= useSelector((state)=>state.orders.value.finished)
  const { t, i18n } = useTranslation();
  const dispatch=useDispatch()
  const [orderId,setOrderId]=useState()
  const [phone,setPhone]=useState()
  useEffect(()=>dispatch(fetchfinished),[])
  let filteredData = data;
  if (orderId) filteredData = data.filter(item => item.id == orderId);
  if (phone) filteredData = data.filter(item => item.phone == phone);
    
  return (
    <div className='mt-16 mx-5 bg-white rounded-3xl' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
        <h2 className='text-2xl font-bold mb-8 ml-5'>{t("finished.title")}</h2>
        <div className='flex justify-around w-9/12 m-auto'>
          <TextField style={{marginBottom:"20px"}} id="outlined-basic" label={t("finished.id")} value={orderId} onChange={(e)=>setOrderId(e.target.value)} variant="outlined" />
          <TextField style={{marginBottom:"20px"}} id="outlined-basic" label={t("finished.phone")} value={phone} onChange={(e)=>setPhone(e.target.value)} variant="outlined" />
        </div>
        <Divider />
        <Grid container spacing={2} marginTop="10px" justifyContent={"center"}>
          {
            filteredData.map((ele)=>{
              return(
                <Grid item md={4} xs={12} key={ele.name}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                      {t("finished.id")} :{ele.id}
                      </Typography>
                      <Typography marginTop={"10px"} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {t("finished.name")} : {ele.clientName}
                      </Typography>
                      <Typography marginTop={"10px"} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {t("finished.clientPhone")} : {ele.phone}
                      </Typography>
                      <Typography marginTop={"10px"} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {t("finished.workerName")} : {ele.name}
                      </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="space-evenly">
                      <CardActions>
                        <Button size="small" variant='contained'><Link to={`/orderDetails/${ele.id}`}>{t("finished.learnMore")}</Link> </Button>
                      </CardActions>
                      <CircularProgressWithLabel id={ele.id}/>
                    </Box>
                </Card>
                <Outlet/>
                </Grid>
              ) 
            })
          }
        </Grid>
    </div>
  )
}

export default FinshedOrders