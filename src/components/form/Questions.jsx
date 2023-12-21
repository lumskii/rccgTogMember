import React, { useEffect, useState } from "react";

export default function Questions({ questions, numQuestions, onAttempt }) {
  const [selectedOptions, setSelectedOptions] = useState(
    Array(numQuestions).fill(undefined)
  );

  useEffect(() => {
    // Notify parent component that an option has been selected
    onAttempt(selectedOptions);
  }, [selectedOptions, onAttempt]);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };


  return (
    <div>
      <div style={{display: "grid"}}>
        <h1 style={{display: "flex", justifyContent: "center"}}>Questions</h1>
        <p style={{display: "flex", justifyContent: "center", margin: "15px"}}>Answer all the questions</p>
      </div>
      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <h3 style={{ margin: "20px 10px" }}>{question.question}</h3>
          <ul style={{ margin: "10px" }}>
            {question.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                style={{ listStyleType: "none", margin: "10px" }}
              >
                <input
                  type="radio"
                  id={`q${question.id}o${optionIndex}`}
                  name={`q${question.id}`}
                  checked={selectedOptions[questionIndex] === optionIndex}
                  onChange={() =>
                    handleOptionSelect(questionIndex, optionIndex)
                  }
                />
                <label htmlFor={`q${question.id}o${optionIndex}`}>
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
