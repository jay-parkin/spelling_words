import React, { useState, useEffect } from "react";
import WordCard from "./WordCard";
import wordSet from "../data/RawWordList";

const TOTAL_WORDS = 10; // Define the total number of words

function getRandomWords(wordSet, count = TOTAL_WORDS) {
  const words = Object.keys(wordSet);

  // Shuffle the words array
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  // Select the first 'count' words and map them to an array of objects
  return words.slice(0, count + 1).map((word) => ({
    word,
    definition: wordSet[word],
  }));
}

export default function WordList() {
  // Initialise state to hold the 10 random words
  const [randomWords, setRandomWords] = useState([]);
  // State to keep track of the current word index
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [attempts, setAttempts] = useState([]);

  // Populate the state with random words when the component mounts
  useEffect(() => {
    const selectedWords = getRandomWords(wordSet);
    setRandomWords(selectedWords);
    setCurrentWordIndex(0); // Ensure index starts from 0
  }, []);

  // Function to handle showing the next word
  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => {
      if (prevIndex < randomWords.length - 1) {
        return prevIndex + 1;
      } else {
        // Optional: Handle completion message or reset
        console.log("All words completed!");
        return prevIndex; // Return the same index to stay on the last word
      }
    });
  };

  const handleAttempt = (word, userInput, isCorrect) => {
    setAttempts((prevAttempts) => [
      ...prevAttempts,
      {
        word,
        userInput,
        isCorrect,
      },
    ]);
  };

  // Reset the state to start the app again
  const handleRestart = () => {
    const selectedWords = getRandomWords(wordSet);
    setRandomWords(selectedWords);
    setCurrentWordIndex(0);
    setAttempts([]);
  };

  // Calculate results
  const correctAttempts = attempts.filter(
    (attempt) => attempt.isCorrect
  ).length;

  // If all 10 words have been shown, display the completed message
  if (randomWords.length > 0 && currentWordIndex === randomWords.length - 1) {
    // Show the completed message only if the last word has been shown
    return (
      <div>
        <h2>Completed! You've seen all the words.</h2>
        <div>
          <h3>
            Results: {correctAttempts}/{TOTAL_WORDS}
          </h3>
          <ul>
            {attempts.map((attempt, index) => (
              <li key={index}>
                <strong>{attempt.word}</strong>:{" "}
                {attempt.isCorrect
                  ? "Correct"
                  : `Incorrect (Your answer: ${attempt.userInput}, Correct answer: ${attempt.word})`}
              </li>
            ))}
          </ul>
        </div>
        <button className="restart-button" onClick={handleRestart}>
          Restart
        </button>
      </div>
    );
  }

  return (
    <section>
      {/* Display the current word */}
      {randomWords.length > 0 && currentWordIndex < randomWords.length ? (
        <WordCard
          word={randomWords[currentWordIndex].word}
          definition={randomWords[currentWordIndex].definition}
          onNextWord={handleNextWord} // Pass the callback to WordCard
          onAttempt={handleAttempt} // Pass the attempt handler to WordCard
        />
      ) : (
        <p>All words completed!</p>
      )}
    </section>
  );
}
