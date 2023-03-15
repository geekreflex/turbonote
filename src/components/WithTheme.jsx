import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { getFromLS } from '../utils/storage';

const WithTheme = ({ children }) => {
  const { mode } = useSelector((state) => state.action);

  const light = {
    name: 'Light',
    colors: {
      bgColor: '#fff',
      cardBg: '#fff',
      text1: '#333',
      text2: '#444',
      text3: '#555',
      border1: '#999',
      isActiveBg: '#333',
      isActive: '#fff',
      highlight: '#eee',
      hover1: '#444',
      shadow1: '0 0px 1px 1px #eee',
      shadow2:
        'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px, 0 0px 1px 1px #eee',
    },
  };

  const dark = {
    name: 'dark',
    colors: {
      bgColor: '#212221',
      cardBg: '#292c2a',
      text1: '#fff',
      text2: '#eee',
      text3: '#f5f5f5',
      border1: '#444',
      isActiveBg: '#eee',
      isActive: '#333',
      highlight: '#212221c2',
      hover1: '#444',
      shadow1: '0 0px 1px 1px #3e433e',
      shadow2:
        'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.2) 0px 10px 10px -5px, 0 0px 1px 1px #3e433e',
    },
  };

  const renderThemeMode = () => {
    if (mode === 'light') {
      return light;
    }

    if (mode === 'dark') {
      return dark;
    }

    return light;
  };

  return <ThemeProvider theme={renderThemeMode()}>{children}</ThemeProvider>;
};

export default WithTheme;
