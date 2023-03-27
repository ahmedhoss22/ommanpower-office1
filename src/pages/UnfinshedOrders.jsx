import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from './../config/Config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useTranslation  } from 'react-i18next';
import { REACT_APP_API_URL } from '../.env';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { confirmOrder, fetchUnfinished, cancelOrder, fetchfinished } from './../redux/reducers/orders';
import "../App.css"
const UnfinshedOrdres = () => {
  const unfinished=useSelector((state)=>state.orders.value.unfinished)
  console.log(unfinished);
  const dispatch=useDispatch()
  const apiUrl=REACT_APP_API_URL
  const { t, i18n } = useTranslation();
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
  const stackStyles={
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height:600,
    width :200,
    zIndex:-1
    
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
  const [loading,setLoading]=useState("")
  const [id,setId]=useState()
  const [confirm, setConfirm] = useState(false);
  const [cancel , setCancel] = useState(false);
  const [clientId,setClientId]=useState()
  const handleClose = () => setOpen(false);
  const handleConfirmOpen =(id,client_id)=>{
    setId(id)
    setClientId(client_id)
    setConfirm(true)
  }
  const [visa,setVisa]=useState()
  const [card,setCard]=useState()
  const handleCancelOpen =(id,client_id)=> {
    setId(id)
    setCancel(true)
    setClientId(client_id)
  }
  const handleConfirmClose =()=> setConfirm(false)
  const handleCancelClose =()=> setCancel(false)
  const [data,setData]=useState([])
  const handleOpen = (ele) =>{
    setVisa(ele.visa)
    setCard(ele.card)
    setOpen(true);
    }
  useEffect(()=>{
    dispatch(fetchUnfinished())
  },[])
  async function handleConfirmSubmit(){
   handleConfirmClose()
   setLoading(id)
   const token = JSON.parse(localStorage.getItem('office')).token;
    await Api.post('/office/confirmOrder',{id,clientId}, {
       headers: {
         'authorization': `Bearer ${token}`,
       },
     }).then(()=>{
          dispatch(fetchUnfinished())
          dispatch(fetchfinished())
          setLoading("")
     }).catch((err)=>{
          setLoading("")
          console.log(err.message);
     })
    }
  async function handleCancelSubmit(){
    handleCancelClose()
    setLoading(id)
    const token = JSON.parse(localStorage.getItem('office')).token;
     await Api.post('/office/cancelOrder',{id,clientId}, {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }).then(()=>{
        dispatch(cancelOrder({id,clientId}))
        dispatch(fetchUnfinished())
        setLoading("")
      }).catch((err)=>{
          console.log(err.message);
          setLoading("")
        })
  }
  return (
    <div className='mt-16 mx-5 ' >
    <div className='w-full' style={{minHeight:"500px"}}>
    <div className='mt-5 bg-white rounded-3xl'>
      <h2 className='text-2xl font-bold mb-10'>{t("unfinished.title")}</h2>

    <TableContainer component={Paper} className='table1' >
      <Table  aria-label="simple table" style={{overflowX:'scroll'}}>
        <TableHead>
          <TableRow>
            <TableCell>{t("unfinished.id")}</TableCell>
            <TableCell align="center">{t('unfinished.image')}</TableCell>
            <TableCell align="center">{t('unfinished.name')}</TableCell>
            <TableCell align="center">{t('unfinished.clientName')}</TableCell>
            <TableCell align="center">{t('unfinished.nationality')}</TableCell>
            <TableCell align="center">{t('unfinished.job')}</TableCell>
            <TableCell align="center">{t('unfinished.age')}</TableCell>
            <TableCell align="center">{t('unfinished.salary')}</TableCell>
            <TableCell align="center" style={{minWidth:"117px"}}>{t('unfinished.clientPhone')}</TableCell>
            <TableCell align="center" style={{minWidth:"120px"}}>{t('unfinished.clientId')}</TableCell>
            {/* <TableCell align="center">{t('unfinished.viewDetails')}</TableCell> */}
            <TableCell align="center">{t('unfinished.acceptOrder')}</TableCell>
            <TableCell align="center">{t('unfinished.cancelOrder')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {unfinished.map((row ,ind) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="center"><img src={apiUrl+row.image} alt='teeeeeeest' className='rounded-t w-10 h-10' /></TableCell>
              <TableCell align="center" component="th" scope="row">{row.name}</TableCell>
              <TableCell align="center" component="th" scope="row">{row.clientName}</TableCell>
              <TableCell align="center">{row.country}</TableCell>
              <TableCell align="center">{row.job}</TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">{row.salary}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.client_id}</TableCell>
              {/* {!loading&&<TableCell align="center"><Button onClick={()=>navigate(`/viewDetails/${row.id}`)} variant='outlined' style={{fontSize:'.7rem',padding:'2px 5px' ,minWidth:"100px"}}>{t('unfinished.viewDetails')}</Button></TableCell>} */}
              {!loading&&<TableCell align="center"><Button variant='contained' color='success' style={{fontSize:'.7rem',padding:'2px 5px' ,minWidth:"100px"}} onClick={()=>handleConfirmOpen(row.id,row.client_id)}>{t('unfinished.acceptOrder')}</Button></TableCell>}
              {!loading&&<TableCell align="center"><Button variant='contained' color='error' style={{fontSize:'.7rem',padding:'2px 5px' ,minWidth:"100px"}} onClick={()=>handleCancelOpen(row.id,row.client_id)}>{t('unfinished.cancelOrder')}</Button></TableCell>}
              {loading==row.id && <TableCell align='center' colSpan={3}><LinearProgress /></TableCell> }
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>

    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" style={style}>
      <Stack  style={stackStyles} spacing={1}>
          <Item>
              <Typography variant='h5'>{t('client.card')}</Typography>
              <img src={card} />
          </Item>
          <Item>
              <Typography variant='h5'>{t('client.visa')}</Typography>
              <img src={visa} style={{}}/>
          </Item>
      </Stack>
    </Modal>
    <Dialog style={style} open={confirm} onClose={handleConfirmClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
      {t('unfinished.confiramationMsg')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {t('unfinished.confiramationDetails')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmClose} variant='contained' color='error'>{t('unfinished.cancel')}</Button>
        <Button onClick={handleConfirmSubmit} autoFocus variant='contained' color='success'>{t('unfinished.aprrove')}</Button>
      </DialogActions>
    </Dialog>
    <Dialog style={style} open={cancel} onClose={handleCancelClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
      {t('unfinished.confiramationMsg')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {t('unfinished.confiramationDetailsDelete')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClose} autoFocus variant='contained' color='success'>{t('unfinished.close')}</Button>
        <Button onClick={handleCancelSubmit} variant='contained' color='error'>{t('unfinished.delete')}</Button>
      </DialogActions>
    </Dialog>
    </div>
    </div>

  </div>
  )
}

export default UnfinshedOrdres