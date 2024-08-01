import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const AcceptedWords = ({ words }) => {
  return (
    <Box sx={{ maxHeight: 200, overflowY: 'auto', mt: 2, position: 'absolute', top: 20, right: 20 }}>
      <List>
        {words.map((word, index) => (
          <ListItem key={index}>
            <CheckIcon sx={{ marginRight: 1 }} />
            <ListItemText primary={word} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AcceptedWords;
