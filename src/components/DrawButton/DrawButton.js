import React from 'react';
import { Button } from '@mui/material';

const DrawButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{ position: 'absolute', bottom: 20 }}
    >
      Draw Word
    </Button>
  );
};

export default DrawButton;
