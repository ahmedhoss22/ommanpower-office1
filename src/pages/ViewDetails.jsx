import React ,{useState,useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation  } from 'react-i18next';
import Api from './../config/Config';
import { REACT_APP_API_URL } from '../.env';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button } from '@mui/material';
import "../App.css"
const ViewDetails = () => {
  const apiUrl=REACT_APP_API_URL
  const { t, i18n } = useTranslation();
  let {id} =useParams()
    const navigate=useNavigate()
    const [data,setData]=useState({
        imgPath:".."
    })
    useEffect(()=>{
        if(!localStorage.getItem('office'))  navigate('/signin')
        let token=JSON.parse(localStorage.getItem('office')).token
        Api.get('/office/unfinshedorders',{
          headers:{
            'authorization':`Barear ${token}`
          }
        })
        .then((result)=>{
            console.log(result.data);
            setData(result.data.find((ele)=>ele.id==id))
        })
        .catch((err)=>{
          if(err.response.status==401) navigate('/signin') 
        })
    },[])
    return (
    <div className='mt-16 mb-5 mx-5 bg-white rounded-3xl'>
     <Link to="/unfinshed orders"><h2 className='text-2xl font-bold mb-2 ml-5'> <ArrowBackRoundedIcon className='arrow'/>   {t("unfinished.backUnfinshed")}</h2></Link>
        <div className='flex flex-col lg:flex-row align-middle justify-center'>
            <div className='sm:my-10 card' style={{minHeight:"300px"}} >
                <h2 className='text-center text-xl font-bold'>{t("unfinished.visa")} </h2>
                <img src={apiUrl+data.visa} height="100%" width="100%" alt="aSas" />
            </div>
            <div className='sm:my-10 card'>
                <h2 className='text-center text-xl font-bold'>{t("unfinished.card")}</h2>
                <img src={apiUrl+data.card} height="100%" width="100%" alt="aSas" />
            </div>
        </div>
    </div>
  )
}
export default ViewDetails