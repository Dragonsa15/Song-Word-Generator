import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import BowlAnimation from './components/Bowl/BowlAnimation';


function App() {

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <BowlAnimation />
      </Box>
    </Container>
  );
}

export default App;
