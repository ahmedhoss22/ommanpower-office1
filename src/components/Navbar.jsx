import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import Api from './../config/Config';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation  } from 'react-i18next';
import { Avatar, Box,Button } from '@mui/material';
import { REACT_APP_API_URL } from '../.env';
import { fetchOffice } from './../redux/reducers/office';
import { useSelector, useDispatch } from 'react-redux';
import logo from "../data/logo.jpeg"

const NavButton = ({ title, customFunc, icon, color, dotColor}) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{color}} className='relative text-xl rounded p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'/>
        {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const dispathc=useDispatch()
  let data=useSelector((state)=>state.office.value.data)
  const apiUrl=REACT_APP_API_URL
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, currentColor, cart, setCart, chat, setChat, notification, setNotification, userProfile, setUserProfile } = useStateContext();
  const { t, i18n } = useTranslation();
  const navigate=useNavigate()
  const btnStyles={
    marginLeft:"20px",
    padding:'4px',
    width:"95px",
    fontSize:"15px",
    fontWeight:"700"
  }
  // const [data,setData]=useState({name:"",file:0})
  useEffect(()=>{
    if(!localStorage.getItem('office')) return navigate('/signin');
    dispathc(fetchOffice())
  },[])
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false);
    }else{
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title='Menu' customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={currentColor} icon={<AiOutlineMenu />} />
      <div className='flex'>
        <TooltipComponent content='Profile' position='BottomCenter'>
          <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg' onClick={() => setUserProfile(true)}>
              {/* { data.file==0 && <Avatar sx={{ width: 24, height: 24 ,backgroundColor:"rgb(31, 108, 250)"}}></Avatar>} */}
              {/* {data.file&& data.file!=0 && <img src={apiUrl+data.file} alt='user' className='rounded-full w-8 h-8' />} */}
              {/* { !data.file && <Avatar sx={{ width: 24, height: 24 ,backgroundColor:"rgb(31, 108, 250)"}}></Avatar>} */}
              <img src={logo} alt='user' className='rounded-full w-8 h-8' />
            <p>
            {
              i18n.language=='en' && <span className='text-gray-400 text-14'>{`${t('title')} ${data.officeName}`} </span>
            }
            {
              i18n.language=='ar' && <span className='text-gray-400 text-14'>{`${data.officeName} ${t('title')}`} </span>
            }            
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14'/>
          </div>
        </TooltipComponent>
        {cart && <Cart />}
        {chat && <Chat />}
        {notification && <Notification />}
        {userProfile && <UserProfile />} 
        <Box className="flex justify-center items-center">
        {
          i18n.language=='en' &&<Button style={btnStyles} variant="outlined" size='small' color="success" onClick={()=>i18n.changeLanguage('ar')}>
          <img src={require('../data/suadia.png')} className="rounded-full mr-2 w-5 h-5"/>
            العربية
          </Button>
        }
        {
        i18n.language =='ar'&&<Button style={{marginLeft:"20px",padding:'4px',width:"95px",fontWeight:"700"}} variant="outlined" size='small' color="success" onClick={()=>i18n.changeLanguage('en')}>
          <img src={require('../data/en.jpg')} className="rounded-full mr-2 w-5 h-5"/>
          English
          </Button> 
      }
        </Box>
      </div>
    </div>
  )
}

export default Navbar