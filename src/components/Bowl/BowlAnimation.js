import React, { useEffect, useState } from 'react';
import { Button, Container, Box, Paper } from '@mui/material';
import gsap from 'gsap';
import './BowlAnimation.css';
import words from "../../assets/words.json";
import DrawButton from '../DrawButton/DrawButton';
import WordDisplay from '../WordDisplay/WordDisplay';
import AcceptedWords from "../AcceptedWords/AcceptedWords"

const App = () => {
  const [word, setWord] = useState(null);
  const [acceptedWords, setAcceptedWords] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true); // State to control animation

  useEffect(() => {
    setupChits();
    let interval;
    if(isAnimating) {
      animateChits();
      interval = setInterval(animateChits, 1000); // Re-animate every 2 seconds
    }

    
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isAnimating]);

  const randomTransform = () => {
    const jar = document.getElementsByClassName("jar")[0]
    var rect = jar.getBoundingClientRect()
    

    const angle = Math.random() * 2 * Math.PI;
    const radius = 140; // Adjust for the jar size
    const x = radius * Math.cos(angle) + (rect.right - rect.left)/2;
    const y = radius * Math.sin(angle) + (rect.bottom - rect.top)/2;
    const rotation = Math.random() * 360;
    return { x, y, rotation };
  };

  const animateChits = () => {
    const chits = document.querySelectorAll('.chit');
    chits.forEach(chit => {
      const { x, y, rotation } = randomTransform();
      gsap.to(chit, {
        duration: 1,
        x,
        y,
        rotation,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });
  };

  const drawWord = () => {
    const availableWords = getSongWords().filter(w => !acceptedWords.includes(w));
    if (availableWords.length > 0) {
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      setWord(randomWord);
    } else {
      alert("No more words to draw.");
    }
  };

  const drawChit = () => {
    setIsAnimating(false);
    drawWord()
    const chosenChit = document.getElementById(word);
    
    gsap.to('.jar-container', { scale: 1.5, duration: 0.5 });

    gsap.to(chosenChit, {
      duration: 0.5,
      x: 0,
      y: 0,
      rotation: 0,
      backgroundColor: '#ff0'
    });
  };

  const acceptWord = () => {
    setAcceptedWords([...acceptedWords, word]);
    setIsAnimating(true);
    setWord(null);
    gsap.to('.jar-container', { scale: 1, duration: 0.5 });
  };

  const rerollWord = () => {
    drawWord();
  };

  const getSongWords = () => {
    return words; // Replace with actual logic
  };

  const setupChits = () => {
    const words = getSongWords();
    const jar = document.querySelector('.jar');
    jar.innerHTML = '';
    words.forEach((word, index) => {
      const chit = document.createElement('div');
      chit.className = 'chit';
      chit.id = word;
      jar.appendChild(chit);
    });
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Box className="jar-container" sx={{ position: 'relative', width: 300, height: 300, border: '5px solid #000', borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.5s' }}>
        <Box className="jar" sx={{ position: 'relative', width: '100%', height: '100%' }}>
          
        </Box>
      </Box>
      {!word && <DrawButton onClick={drawChit} />}
      {word && <WordDisplay word={word} onAccept={acceptWord} onReroll={rerollWord} />}
      <AcceptedWords words={acceptedWords} />
    </Container>
  );
};

export default App;
