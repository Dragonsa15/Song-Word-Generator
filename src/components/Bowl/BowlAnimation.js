import React from 'react';
import { Box } from '@mui/material';
import './BowlAnimation.css';

const BowlAnimation = () => {
  return (
    <Box className="bowl">
      <div className="chit" id="chit1"></div>
      <div className="chit" id="chit2"></div>
      <div className="chit" id="chit3"></div>
      <div className="chit" id="chit4"></div>
      <div className="chit" id="chit1"></div>
      <div className="chit" id="chit2"></div>
      <div className="chit" id="chit3"></div>
      <div className="chit" id="chit4"></div>
    </Box>
  );
};

export default BowlAnimation;
