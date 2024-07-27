import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Alert } from '@mui/material';

function RandomWordDisplay({ words, allowRepeats }) {
  const [currentWord, setCurrentWord] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleDrawWord = () => {
    console.log("Inside Main Page", words, allowRepeats )
    const wordList = [...words]
    let randomIndex;

    if (allowRepeats) {
      randomIndex = Math.floor(Math.random() * wordList.length);
    } else {
      const availableWords = wordList.filter(word => !usedWords.includes(word));
      if (availableWords.length === 0) {
        setShowAlert(true); // Show the alert instead of console.warn
        return;
      }
      randomIndex = Math.floor(Math.random() * availableWords.length);
      randomIndex = wordList.indexOf(availableWords[randomIndex]);
    }

    const newWord = wordList[randomIndex];
    setCurrentWord(newWord);

    if (!allowRepeats) {
      setUsedWords([...usedWords, newWord]);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">
        Your Random Word:
      </Typography>
      <Typography variant="h2" align="center">
        {currentWord}
      </Typography>
      <Button variant="contained" fullWidth onClick={handleDrawWord}>
        Draw Another Word
      </Button>
      {showAlert && (
        <Alert severity="warning">All words have been used.</Alert>
      )}
    </Container>
  );
}

export default RandomWordDisplay;
