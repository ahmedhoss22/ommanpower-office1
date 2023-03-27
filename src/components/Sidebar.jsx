import React ,{useEffect} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { links } from '../data/data';
import { useTranslation  } from 'react-i18next';
import { useStateContext } from '../contexts/ContextProvider';
import Api from './../config/Config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUnfinished, fetchfinished } from './../redux/reducers/orders';
const Sidebar = () => {
  const unfinished= useSelector((state)=>state.orders.value.unfinished.length)
  const finished= useSelector((state)=>state.orders.value.finished.length)
  console.log(finished);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    dispatch(fetchUnfinished())
    dispatch(fetchfinished())
  },[])


  const handleCloseSideBar = () => {
    if(activeMenu !== undefined && screenSize <= 900){
      setActiveMenu(false);
    }
  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {
        activeMenu && (
          <>
            <div className='flex justify-between items-center'>
              <Link to='/' onClick={handleCloseSideBar} className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'>
                 <span>وميض السنا لجلب الايدي العمالة</span>
              </Link>
              <TooltipComponent content='Menu' position='BottomCenter'>
                <button type='button' onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'>
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div className='mt-10'>
              {
                links.map((item) => (
                  <div key={item.title}>
                    <p className='text-gray-400 m-3 mt-4 uppercase'>{item.title}</p>
                    {
                      item.links.map((link,ind) => (
                        <NavLink to={`/${link.name}`} key={link.name} onClick={handleCloseSideBar} className={({ isActive }) => isActive ? activeLink : normalLink} style={({ isActive }) => ({backgroundColor: isActive ? currentColor : ''})}>
                          {link.icon}
                          <span className='capitalize'>{i18n.language=='en' ?link.name:link.name_ar}</span>
                          {ind== 1 &&<span style={{color:"rgb(40, 167, 69)",fontWeight:700}}>{unfinished}</span>}
                         {ind== 2 &&<span style={{color:"rgb(40, 167, 69)",fontWeight:700}}>{finished}</span>}
                        </NavLink>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default Sidebar