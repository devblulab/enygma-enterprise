import React, { useState } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AutenticacaoProvider } from '@/data/contexts/AutenticacaoContext';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from '@/theme'; // certifique-se que este arquivo existe
import Particles from '@/components/landing/particles';
import { FaSun, FaMoon } from 'react-icons/fa';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';

const lightTheme = {
  backgroundColor: 'lightgray',
  textColor: 'black',
};

const darkTheme = {
  backgroundColor: 'black',
  textColor: 'white',
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
  }
`;

function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <AutenticacaoProvider>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={toggleTheme} 
                className="noPrint"
                style={{ 
                  position: 'fixed',
                  top: '1px', 
                  right: '1px',
                  border: '1px solid #cc32c', 
                  background: 'linear-gradient(45deg, #807770 29%, #002340 90%)',
                  borderRadius: '4px', 
                  padding: '8px', 
                  cursor: 'pointer',
                  zIndex: 1000,
                }}
              >
                {theme === 'light' ? <FaMoon style={{ fontSize: '1em' }} /> : <FaSun style={{ fontSize: '1em' }} />} 
              </button>
            </div>
            <Component {...pageProps} />
            <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />
          </AutenticacaoProvider>
        </MantineProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
