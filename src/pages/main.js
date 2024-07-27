import React, { useState } from 'react';
import WordInput from '../components/WordInput';
import RandomWordDisplay from '../components/RandomWordDisplay';

function Main() {
  const [words, setWords] = useState([]);
  const [allowRepeats, setAllowRepeats] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  const handleWordListSubmit = (data) => {
    console.log(data)
    setWords(data.words.split(',').map(word => word.trim()));
    setAllowRepeats(data.allowRepeats);
    setCurrentPage('main');
  };

  return (
    <div>
      {currentPage === 'landing' ? (
        <WordInput onWordListSubmit={handleWordListSubmit} />
      ) : (
        <RandomWordDisplay words={words} allowRepeats={allowRepeats} />
      )}
    </div>
  );
}

export default Main;
