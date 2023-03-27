import React ,{useState,useEffect}from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
 import { employeesData, staffGrid } from '../data/dummy';
import { useTranslation  } from 'react-i18next';
import Api from './../config/Config';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const navigate=useNavigate()
  const [data,setData]=useState([])
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    if(!localStorage.getItem('office'))  navigate('/signin')
    let token=JSON.parse(localStorage.getItem('office')).token
    Api.get('/staff/data',{
      headers:{
        'authorization':`Barear ${token}`
      }
    })
    .then((res)=>{
      setData(res.data)
      console.log(data);
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err.message);
      navigate('/signin')
    })
  },[])
  let langSwitch=staffGrid
  if(i18n.language=='ar'){
    langSwitch.map((ele)=>{
      ele.headerText=ele.headerText_ar
      return ele
    })
  }
  return (
    <div className='my-5  bg-white rounded-3xl' style={{direction:'ltr'}}>
      <h2 className='text-3xl text-e-bold mx-5' dir={i18n.language=='en'?'ltr':'rtl'}>{i18n.language=='en'?"Staff":"الموظفين"}</h2>
      {data.length!=0? <GridComponent dataSource={data} allowPaging toolbar={['Search']} width='auto'>
        <ColumnsDirective>
          {staffGrid.map((item, index) => (
           <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[ Page, Search, Toolbar]} />
      </GridComponent>
      :<h2>No staff data</h2>}
    </div>
  )
}

export default Employees