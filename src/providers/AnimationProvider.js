import React, { createContext, useState, useContext } from 'react';

const AnimationContext = createContext();

export const useAnimationContext = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }) => {
  const [isVignetteActive, setIsVignetteActive] = useState(false);
  const [isFlowerCenter, setIsFlowerCenter] = useState(false);
  const [isDrawAnimationActive, setIsDrawAnimationActive] = useState(false);
  const [randomWord, setRandomWord] = useState('');

  const triggerDrawButton = (word) => {
    setIsVignetteActive(true);
    setRandomWord(word)
    console.log("Came into this function", word)
    setTimeout(() => {
      setIsFlowerCenter(true);
    }, 2000); // Duration of vignette animation
  };

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
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
