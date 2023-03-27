import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import SignIn from './pages/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './contexts/ContextProvider';
import { store } from './redux/store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <BrowserRouter>
        <Provider store={store}>
        <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route  path='*' element={<App />}/> 
        </Routes>
        </Provider>
        </BrowserRouter>
    </ContextProvider>
);
