import { Button } from "@mui/material";
import React, { useCallback, useEffect ,useState} from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import Api from './../config/Config';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { useTranslation  } from 'react-i18next';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OrderFlow from './../components/OrderFlow';
import OrderFinance from './../components/OrderFinance';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import '../App.css'
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}  aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {children: PropTypes.node,index: PropTypes.number.isRequired,value: PropTypes.number.isRequired,};
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const OrderDetails=()=>{
  const { t, i18n } = useTranslation();
  const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
    const [data,setData]=useState()
    console.log(data);
    let {id}=useParams()
    const navigate =useNavigate()
    useEffect(()=>{
       getData()
    },[id])
    const getData=useCallback(()=>{
      if(!localStorage.getItem('office'))  navigate('/signin')
      let token=JSON.parse(localStorage.getItem('office')).token
      Api.get(`/order/${id}`,{
          headers:{
          'authorization':`Barear ${token}`
          }
      })
      .then((result)=>{
          setData(result.data)
      })
      .catch((err)=>{
          if(err.response.status==401) navigate('/signin') 
      })
    })
    return(
        <div className='mt-16 mb-5 mx-5 bg-white rounded-3xl' style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
       {i18n.language=='en'&& <h2 className='text-2xl font-bold mb-8 ml-5'> <Link to="/finshed orders"> <ArrowBackRoundedIcon className='arrow'/> </Link> Orders {id} details</h2>}
       {i18n.language=='ar'&& <h2 className='text-2xl font-bold mb-8 ml-5'><Link to="/finshed orders"> <ArrowBackRoundedIcon className='arrow'/> </Link>تفاصيل الطلب رقم {id} </h2>}
        <Box sx={{ width: '100%' }} minHeight="300px">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} centered onChange={handleChange} aria-label="basic tabs example" >
                    <Tab label={t("finished.finance")} {...a11yProps(0)} />
                    <Tab label={t("finished.attachment")} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <OrderFinance />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OrderFlow data={data} update={getData}/>
            </TabPanel>
        </Box>
        </div>
        
    )
}

export default React.memo(OrderDetails) ;