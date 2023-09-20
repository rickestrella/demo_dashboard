import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState(localStorage.getItem('colorMode') || '#03C9D7');
    const [currentMode, setCurrentMode] = useState(localStorage.getItem('theme') || 'Light');
    const [themeSettings, setThemeSettings] = useState(false);

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true });
    }

    const setColor = (mode) => {
        setCurrentColor(mode);
        localStorage.setItem('colorMode', mode);
    }

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('theme', e.target.value);
    }

    return (
        <StateContext.Provider value={{
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            handleClick,
            screenSize,
            setScreenSize,
            currentColor,
            currentMode,
            setColor,
            setMode,
            themeSettings,
            setThemeSettings
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);