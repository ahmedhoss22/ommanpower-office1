import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Api from './../config/Config';
export default function CircularProgressWithLabel(props) {
  let {id}=props
  const navigate=useNavigate()
  const [data,setData]= React.useState()
  const [progress,setProgress]=React.useState(0)
  React.useEffect(()=>{
    if(!localStorage.getItem('office'))  navigate('/signin')
    let token=JSON.parse(localStorage.getItem('office')).token
    Api.get(`/order/${id}`,{
        headers:{
        'authorization':`Barear ${token}`
        }
    })
    .then((result)=>{
        setData(result.data)
        calcProgress(result.data)
      console.log(result.data)
    })
    .catch((err)=>{
        if(err.response.status==401) navigate('/signin') 
    })
  },[])
  const calcProgress=React.useCallback((data)=>{
    let temp = 0;
    if (data.cardStatus === 'approved') temp = temp + 1;
    if (data.delivery === 'approved') temp = temp + 1;
    if (data.embassyProcedures === 'approved') temp = temp + 1;
    if (data.externalRequest === 'approved') temp = temp + 1;
    if (data.foreig === 'approved') temp = temp + 1;
    if (data.laborMinistry === 'approved') temp = temp + 1;
    if (data.ticket === 'approved') temp = temp + 1;
    if (data.visaStatus === 'approved') temp = temp + 1;
    setProgress((temp/8)*100)
  })
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={progress} />
      <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};