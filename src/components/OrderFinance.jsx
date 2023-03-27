import React ,{ useState ,useEffect} from 'react'
import { Button, Grid, InputLabel, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Api from './../config/Config';
import { useNavigate, useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTranslation  } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkers } from '../redux/reducers/worker';

const OrderFinance = () => {
  const dispatch =useDispatch()
  const { t, i18n } = useTranslation();
  let {id}=useParams()
  useEffect(()=>{dispatch(fetchWorkers())},[])
  let workers=useSelector((state)=>state.worker.value.worker)
  console.log(workers);
  const navigate=useNavigate()
  const [confirm, setConfirm] = useState(false);
  const [data,setData]=useState([])
  const [item,setItem]=useState('')
  const [value,setValue]=useState()
  const [select,setSelect]=useState()
  const [details,setDetails]=useState()
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

  function handleConfirm(e){
    e.preventDefault();
    setConfirm(true)
    // data.length==0 && setItem("Intial Value")
    // data.length!=0 && setItem("Indebtedness")
  }
  useEffect(()=>{
    getData()
    calcFinance()
  },[])
  function getData(){
    if(!localStorage.getItem('office')) return navigate('/signin');
    let token=JSON.parse(localStorage.getItem('office')).token
    Api.get(`/order/finance/${id}`,{
      headers:{
      'authorization':`Barear ${token}`
    }})
    .then((result)=>{
      setData(result.data)
      calcFinance()
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }
  const handleSubmit=React.useCallback((event)=>{
    if(!value) return
    event.preventDefault();
    if(!localStorage.getItem('office')) return navigate('/signin');
    let token=JSON.parse(localStorage.getItem('office')).token
    Api.post('/order/finance',{
      item,
      value,
      id,
      details,
    },{headers:{
      'authorization':`Barear ${token}`
    }})
    .then(()=>{
      setValue("")
      getData()
      setConfirm(false)
      setDetails("")
      setItem("Indebtedness")
    })
    .catch((err)=>{
      console.log(err.message);
    })
  })
  function calcFinance() {
    let totalInitialValue = 0;
    let totalIndebtedness = 0;
    data.forEach((item) => {
      if (item.item === 'Intial Value') {
        totalInitialValue += item.value;
      } else if (item.item === 'Indebtedness') {
        totalIndebtedness += item.value;
      }
    });
    const difference = totalInitialValue - totalIndebtedness;
    return difference
  }
  return (
    <div className=' ml-5'>
<TableContainer component={Paper} style={{minHeight:"300px"}}>
<Table  aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>{t('finished.finnceId')}</TableCell>
      <TableCell align="center">{t('finished.operation')}</TableCell>
      <TableCell align="center">{t('finished.value')}</TableCell>
      <TableCell align="center">{t('finished.details')}</TableCell>
      <TableCell align="center">{t('finished.date')}</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.length!==0? data.map((row,ind) => (
      <TableRow key={row.ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row"> {ind+1} </TableCell>
        <TableCell align="center">{row.item} </TableCell>
        <TableCell align="center">{row.value} </TableCell>
        <TableCell align="center">{row.details} </TableCell>
        <TableCell align="center">{row.date} </TableCell>
      </TableRow>
    )):<p className='text-center'>No data to display</p>}
  </TableBody>
</Table>
</TableContainer>
        <h2 className='font-bold text-lg'>{t('finance.totalFinance')}: {calcFinance()} OMR</h2>
    <form className='md:w-1/2 sm:w-full' onSubmit={handleConfirm}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <InputLabel id="demo-simple-select-label">{t('finished.type')}</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" required fullWidth value={item} label="Item" onChange={(e)=>setItem(e.target.value)}>
              <MenuItem value="Intial Value" disabled={data.some(ele =>ele.item == 'Intial Value')}>{t('finished.intial')}</MenuItem>
              <MenuItem value="Indebtedness">{t('finance.indebtedness')}</MenuItem>
            </Select>
        </Grid>
      {item=="Intial Value" &&
        <Grid item xs={6} md={4}>
          <InputLabel id="demo-simple-select-label">{t('finished.type')}</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" required fullWidth value={details} label="Item" onChange={(e)=>setDetails(e.target.value)}>
            <MenuItem value="cash">{t('finished.cash')}</MenuItem>
            <MenuItem value="visa">{t('finished.visa')}</MenuItem>
          </Select>
        </Grid>
        } 
      {item=="Indebtedness" && 
      <Grid item xs={6} md={4}>
      <TextField value={details} style={{marginTop:"23px"}} required type="text" label={t('finished.indebtednessDetails')} fullWidth labelId='details' name='details'  variant="outlined" margin='dense' onChange={(e)=>setDetails(e.target.value)}/>
      </Grid>
      }
         <Grid item xs={6} md={4}>
          <TextField value={value} style={{marginTop:"23px"}} required type="number" label={t('finished.value')} fullWidth labelId='value' name='value'  variant="outlined" margin='dense' onChange={(e)=>setValue(e.target.value)}/>
         </Grid>
        <Grid item xs={6} md={4}>
          <Button variant="contained" type='submit' size='large'style={{ background: '#28a745', marginTop: '30px'}}>{t('finished.save')}</Button>
        </Grid>
      </Grid>
    </form>
    <Dialog style={style} open={confirm} onClose={()=>{setConfirm(false)}} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {t("finished.confirmTitle")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {t('finished.confirmMsg')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{setConfirm(false)}} variant='contained' color='error'>{t('finished.cancel')}</Button>
        <Button onClick={handleSubmit} autoFocus variant='contained' color='success'>{t('finished.confirm')}</Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}
export default OrderFinance