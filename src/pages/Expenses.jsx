import React,{useState,useEffect} from 'react'
import Api from './../config/Config';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useTranslation  } from 'react-i18next';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const Expenses = () => {
  const { t, i18n } = useTranslation();
  const navigate=useNavigate()
    const [data,setData]=useState([])
    useEffect(()=>{
        getData()
    },[])
    console.log(data);
    let total=data.reduce((prev,curr)=>prev+=curr.value,0)
    console.log(total);
    function getData(){
        if(!localStorage.getItem('office')) return navigate('/signin');
        let token=JSON.parse(localStorage.getItem('office')).token
        Api.get('expenses',{
            headers:{
                'authorization':`Barear ${token}`,
            }})
            .then((result)=>{
                setData(result.data)
                console.log(result.data);
            })
            .catch((err)=>{
                console.log(`Error ${err.message}`);
            }) 
        }
    const handleSubmit=React.useCallback((e)=>{
        e .preventDefault();
        if(!localStorage.getItem('office'))  navigate('/signin')
        let token=JSON.parse(localStorage.getItem('office')).token
        const formData=new FormData(e.currentTarget);
        Api.post('/expenses',{
            value:formData.get("value"),
            details:formData.get("details"),
            img:formData.get("img") || "none",
            id:data.length
        },{
            headers:{
        'authorization':`Barear ${token}`,
        'Content-Type': 'multipart/form-data'
             }})
        .then( (res)=>{
        console.log(res.data);
        getData()
        })
        .catch(err=> {
        console.log(err.message);
        })
        })
return (
    <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
    <h2 className='text-2xl font-bold'>{t("expenses.title")}</h2>
<TableContainer component={Paper} style={{maxHeight:"500px",minHeight:"200px",overflow:"scroll"}}>
<Table  aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>{t("expenses.id")}</TableCell>
      <TableCell align="center">{t("expenses.details")}</TableCell>
      <TableCell align="center">{t("expenses.value")}</TableCell>
      <TableCell align="center">{t("expenses.date")}</TableCell>
      <TableCell align="center"></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((row,ind) => (
      <TableRow key={row.ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row"> {ind+1} </TableCell>
        <TableCell align="center">{row.details} </TableCell>
        <TableCell align="center">{row.value} </TableCell>
        <TableCell align="center">{row.date} </TableCell>
        <TableCell align="center"><Button variant='contained' size='small'><Link to={`/Expenses/${row.id}`}>{t("expenses.viewDetails")}</Link> </Button> </TableCell>
      </TableRow>
    ))}
    
  </TableBody>
</Table>
</TableContainer>
{i18n.language=='en'&& <h3 className='text-2xl my-3' >Total Expenses : {total} OMR</h3>}
{i18n.language=='ar'&& <h3 className='text-2xl my-3' >اجمالي النفقات : {total} ريال عماني </h3>}
    <form className='md:w-1/2 sm:w-full' onSubmit={handleSubmit}>
        <Grid container spacing={2} >
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField required label={t("expenses.details")} labelId='name' name='details' fullWidth variant="outlined" margin='dense'/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField required type="number" label={t("expenses.value")} labelId='name' name='value' fullWidth variant="outlined" margin='dense' />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} >
                <TextField type="file" required  fullWidth name='img' variant="outlined" margin='dense' />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button variant="contained" type='submit' size='large'style={{ background: '#28a745', marginTop: '20px'}}>{t("expenses.save")}</Button>
            </Grid>
        </Grid>
    </form>
  </div>
  )
}

export default Expenses