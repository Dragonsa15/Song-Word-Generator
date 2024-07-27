import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const AcceptedWords = ({ words }) => {
  return (
    <Box sx={{ maxHeight: 200, overflowY: 'auto', mt: 2 }}>
      <List>
        {words.map((word, index) => (
          <ListItem key={index}>
            <ListItemText primary={word} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AcceptedWords;
