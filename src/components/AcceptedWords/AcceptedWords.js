import React from 'react';
import { Box } from '@mui/material';

const AcceptedWords = ({ words }) => {
  return (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black', // Or any other color you prefer
      color: 'white',
      padding: '10px',
      maxWidth: '100%', // Ensures it doesn't extend beyond the viewport
      overflow: 'hidden', // Prevents extending past max width
      textOverflow: 'ellipsis', // Adds an ellipsis if the text is too long
      whiteSpace: 'nowrap' // Keeps the text in a single line
    }}>
      {words.map((word, index) => (
        <Box key={index} sx={{ margin: '0 10px' }}>
          {word}
        </Box>
      ))}
    </Box>
  );
};

export default AcceptedWords;
