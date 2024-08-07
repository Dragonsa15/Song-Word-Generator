import React, { createContext, useState, useContext } from 'react';

const AnimationContext = createContext();

export const useAnimationContext = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }) => {
  const [isVignetteActive, setIsVignetteActive] = useState(false);
  const [isFlowerCenter, setIsFlowerCenter] = useState(false);
  const [isDrawAnimationActive, setIsDrawAnimationActive] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const [audioLink, setAudioLink] = useState('');

  const triggerDrawButton = (word,link) => {
    setIsVignetteActive(true);
    setRandomWord(word)
    setAudioLink(link)
    console.log("Came into this function", word)
    setTimeout(() => {
      setIsFlowerCenter(true);
    }, 500); // Duration of vignette animation
  };

  const detriggerDrawAnimation = () => {
    setIsDrawAnimationActive(false);
  }

  const AcceptWordButton = (word) => {
    detriggerDrawAnimation();
    setIsFlowerCenter(false);
    setIsVignetteActive(false);
    setRandomWord('')
    setAudioLink('')
  }

  const ResetStateButton = () => {
    detriggerDrawAnimation();
    setIsFlowerCenter(false);
    setIsVignetteActive(false);
    setRandomWord('')
    setAudioLink('')
  }
  const triggerDrawAnimation = () => {
    setIsDrawAnimationActive(true);
  };

  return (
    <AnimationContext.Provider
      value={{
        isVignetteActive,
        isFlowerCenter,
        isDrawAnimationActive,
        randomWord,
        setRandomWord,
        triggerDrawButton,
        triggerDrawAnimation,
        AcceptWordButton,
        ResetStateButton,
        audioLink,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
