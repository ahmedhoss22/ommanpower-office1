import React, { useCallback, useEffect, useState } from 'react';
// import { pieChartData } from '../../data/dummy';
import { ChartsHeader, Pie as PieChart } from '../../components';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation  } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Api from './../../config/Config';
import Typography from '@mui/material/Typography';

const Pie = () => {
const { t, i18n } = useTranslation();
const [country,setCountry]=useState([])
const [data,setData]=useState([])
const [sum,setSum]=useState([])
const navigate=useNavigate()
useEffect(()=>{
  if(!localStorage.getItem('office')) return navigate('/signin');
  let token=JSON.parse(localStorage.getItem('office')).token
  Api.get('/client/search',{
    headers:{
      'authorization':`Barear ${token}`,
    }
  })
  .then((result)=>{
    setData(result.data)
    setSum(agregation())
  })
  .catch((err)=>{
    console.log(`Error ${err}`);
  }) 

},[])
useEffect(()=>{
  if(!localStorage.getItem('office')) return navigate('/signin');
  let token=JSON.parse(localStorage.getItem('office')).token
  Api.get('/country',{
    headers:{
      'authorization':`Barear ${token}`,
    }
  })
  .then((result)=>{
    setCountry(result.data)
  })
  .catch((err)=>{
    console.log(`Error ${err}`);
  }) 
},[])
useEffect(()=>{
  setSum(agregation())
  data.length && setData(data.reverse())
},[data])
const agregation= useCallback(()=>{
    let temp=[];
    let result=[]
    for(let i in country) {
      temp[i]=data.filter((ele)=> ele.country.toLowerCase() == country[i].country.toLowerCase())
      console.log(country[i].country)
    }
    for(let i in temp){
      result[i]={x:country[i].country, y: temp[i].length,text:temp[i].length}
    }
    return result
  }
)

  return(
  <div className="m-4 md:m-10 mt-0 p-0 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <TableContainer component={Paper} style={{maxHeight:"600px",overflow:"scroll"}}>
      <Table  aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>{t("data.id")}</TableCell>
            <TableCell align="center">{t("data.name")}</TableCell>
            <TableCell align="center">{t("data.job")}</TableCell>
            <TableCell align="center">{t("data.age")}</TableCell>
            <TableCell align="center">{t("data.nationality")}</TableCell>
            <TableCell align="center" style={{minWidth:"117px"}}>{t("data.phone")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {data.map((row ,ind) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{ind+1}</TableCell>
              <TableCell align="center" component="th" scope="row">{row.clientName}</TableCell>
              <TableCell align="center">{row.job}</TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">{row.country}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
    <ChartsHeader style={{direction:'ltr'}} category="Pie" title={t("data.pieTitle")} />
    <div className="w-full" style={{direction:'ltr'}}>
      <PieChart id="chart-pie" data={sum} legendVisiblity height="full" />
    </div>
  </div>
  )
};

export default Pie;