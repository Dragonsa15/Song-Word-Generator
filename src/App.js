// // src/App.js
// import React, { useState, useEffect } from 'react';
// import { Box, Button, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import initialWords from "./assets/words.json"
// import './App.css';

// const App = () => {
//   const [words, setWords] = useState([]);
//   const [completedWords, setCompletedWords] = useState([]);
//   const [currentWord, setCurrentWord] = useState('');

//   useEffect(() => {
//     setWords(initialWords)
//   }, [initialWords]);

//   const drawWord = () => {
//     console.log(words)
//     if (words.length === 0) return;
//     const randomIndex = Math.floor(Math.random() * words.length);
//     const word = words[randomIndex];
//     setWords(words.filter((_, index) => index !== randomIndex));
//     setCompletedWords([...completedWords, word]);
//     setCurrentWord(word);
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
//       <Box position="absolute" top={10} left={10} width="200px" height="150px" overflow="auto">
//         <List>
//           {completedWords.map((word, index) => (
//             <ListItem key={index}>
//               <ListItemText primary={word} />
//               <ListItemIcon>
//                 <CheckCircleIcon color="success" />
//               </ListItemIcon>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//       <Card style={{ padding: '20px', textAlign: 'center', position: 'relative', width: '300px', height: '300px' }}>
//         <CardContent>
//           <Typography variant="h4">
//             {currentWord}
//           </Typography>
//         </CardContent>
//         <Button variant="contained" color="primary" onClick={drawWord}>
//           Draw Word
//         </Button>
//       </Card>
//     </Box>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import BowlAnimation from './components/Bowl/BowlAnimation';
import DrawButton from './components/DrawButton/DrawButton';
import WordDisplay from './components/WordDisplay/WordDisplay';
import AcceptedWords from './components/AcceptedWords/AcceptedWords';

const wordsList = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];

function App() {
  const [word, setWord] = useState(null);
  const [acceptedWords, setAcceptedWords] = useState([]);

  const drawWord = () => {
    const availableWords = wordsList.filter(w => !acceptedWords.includes(w));
    if (availableWords.length > 0) {
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      setWord(randomWord);
    } else {
      alert("No more words to draw.");
    }
  };

  const acceptWord = () => {
    setAcceptedWords([...acceptedWords, word]);
    setWord(null);
  };

  const rerollWord = () => {
    drawWord();
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <BowlAnimation />
        {!word && <DrawButton onClick={drawWord} />}
        {word && <WordDisplay word={word} onAccept={acceptWord} onReroll={rerollWord} />}
        <AcceptedWords words={acceptedWords} />
      </Box>
    </Container>
  );
}

export default App;
