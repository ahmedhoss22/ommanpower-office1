import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
};

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#28a745');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [cart, setCart] = useState(false);
    const [chat, setChat] = useState(false);
    const [notification, setNotification] = useState(false);
    const [userProfile, setUserProfile] = useState(false)
    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        setThemeSettings(false);
    }
    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false);
    }
    const handleClick = (clicked) => {
        setIsClicked({...initialState,  [clicked]:true });
    }
    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                currentColor,
                currentMode,
                themeSettings,
                setThemeSettings,
                setMode,
                setColor,
                cart,
                setCart,
                chat,
                setChat,
                notification,
                setNotification,
                userProfile,
                setUserProfile
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);