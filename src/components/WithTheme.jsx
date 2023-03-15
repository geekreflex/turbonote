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
    },
  };

  const dark = {
    name: 'dark',
    colors: {
      bgColor: '#212422',
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
