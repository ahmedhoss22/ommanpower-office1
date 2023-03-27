import { ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-charts';
import { GridComponent, Inject, Page, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import React ,{useEffect,useState} from 'react';
import { Header } from '../components';
import { guaranteeGrid } from '../data/dummy';
import Api from './../config/Config';
import { useTranslation  } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const Guarantee = () => {
  const { t, i18n } = useTranslation();
  const navigate=useNavigate()
  const [data,setData]=useState([])
  useEffect(()=>{
    if(!localStorage.getItem('office'))  navigate('/signin')
    let token=JSON.parse(localStorage.getItem('office')).token
    Api.get('/guaratee',{
      headers:{
        'authorization':`Barear ${token}`
      }
    })
    .then((res)=>{
        console.log(res.data)
        setData(res.data)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  },[])
  return (
    <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      {i18n.language=='en'&& <h2 className='text-2xl font-bold'>Guarantee</h2>}
      {i18n.language=='ar'&& <h2 className='text-2xl font-bold'>الضمانات</h2>}
      <div className='mt-5 bg-white rounded-3xl'>
      <GridComponent dataSource={data} allowPaging toolbar={['Search']} width='auto'>
        <ColumnsDirective>
          {guaranteeGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[ Page, Search, Toolbar]} />
      </GridComponent>
    </div>
    </div>
  )
}

export default Guarantee