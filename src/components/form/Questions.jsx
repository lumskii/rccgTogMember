import React, { useEffect, useState } from "react";

export default function Questions({ questions, numQuestions, onAttempt }) {
  const [selectedOptions, setSelectedOptions] = useState(
    Array(numQuestions).fill(null)
  );
  const [incorrectAnswers, setIncorrectAnswers] = useState(
    Array(numQuestions).fill(false)
  );
  const [questionAnswered, setQuestionAnswered] = useState(
    Array(numQuestions).fill(false)
  );

  useEffect(() => {
    // Notify parent component that an option has been selected
    onAttempt(selectedOptions);
  }, [selectedOptions, questionAnswered, onAttempt]);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);

    // Mark the question as answered
    setQuestionAnswered((prev) => {
      const newQuestionAnswered = [...prev];
      newQuestionAnswered[questionIndex] = true;
      return newQuestionAnswered;
    });
  };

  return (
    <div>
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
            {selectedOptions[questionIndex] !== null && (
              <p
                style={{
                  color: incorrectAnswers[questionIndex] ? "red" : "green",
                  margin: "10px",
                }}
              >
                {incorrectAnswers[questionIndex]
                  ? "Incorrect!"
                  : "Correct!"}
              </p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}