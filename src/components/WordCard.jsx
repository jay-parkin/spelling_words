import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiBook } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";

/**
 * header
 * definition icon - component
 *
 * body
 * word - larger text
 * definition - normal text
 * user field - attempt
 * button1 - next
 */

export default function WordCard(props) {
  const { word, definition, onNextWord, onAttempt } = props;

  // Local state to manage input field disabled state
  const [inputValue, setInputValue] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [attempted, setAttempted] = useState(false); // New state for tracking if attempted

  // Create a ref to the input field
  const inputRef = useRef(null);

  // Effect to focus input field when it is enabled
  useEffect(() => {
    if (!inputDisabled && inputRef.current) {
      inputRef.current.focus(); // Focus the input field when enabled
    }
  }, [inputDisabled]);

  // Function to handle the "Attempt" button click
  const handleAttemptClick = () => {
    setInputDisabled(false); // Enable the input field
    setAttempted(true); // Set attempted to true to mask the word and definition

    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input field value
  };

  // Function to handle the "Next Word" button click
  const handleNextWordClick = () => {
    const isCorrect = inputValue.trim().toLowerCase() === word.toLowerCase();
    onAttempt(word, inputValue.trim(), isCorrect); // Notify parent component
    
    setInputValue(""); // Clear the input field
    setInputDisabled(true); // Disable the input field
    setAttempted(false); // Reset attempted state for next word
    onNextWord(); // Call the onNextWord callback to move to the next word
  };

  // Function to handle key down events
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior of the Enter key

      if (inputValue.trim() === "") {
        handleAttemptClick(); // Trigger the "Attempt" button action
      } else {
        handleNextWordClick(); // Trigger the "Next Word" button action
      }
    }
  };

  // Helper function to mask text with asterisks
  const maskText = (text) => "*".repeat(text.length);

  return (
    <div className="card-container">
      <Card bg="light" border="primary" style={{ width: "18rem" }}>
        <Card.Title className="card-header">
          <BiBook size={40} color="white" />
          <BiChevronLeft size={20} color="white" />
        </Card.Title>
        <Card.Body>
          <Card.Text>
            <h1>{attempted ? maskText(word) : word}</h1>
            {/* Spelling word to attempt */}
            {/* Mask or show word */}
            <p>{attempted ? maskText(definition) : definition}</p>
            {/* Mask or show definition */}
          </Card.Text>
          <InputGroup className="mb-3">
            <Button
              variant="outline-secondary"
              id="button-addon1"
              onClick={handleAttemptClick}
              onKeyDown={handleKeyDown} // Handle key down events
            >
              attempt
            </Button>
            <Form.Control
              type="text" // Use type "text" to try and influence behavior
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              disabled={inputDisabled} // Bind disabled state to the input field
              value={inputValue} // Bind value to the input field
              onChange={handleInputChange} // Handle input changes
              onKeyDown={handleKeyDown} // Handle key down events
              ref={inputRef} // Attach the ref to the input field
              autoComplete="off"
              autoCorrect="off" // Disable auto-correct
              autoCapitalize="none" // Disable auto-capitalization
              spellCheck="false" // Disable spell check
              // inputMode="none" // Suggests no input mode for the field TURNS OFF KEYBOARD
              pattern=".*" // Matches anything, effectively no restriction
              placeholder="" // Adding a placeholder might also help
            />
          </InputGroup>

          <Button
            variant="primary"
            onClick={handleNextWordClick}
            disabled={inputValue.trim() === ""}
          >
            Next Word
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
