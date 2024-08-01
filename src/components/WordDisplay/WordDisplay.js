import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const WordDisplay = ({ word, onAccept, onReroll }) => {
  return (
    <Box sx={{ position: 'absolute', bottom: 20 }}>
      <Button variant="contained" color="primary" onClick={onAccept}>Accept</Button>
      <Button variant="contained" color="secondary" onClick={onReroll}>Reroll</Button>
    </Box>
  );
};

export default WordDisplay;
