// src/App.js
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Container, Box, Typography } from '@mui/material';
import GlobalStyle from './globalStyles';
import BowlAnimation from './components/Bowl/BowlAnimation';
import theme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
          <BowlAnimation />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
