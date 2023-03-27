import React ,{useEffect ,useState} from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Api from '../config/Config';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useTranslation  } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { REACT_APP_API_URL } from '../.env';
import { Button } from "@mui/material";
import Card from '@mui/material/Card';
const ExpensesDeatails=()=>{
  const apiUrl=REACT_APP_API_URL
  const { t, i18n } = useTranslation();
  let {id}=useParams()
    const navigate=useNavigate();
    const [data,setData]=useState({
        item:"no item to display",
        value:"0",
        img:""
    })
    useEffect(()=>{
        if(!localStorage.getItem('office'))  navigate('/signin')
        let token=JSON.parse(localStorage.getItem('office')).token
        Api.get(`/expenses/${id}`,{
            headers:{
                'authorization':`Barear ${token}`,
             }})
        .then((res)=>{
            setData(res.data)
        })
        .catch(err=> {
        console.log(err.message);
        })
    },[])
    return(
        <div className='mt-16 mx-5' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
            <h2 className='text-2xl font-bold mb-10'>{t("expenses.expensesDetails")}</h2>
            <Card sx={{ maxWidth: 500 ,minWidth:300 }} style={{margin:"auto"}}>
                <CardMedia component="img" sx={{maxWidth:400,minWidth: 300}} image={apiUrl+data.img} alt="Expensis details"/>
                <CardContent>
                    <Typography variant="h5" color="text.secondary">{t("expenses.details")} : {data.details}</Typography>
                    <Typography variant="h5" color="text.secondary">{t("expenses.value")} : {data.value}</Typography>
                    <Typography variant="h5" color="text.secondary">{t("expenses.date")} : {data.date}</Typography>
                </CardContent>
            </Card>
            <Button variant="contained" style={{margin:"30px 0"}} size="medium"><Link to='/Expenses' >{t("expenses.back")}</Link> </Button>
        </div>
    )
}
export default ExpensesDeatails