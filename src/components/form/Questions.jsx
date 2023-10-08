import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import questionsData from "./QuestionsData";

export default function Questions({ onNext }) {
  const [answers, setAnswers] = useState(Array(questionsData.length).fill(""));
  const [allAnswered, setAllAnswered] = useState(false);

  useEffect(() => {
    setAllAnswered(answers.every((answer) => answer !== ""));
  }, [answers]);

  const handleAnswerChange = (id, value) => {
    const index = questionsData.findIndex((question) => question.id === id);
    if (index !== -1) {
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
    }
  };

  return (
    <div>
      <h1>Questions</h1>
      <p>Answer all the questions</p>
      <ol>
        {questionsData.map((questionObj) => (
          <li key={questionObj.id}>
            <p>{questionObj.question}</p>
            <ul>
                {questionObj.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                        <label>
                            <input
                                type='radio'
                                value={option}
                                checked={answers[questionObj.id - 1] === option}
                                onChange={(e) => handleAnswerChange(questionObj.id, e.target.value)}
                            />
                            {option}
                        </label>
                    </li>
                    ))}
            </ul>
          </li>
        ))}
      </ol>
      <Button label="Submit" onClick={onNext} disabled={!allAnswered} />
    </div>
  );
}
