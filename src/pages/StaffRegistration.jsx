import { Button, TextField ,Alert } from '@mui/material'
import React from 'react'
import { useState ,useEffect } from 'react'
import Api from '../config/Config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import { useSelector ,useDispatch} from 'react-redux';
import { fetchStaff, fetchOffices } from './../redux/reducers/register';
const StaffRegistration = () => {
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.register.value.staff.data)
  const offices=useSelector((state)=>state.register.value.offices)
  let type=JSON.parse(localStorage.getItem('office')).type =="admin"
  const { t, i18n } = useTranslation();
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  const [deleteLoading,setDeleteLoading]=useState('')
  const [submited,setSubmited]=useState(false)
  const [error,setError]=useState('')
  const [passError,setPassError]=useState('')
  const [userNameError,setUserNameError]=useState("")
  const [employeeData, setEmployeeData] = useState({ name: '', userName:'', password:'', confirmedPass:'', idNumber: '', phone: '',});
  useEffect(()=>{
    if(!localStorage.getItem('office')) return navigate('/signin')
    dispatch(fetchStaff())
    dispatch(fetchOffices())
  },[])
  const handleSubmit = async(event) => {
    event.preventDefault();
    setError("")
    setPassError("")
    setUserNameError("")
    let userNames=data.map((ele)=>ele.username)
    let emails=offices.map((ele)=>ele.email)
    if(userNames.includes(employeeData.userName))return setUserNameError("User name is already registered")
    if(emails.includes(employeeData.userName))return setUserNameError("User name is already registered")
    if(employeeData.password!= employeeData.confirmedPass){return setPassError("Password not the same")}
    if(employeeData.password.length <8) return setError("Password Must be more than 8 characters")
    if(employeeData.password !==employeeData.confirmedPass) return setError("Password must be the same")
    const token = JSON.parse(localStorage.getItem('office')).token;
    setLoading(true)
    Api.post('/staffData/registration',employeeData, {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      }).then(()=>{
        dispatch(fetchStaff())
        setSubmited(true)
        setError("")
        setPassError("")
        setUserNameError("")
        setLoading(false)
        setTimeout(()=> setSubmited(false),2000)
        setEmployeeData({ name: '', idNumber: '', phone: '', userName:"", password:"", confirmedPass:""})
      })
      .catch((err)=>{
        console.log(err.message);
        setLoading(false)
      })
  }
  const handleDelete=(id)=>{
    const token = JSON.parse(localStorage.getItem('office')).token;
    setDeleteLoading(id)
    Api.post('/staff/delete',{id}, {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      })
      .then(()=>dispatch(fetchStaff()))
      .then(()=>setDeleteLoading(''))
      .catch((err)=>{
        console.log(err.message);
        setDeleteLoading('')
      })
  }
  return (
    <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
    <h2 className='text-2xl font-bold'>{t("staff.title")}</h2>
      {
       type? 
       <>
        <form className='md:w-1/2 sm:w-full' onSubmit={handleSubmit}>
            <TextField value={employeeData.name} required label={t('staff.name')} name='name' fullWidth variant="outlined" margin='dense' onChange={(e) => {setEmployeeData({ ...employeeData, name: e.target.value})}}/>
            <TextField value={employeeData.userName} error={userNameError} helperText={userNameError} required label={t('staff.username')} name='username' fullWidth variant="outlined" margin='dense' onChange={(e) => {setEmployeeData({ ...employeeData, userName: e.target.value})}}/>
            <TextField value={employeeData.password} error={error!=""}  helperText={error} type="password" required label={t("staff.password")} name='password' fullWidth variant="outlined" margin='dense' onChange={(e) => {setEmployeeData({ ...employeeData, password: e.target.value})}}/>
            <TextField value={employeeData.confirmedPass} error={passError!=''} helperText={passError} type="password" required label={t("staff.confirmPassword")} name='confirmedPassword' fullWidth variant="outlined" margin='dense' onChange={(e) => {setEmployeeData({ ...employeeData, confirmedPass: e.target.value})}}/>
            <TextField value={employeeData.idNumber} required type="number" label={t("staff.id")} name='idNumber' fullWidth variant="outlined" margin='dense' onChange={(e) => {setEmployeeData({ ...employeeData, idNumber: e.target.value})}}/>
            <TextField value={employeeData.phone} type="number" required label={t('staff.phone')} name='phone' fullWidth variant="outlined" margin='dense' onChange={(e) => {setEmployeeData({ ...employeeData, phone: e.target.value})}}/>
            {!loading&& <Button type='submit' variant="contained" size='large' style={{ background: '#28a745', marginTop: '20px'}}>{t('staff.register')}</Button>}
            {loading &&  <LinearProgress style={{margin:"40px 0"}}/>}
            {submited?<Alert className='mt-5' severity="success">{t('staff.dataSent')}</Alert>
            :<Alert className='mt-5' severity="info">{t('staff.fillData')}</Alert>  
          }
        </form>
        <div className='w-full my-14' style={{maxHeight:"400px",overflowY:"scroll"}}>
      <TableContainer component={Paper} style={{overflowX:'scroll'}}>
      <Table  aria-label="simple table" style={{overflowX:'scroll'}}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>id</TableCell>
            <TableCell align="center">name</TableCell>
            <TableCell align="center">National Id</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Remove Emplyee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {data.map((row ,ind) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='center' component="th" scope="row">{row.id}</TableCell>
              <TableCell align='center' component="th" scope="row">{row.name}</TableCell>
              <TableCell align='center' component="th" scope="row">{row.id_number}</TableCell>
              <TableCell align='center' component="th" scope="row">{row.phone}</TableCell>
              <TableCell align="center">
                {!deleteLoading&& <Button variant='contained' color='error' style={{fontSize:'.7rem',padding:'2px 5px' ,minWidth:"100px"}} onClick={()=>handleDelete(row.id)}>delete</Button>}
                {deleteLoading==row.id&& <LinearProgress style={{maxWidth:"80px",margin:"auto"}}/>}
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      </>
      : <h2 className='mt-16' style={{textAlign:'center'}}>Sorry, content not avilable</h2>
      }
    </div>
  )
}

export default StaffRegistration