import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Home, VisitorRegistration, StaffRegistration, ReservedOrders, RegisterNewWorker, ClientRegistration, DataAnalysis, Guarantee, Finance, Chat, Attachments, Search, Settings, ExpiredCustomerData, Workers } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import './App.css';
import UnfinshedOrdres from './pages/UnfinshedOrders';
import { ChakraProvider } from '@chakra-ui/react'
import FinshedOrders from './pages/FinshedOrders';
import OrderDetails from './pages/OrderDetails';
import Expenses from './pages/Expenses';
import ExpensesDeatails from './components/ExpensesDetails';
import ViewDetails from './pages/ViewDetails';
function App() {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
            {/* <TooltipComponent content='Settings' position='Top'>
              <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-grey text-white' style={{ background: currentColor, borderRadius: '50%'}} onClick={() => setThemeSettings(true)}>
              <FiSettings/>
              </button>
            </TooltipComponent> */}
          </div>
          {
            activeMenu ? (
              <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                <Sidebar />
              </div>
            ):(
              <div className='w-0 dark:bg-secondary-dark-bg'> 
                <Sidebar />
              </div>
            )
          }
          <div 
            className={
              `dark:bg-main-dark-bg bg-white min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2' }`
            }
          >
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'><Navbar />
            <div>
            {themeSettings && <ThemeSettings />}
              <Routes>
                {/* Dashboard */}
                <Route path='/' element={<VisitorRegistration />} />
                {/* <Route path='/home' element={<Home />} /> */}
                {/* Pages */}
                <Route path='/visitor registration' element={<VisitorRegistration />} />
                <Route path='/staff registration' element={<StaffRegistration />} />
                <Route path='/unfinshed orders' element={<UnfinshedOrdres />} />
                <Route path='/finshed orders' element={<FinshedOrders />} />
                <Route path="/orderDetails/:id" element={ <OrderDetails/>} />
                <Route path="/viewDetails/:id" element={ <ViewDetails/>} />
                <Route path='/register a new worker' element={<RegisterNewWorker />} />
                <Route path='/sponsor registration' element={<ClientRegistration />} />
                <Route path='/data analysis' element={<DataAnalysis />} />c
                <Route path='/guarantee' element={<Guarantee />} />
                <Route path='/finance' element={<Finance />} />
                {/* <Route path='/chat' element={<Chat />} /> */}
                <Route path='/search' element={<Search />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/workers' element={<Workers />} />
                <Route path='/Expenses' element={<Expenses/>} />
                <Route path='/Expenses/:id' element={<ExpensesDeatails/>}/>
                <Route path='*' element={<UnfinshedOrdres/>} />
              </Routes>
            </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
