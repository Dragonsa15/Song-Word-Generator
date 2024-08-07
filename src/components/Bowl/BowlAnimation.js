import React, { useEffect, useState, useRef } from 'react';
import { Container } from '@mui/material';
import gsap, { random } from 'gsap';
import wordsData from "../../assets/wordsData.json";
import DrawButton from '../DrawButton/DrawButton';
import WordDisplay from '../WordDisplay/WordDisplay';
import AcceptedWords from "../AcceptedWords/AcceptedWords";
import FlowerDisplay from '../FlowerDisplay/FlowerDisplay';
import VignetteEffect from './Vignette';
import { useAnimationContext } from '../../providers/AnimationProvider';

const BowlAnimation = () => {
  const [acceptedWords, setAcceptedWords] = useState([]);
  const { isVignetteActive, randomWord, triggerDrawButton, AcceptWordButton, ResetStateButton } = useAnimationContext();
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
      triggerDrawButton(randomWord['word'],randomWord['link']);
    } else {
      alert("No more words to draw.");
    }
  };

  const acceptWord = () => {
    setAcceptedWords([...acceptedWords, randomWord]);
    AcceptWordButton();
  };

  const rerollWord = () => {
    ResetStateButton()
  };

  const getSongWords = () => {
    let songWords = []
    wordsData.forEach((wordData) => {
      songWords.push(
        {
          'word' : wordData['hindi'] + " (" + wordData['english'] + ")",
          'link': wordData['sound']
        })
    })
    return songWords; // Replace with actual logic
  };

  const setupChits = () => {
    // Setup chits here
  };

  return (
    <>
      <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <FlowerDisplay ref={flowerRef}/>
        {!randomWord && <DrawButton onClick={drawWord} />}
        {randomWord && <WordDisplay word={randomWord} onAccept={acceptWord} onReroll={rerollWord} />}
        <AcceptedWords words={acceptedWords} />
      </Container>
      <VignetteEffect targetRef={flowerRef} isActive={isVignetteActive} />
    </>
  );
};

export default BowlAnimation;
