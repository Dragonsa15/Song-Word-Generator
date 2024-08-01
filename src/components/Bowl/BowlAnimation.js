import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import gsap from 'gsap';
import './BowlAnimation.css';
import words from "../../assets/words.json";
import DrawButton from '../DrawButton/DrawButton';
import WordDisplay from '../WordDisplay/WordDisplay';
import AcceptedWords from "../AcceptedWords/AcceptedWords";

const BowlAnimation = () => {
  const [word, setWord] = useState(null);
  const [acceptedWords, setAcceptedWords] = useState([]);
  const [isAnimatingOthers, setIsAnimatingOthers] = useState(true); // State for other chits' animation

  useEffect(() => {
    setupChits();
  }, [acceptedWords]);

  useEffect(() => {
    let interval;
    if (isAnimatingOthers) {
      animateChits();
      interval = setInterval(animateChits, 1000); // Re-animate every 1 second
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isAnimatingOthers]);

  useEffect(() => {
    if (word) {
      const jar = document.getElementsByClassName("jar")[0];
      var rect = jar.getBoundingClientRect();
      const chit = document.getElementById(word);
      gsap.killTweensOf(chit);

      gsap.to(`#${word}`, {
        duration: 2,
        x: (rect.width / 2) - (chit.offsetWidth / 2),
        y: rect.height + (chit.offsetHeight * 4),
        rotationY: 360,
        rotate: 0,
        backgroundColor: '#ff0',
        scale: 7,
        onComplete: () => {
          gsap.set(chit, { paused: true }); // Pause at the end of the animation
          chit.innerHTML =  `<div class="chit-content">${word}</div>`; // Add a container for the text;
        }
      });

    }
  }, [word]);

  const randomTransform = () => {
    const jar = document.getElementsByClassName("jar")[0];
    var rect = jar.getBoundingClientRect();

    const angle = Math.random() * 2 * Math.PI;
    const radius = 140; // Adjust for the jar size
    const x = radius * Math.cos(angle) + (rect.width / 2);
    const y = radius * Math.sin(angle) + (rect.height / 2);
    const rotation = Math.random() * 360;
    return { x, y, rotation };
  };

  const animateChits = () => {
    const chits = document.querySelectorAll('.chit');
    chits.forEach(chit => {
      if (chit.id === word) return; // Skip the chosen chit

      const { x, y, rotation } = randomTransform();
      gsap.to(chit, {
        duration: 1,
        x,
        y,
        rotation,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  };

  const drawWord = () => {
    const availableWords = getSongWords().filter(w => !acceptedWords.includes(w));
    if (availableWords.length > 0) {
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      setWord(randomWord);
      setIsAnimatingOthers(false); // Stop other chits' animations
    } else {
      alert("No more words to draw.");
    }
  };

  const drawChit = () => {
    drawWord();
  };

  const acceptWord = () => {
    setAcceptedWords([...acceptedWords, word]);
    setIsAnimatingOthers(true); // Resume animations for other chits

    if (word) {
      const chosenChitElement = document.getElementById(word);
      chosenChitElement.remove();
    }

    setWord(null);
    gsap.to('.jar-container', { scale: 1, duration: 0.5 });
  };

  const reverseAnimation = (chit) => {
    const { x: new_start_x, y: new_start_y, rotation: start_rotation } = randomTransform(); // Get a random start position
    const { x: new_end_x, y: new_end_y, rotation: end_rotation } = randomTransform(); // Get a random end position
  
    console.log(new_start_x, new_start_y, start_rotation);
    console.log(new_end_x, new_end_y, end_rotation);
    
    gsap.to(chit, {
      duration: 1,
      x: new_start_x,
      y: new_start_y,
      rotation: start_rotation,
      scale: 1,
      backgroundColor: '',
      rotationY: 0,
      onComplete: () => {
        chit.innerHTML = ''; // Reset inner HTML if modified
        gsap.to(chit, {
          duration: 1,
          x: new_end_x,
          y: new_end_y,
          rotation: end_rotation,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
        
        drawChit();
      }
    });
  };

  const rerollWord = () => {
    if (word) {
      const chosenChitElement = document.getElementById(word);
      gsap.killTweensOf(chosenChitElement); // Stop the current animation

      reverseAnimation(chosenChitElement); // Reverse the animation for the chosen chit

      setIsAnimatingOthers(true); // Resume animations for other chits
    }
  };

  const getSongWords = () => {
    return words; // Replace with actual logic
  };

  const setupChits = () => {
    const availableWords = getSongWords().filter(w => !acceptedWords.includes(w));

    const jar = document.querySelector('.jar');
    jar.innerHTML = ''; // Clear existing chits
    availableWords.forEach((word) => {
      const chit = document.createElement('div');
      chit.className = 'chit';
      chit.id = word;
      chit.style.display = 'block';
      jar.appendChild(chit);
    });
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Box className="jar-container" sx={{ position: 'relative', width: 300, height: 300, border: '5px solid #000', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.5s' }}>
        <Box className="jar" sx={{ position: 'relative', width: '100%', height: '100%' }}>
        </Box>
      </Box>
      {!word && <DrawButton onClick={drawChit} />}
      {word && <WordDisplay word={word} onAccept={acceptWord} onReroll={rerollWord} />}
      <AcceptedWords words={acceptedWords} />
    </Container>
  );
};

export default BowlAnimation;
