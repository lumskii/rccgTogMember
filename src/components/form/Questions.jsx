import React, { useEffect, useState } from 'react'
import Button from '../button/Button';

export default function Questions({ onAnswersChange, onNext }) {
    const [answers, setAnswers] = useState(Array(5).fill(''));
    const [allAnswered, setAllAnswered] = useState(false);

    useEffect(() => {
        setAllAnswered(answers.every((answer) => answer !== ''));
    }, [answers]);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        onAnswersChange(newAnswers);
    };

  return (
    <div>
        <h1>Questions</h1>
        <p>Answer all the questions</p>
        <ol>
            {answers.map((answer, index) => (
                <li key={index}>
                    <label>
                        Question {index + 1}:
                        <input
                            type='text'
                            value={answer}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                    </label>
                </li>
                ))}
        </ol>
        <Button
            label="Submit"
            onClick={onNext}
            disabled={!allAnswered}
        />
    </div>
  )
}
