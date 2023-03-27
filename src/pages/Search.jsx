import React, { useState,useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import { ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-charts';
import { useTranslation  } from 'react-i18next';
import { finishedhGrid } from '../data/dummy';
import Api from './../config/Config';
import { useNavigate } from 'react-router-dom';
const Search = () => {
  const { t, i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState({phone:'',order:""});
  const [unfinshed, setUnfinshed] = useState([]);
  const [finshed, setFinshed] = useState([]);
  const navigate=useNavigate()
  useEffect(()=>{
    getFinshedOrders()
    getUnfishedOrders()
  },[])
function getUnfishedOrders(){
  if(!localStorage.getItem('office'))  navigate('/signin')
  let token=JSON.parse(localStorage.getItem('office')).token
  Api.get('/office/unfinshedorders',{
    headers:{
      'authorization':`Barear ${token}`
    }
  })
  .then((result)=>{
    setUnfinshed(result.data)
  })
  .catch((err)=>{
    if(err.response.status==401) navigate('/signin') 
  })
}
function getFinshedOrders(){
  if(!localStorage.getItem('office'))  navigate('/signin')
  let token=JSON.parse(localStorage.getItem('office')).token
  Api.get('/office/finshedorders',{
    headers:{
      'authorization':`Barear ${token}`
    }
  })
  .then((result)=>{
    setFinshed(result.data)
  })
  .catch((err)=>{
    if(err.response.status==401) navigate('/signin') 
  })
}
let finshedFilterdDate =finshed
let unfinshedFilterdDate =unfinshed
searchValue.order && (finshedFilterdDate= finshed.filter((ele)=> ele.id == searchValue.order))
searchValue.phone && (finshedFilterdDate= finshed.filter((ele)=> ele.phone == searchValue.phone))
searchValue.order && (unfinshedFilterdDate= unfinshed.filter((ele)=> ele.id == searchValue.order))
searchValue.phone && (unfinshedFilterdDate= unfinshed.filter((ele)=> ele.phone == searchValue.phone))
return (
    <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      <h2 className='text-2xl font-bold'>{t('search.title')}</h2>
      <div className='md:w-1/2 sm:w-full'>
        <TextField name='order' type="number" label={t('search.id')} fullWidth variant="outlined" margin='dense' onChange={(e) => {setSearchValue( {...searchValue, order: e.target.value})}}/>
        <TextField name='clientPhone' type="number" label={t('search.phone')} fullWidth variant="outlined" margin='dense' onChange={(e) => {setSearchValue( {...searchValue, phone: e.target.value})}}/>
      </div>
      <div className='mt-5 bg-white rounded-3xl'>
        <h2 className='text-2xl font-bold'>{t('search.finished')}</h2>
        <GridComponent dataSource={finshedFilterdDate} allowPaging toolbar={['Search']} width='auto'>
        <ColumnsDirective>
          {finishedhGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </GridComponent>
      </div>
      <div className='mt-5 bg-white rounded-3xl'>
        <h2 className='text-2xl font-bold'>{t('search.unfinished')}</h2>
        <GridComponent dataSource={unfinshedFilterdDate} allowPaging toolbar={['Search']} width='auto'>
        <ColumnsDirective>
          {finishedhGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}/>
          ))}
        </ColumnsDirective>
      </GridComponent>
      </div>
      
    </div>
  )
}

export default Search