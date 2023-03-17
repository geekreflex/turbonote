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
      text4: '#999',
      text5: '#111',
      border1: '#eee',
      isActiveBg: '#333',
      isActive: '#fff',
      highlight: '#eee',
      hover1: '#444',
      hover2: '#ddd',
      searchBg: '#f6f6f6',
      scrollbarThumbBg: '#ccc',
      scrollbarTrackBg: '#f5f5f5',
      scrollbarThumbBgHover: '#999',
      btnBg1: '#111',
      btnText1: '#fff',
      shadow1: '0 0px 1px 1px #eee',
      shadow2:
        'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px, 0 0px 1px 1px #eee',
      shadow3: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px, 0 0px 1px 1px #eee',
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
      text4: '#5f6461',
      text5: '#fff',
      border1: '#444',
      isActiveBg: '#eee',
      isActive: '#333',
      highlight: '#212221c2',
      hover1: '#444',
      hover2: '#464343',
      searchBg: '#313231',
      scrollbarThumbBg: '#4e4c4c',
      scrollbarTrackBg: '#212221',
      scrollbarThumbBgHover: '#343735',
      btnBg1: '#fff',
      btnText1: '#111',
      shadow1: '0 0px 1px 1px #3e433e',
      shadow2:
        'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.2) 0px 10px 10px -5px, 0 0px 1px 1px #3e433e',
      shadow3: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px, 0 0px 1px 1px #3e433e',
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
