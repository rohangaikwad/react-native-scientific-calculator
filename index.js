import React from 'react';
import Calculator from "./src/Calculator";
import { ThemeContextProvider } from './src/ThemeContext';


export default ({showLiveResult, scientific, customize, theme, haptics, history, showTooltip}) => {
    return (
        <ThemeContextProvider>
            <Calculator showLiveResult={showLiveResult} scientific={scientific} customize={customize} theme={theme} haptics={haptics} history={history} showTooltip={showTooltip}/>
        </ThemeContextProvider>
    );
}