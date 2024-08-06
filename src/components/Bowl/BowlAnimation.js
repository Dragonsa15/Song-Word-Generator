import React, { useEffect, useState, useRef } from 'react';
import { Container } from '@mui/material';
import gsap from 'gsap';
import words from "../../assets/words.json";
import DrawButton from '../DrawButton/DrawButton';
import WordDisplay from '../WordDisplay/WordDisplay';
import AcceptedWords from "../AcceptedWords/AcceptedWords";
import FlowerDisplay from '../FlowerDisplay/FlowerDisplay';
import VignetteEffect from './Vignette';
import { useAnimationContext } from '../../providers/AnimationProvider';

const BowlAnimation = () => {
  const [word, setWord] = useState(null);
  const [acceptedWords, setAcceptedWords] = useState([]);
  const { isVignetteActive, randomWord, triggerDrawButton } = useAnimationContext();
  const flowerRef = useRef(null);

  useEffect(() => {
    setupChits();
  }, [acceptedWords]);

  useEffect(() => {
    if (isVignetteActive) {
      // Trigger vignette effect animation
      console.log('Vignette effect activated.');
      // Display random word
      console.log('Random Word:', randomWord);

      console.log(flowerRef.current)
    }
  }, [isVignetteActive]);

  const drawWord = () => {
    console.log("this function was called")
    const availableWords = getSongWords().filter(w => !acceptedWords.includes(w));
    if (availableWords.length > 0) {
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      triggerDrawButton(randomWord);
    } else {
      alert("No more words to draw.");
    }
  };

  const acceptWord = () => {
    setAcceptedWords([...acceptedWords, word]);
    setWord(null);
    gsap.to('.jar-container', { scale: 1, duration: 0.5 });
  };

  const rerollWord = () => {
    if (word) {
      // Reroll logic here
    }
  };

  const getSongWords = () => {
    return words; // Replace with actual logic
  };

  const setupChits = () => {
    // Setup chits here
  };

  return (
    <>
      <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <FlowerDisplay ref={flowerRef}/>
        {!word && <DrawButton onClick={drawWord} />}
        {word && <WordDisplay word={word} onAccept={acceptWord} onReroll={rerollWord} />}
        <AcceptedWords words={acceptedWords} />
      </Container>
      <VignetteEffect targetRef={flowerRef} isActive={isVignetteActive} />
    </>
  );
};

export default BowlAnimation;
