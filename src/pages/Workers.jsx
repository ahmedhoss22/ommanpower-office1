import React ,{useState,useEffect} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useTranslation  } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { REACT_APP_API_URL } from '../.env';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWorkers } from '../redux/reducers/worker';
import { deleteWorker } from './../redux/reducers/worker';
import Api from './../config/Config';
const Employees = () => {
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.worker.value.worker)
  const apiUrl=REACT_APP_API_URL
  const [id,setId]=useState()
  const [cancel , setCancel] = useState(false);
  const handleCancelClose =()=> setCancel(false)
  const handleCancelOpen =(id,client_id)=> {
    setId(id)
    setCancel(true)
  }
  useEffect(()=>{
    dispatch(fetchWorkers())
  },[])
  const { t, i18n } = useTranslation();  const style = {
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
  function handleSubmit(){
    const token = JSON.parse(localStorage.getItem('office')).token;
    setCancel(false)
    Api.post('/worker/delete',{id},{
      headers: {
        'authorization': `Bearer ${token}`,
      },
    }).then(()=>dispatch(fetchWorkers()))
    
    console.log(id);
  }
  return (
    <div className='mt-16 mx-5 bg-white rounded-3xl' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      {i18n.language=='en'&& <Header title='Workers'/>}
      {i18n.language=='ar'&& <Header title='العمال'/>}
      <TableContainer component={Paper} style={{overflowX:'scroll'}}>
      <Table  aria-label="simple table" style={{overflowX:'scroll'}}>
        <TableHead>
          <TableRow>
            <TableCell>{t("unfinished.id")}</TableCell>
            <TableCell align="center">{t('unfinished.image')}</TableCell>
            <TableCell align="center">{t('unfinished.name')}</TableCell>
            <TableCell width="200px" align="center">{t('worker.passport')}</TableCell>
            <TableCell align="center">{t('unfinished.nationality')}</TableCell>
            <TableCell align="center">{t('unfinished.job')}</TableCell>
            <TableCell align="center">{t('unfinished.age')}</TableCell>
            <TableCell align="center">{t('unfinished.salary')}</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {data.map((row ,ind) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="center"><img src={apiUrl+row.imgPath} alt='teeeeeeest' className='rounded-t w-10 h-10' /></TableCell>
              <TableCell align="center" component="th" scope="row">{row.name}</TableCell>
              <TableCell align="center" component="th" scope="row">{row.passportNumber}</TableCell>
              <TableCell align="center">{row.nationality}</TableCell>
              <TableCell align="center">{row.job}</TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">{row.salary}</TableCell>
              <TableCell align="center"><Button variant='contained' color='error' style={{fontSize:'.7rem',padding:'2px 5px' ,minWidth:"100px"}} onClick={()=>handleCancelOpen(row.id)}>{t('worker.remove')}</Button></TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog style={style} open={cancel} onClose={handleCancelClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
      {t('unfinished.confiramationMsg')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {t('worker.confirm')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClose} autoFocus variant='contained' color='success'>{t('unfinished.close')}</Button>
        <Button onClick={handleSubmit} variant='contained' color='error'>{t('worker.delete')}</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}
export default Employees