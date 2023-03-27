import React, { useState ,useEffect } from 'react';
import { Button, TextField ,Alert } from '@mui/material';
import { useTranslation  } from 'react-i18next';
import { REACT_APP_API_URL } from '../.env';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVisitors ,postVisitors} from './../redux/reducers/register';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import LinearProgress from '@mui/material/LinearProgress';
import {  vistorsGrid } from '../data/dummy';
import CircularProgress from '@mui/material/CircularProgress';
import Api from './../config/Config';
import { useNavigate } from 'react-router-dom';
const VisitorRegistration = () => {
  const navigate =useNavigate()
  const dispatch=useDispatch() 
  const data=useSelector((state)=>state.register.value.visitors)
  const apiUrl=REACT_APP_API_URL
  const { t, i18n } = useTranslation();
  const [loading,setLoading]=useState(false)
  const [submited,setSubmited]=useState(false)
  const [visitorData, setVisitorData] = useState({ name: '', phone: '', nationality: ''});

  useEffect(()=>{
    dispatch(fetchVisitors())
    if(!JSON.parse(localStorage.getItem('office'))) return navigate("signin")
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    
    const token = JSON.parse(localStorage.getItem('office')).token;
      Api.post('/visitorData/registration',visitorData, {
      headers: {
        'authorization': `Bearer ${token}`,
      }})
      .then(()=>{
        dispatch(fetchVisitors())
        setLoading(false)
        setSubmited(true)
        setTimeout(()=>setSubmited(false),2000) 
        setVisitorData({name: '',phone: '',nationality: ''})
      })
      .catch((err)=>{
        console.log(err.message);
        setLoading(false)
        setSubmited(false)
      })
  }
  return (
    <div className='mt-16 ml-5 mr-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      <h2 className='text-2xl font-bold'>{t('visitor.title')}</h2>
      <form className='md:w-1/2 sm:w-full' onSubmit={handleSubmit}>
          <TextField value={visitorData.name} required label={t('visitor.name')} name='name' fullWidth variant="outlined" margin='dense' onChange={(e) => {setVisitorData({ ...visitorData, name: e.target.value})}}/>
          <TextField value={visitorData.phone} required type="number" label={t('visitor.phone')} name='phone' fullWidth variant="outlined" margin='dense' onChange={(e) => {setVisitorData({ ...visitorData, phone: e.target.value})}}/>
          <TextField value={visitorData.nationality} required label={t('visitor.nationality')} name='nationality' fullWidth variant="outlined" margin='dense' onChange={(e) => {setVisitorData({ ...visitorData, nationality: e.target.value})}}/>
          {!loading&&<Button type='submit' variant="contained" size='large' style={{ background: '#28a745', marginTop: '20px'}}>{t("visitor.register")}</Button>}
          {loading&& <LinearProgress style={{margin:"40px 0"}}/>}
          {submited?<Alert className='mt-5 mr-5' severity="success">{t('visitor.dataSent')}</Alert>
          :<Alert className='mt-5 mr-5' severity="info">{t('visitor.fillData')}</Alert>  
        }
      </form>
      <div className='my-16 mx-5 bg-white rounded-3xl' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      <GridComponent dataSource={data} allowPaging toolbar={['Search']} width='auto' style={{maxHeight:"600px",overflowY:"scroll"}}>
        <ColumnsDirective>
          {vistorsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[ Page, Search, Toolbar]} />
      </GridComponent>
    </div>
    </div>
  )
}

export default VisitorRegistration