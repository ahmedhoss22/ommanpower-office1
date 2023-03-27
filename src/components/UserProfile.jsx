import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Api from './../config/Config';
import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { REACT_APP_API_URL } from '../.env';
import { useSelector } from 'react-redux';
import logo from "../data/logo.jpeg"

const UserProfile = () => {
  let data =useSelector((state)=>state.office.value.data)
  console.log(data);
  const { currentColor, setUserProfile } = useStateContext();
  const apiUrl=REACT_APP_API_URL
  const navigate=useNavigate()
  function handleLogout(){
    localStorage.removeItem('office')
    navigate('/signin')
  }
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <button
            type='button'
            onClick={() => setUserProfile(false)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%'}}
            className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'
          >
            <MdOutlineCancel />
          </button>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
      {/* { */}
        {/* data.file? */}
        <img src={logo}  alt='user' className='rounded-full w-20 h-20' />
        {/* <Avatar sx={{ width: 50, height: 50 ,backgroundColor:"rgb(31, 108, 250)"}}></Avatar> */}
      {/* } */}
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {data.officeName} </p>
          {data.name&&<p className="text-gray-500 text-sm font-semibold dark:text-gray-400">staff name: {data.name} </p>}
          {data.email&&<p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {data.email} </p>}
          {data.username&&<p className="text-gray-500 text-sm font-semibold dark:text-gray-400">email :{data.username} </p>}
          {data.phone&&<p className="text-gray-500 text-sm font-semibold dark:text-gray-400">phone :{data.phone} </p>}
          {data.officePhone&&<p className="text-gray-500 text-sm font-semibold dark:text-gray-400">office phone :{data.officePhone} </p>}
          {data.mangerPhone&&<p className="text-gray-500 text-sm font-semibold dark:text-gray-400">manger phone :{data.mangerPhone} </p>}
          {data.governorate&&<p className="text-gray-500 text-sm font-semibold dark:text-gray-400">Location :{data.governorate} </p>}
        </div>
      </div>
      <div className="mt-5" onClick={handleLogout}>
        <Button color="white" bgColor={currentColor} text="Logout" borderRadius="10px" width="full"/>
      </div>
    </div>

  );
};

export default UserProfile;