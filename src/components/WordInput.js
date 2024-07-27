import React, { useState } from 'react';
import { Container, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

function WordInput(props) {
  const [words, setWords] = useState('');
  const [allowRepeats, setAllowRepeats] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(words, props)
    props.onWordListSubmit({ words, allowRepeats });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter words (comma-separated)"
          fullWidth
          value={words}
          onChange={(e) => setWords(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={allowRepeats} onChange={(e) => setAllowRepeats(e.target.checked)} />}
          label="Allow Repeated Words"
        />
        <Button variant="contained" type="submit">
          Start Drawing
        </Button>
      </form>
    </Container>
  );
}

export default WordInput;
