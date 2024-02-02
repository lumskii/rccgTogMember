import React, { useCallback, useEffect, useState } from "react";
import "./Styles.scss";
import MuiButton from "../button/Button";
import { resultInitialState } from "./VideoData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function Questions({
  questions,
  numQuestions,
  onAttempt,
  correctAnswer,
  setIsSubmitClicked,
  setTotalScore
}) {
  // const [firstAns, secondAns, thirdAns] = correctAnswer;
  const [showResult, setShowResult] = useState(false);
  const [ansIdx, setAnsIdx] = useState(Array(questions.length).fill(null));
  const [ans, setAns] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(numQuestions).fill(null)
  );
  const [questionAnswered, setQuestionAnswered] = useState(
    Array(numQuestions).fill(false)
  );
  const [result, setResult] = useState(resultInitialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[questionIndex] = optionIndex;
      return newOptions;
    });

    // Mark the question as answered
    setQuestionAnswered((prev) => {
      const newQuestionAnswered = [...prev];
      newQuestionAnswered[questionIndex] = true;
      return newQuestionAnswered;
    });
  };

  const onAnswerClick = useCallback(
    (questionIndex, optionIndex) => {
      const selectedOption = questions[questionIndex].options[optionIndex];

      // Update the ansIdx for the current question
      setAnsIdx((prevAnsIdx) => {
        const newAnsIdx = [...prevAnsIdx];
        newAnsIdx[questionIndex] = optionIndex;
        return newAnsIdx;
      });

      if (selectedOption === correctAnswer[questionIndex]) {
        setAns(true);
        console.log("Correct!");
      } else {
        setAns(false);
        console.log("Incorrect.");
      }
    },
    [questions, correctAnswer]
  );

  useEffect(() => {
    // Notify parent component that an option has been selected
    onAttempt(selectedOptions);

    // Check the answer for each question
    selectedOptions.forEach((optionIndex, questionIndex) => {
      if (optionIndex !== null && questionAnswered[questionIndex]) {
        onAnswerClick(questionIndex, optionIndex);
      }
    });
  }, [selectedOptions, questionAnswered, onAttempt, onAnswerClick]);

  const handleQuestionSubmit = () => {
    // Check if all questions are attempted
    const areAllAttempted = selectedOptions.every((option) => option !== null);

    if (!areAllAttempted) {
      alert("Please attempt all questions before submitting.");
      return;
    }

    // Initialize a new result
    let newResult = {
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    };

    // Iterate over all selected options
    selectedOptions.forEach((optionIndex, questionIndex) => {
      const selectedOption = questions[questionIndex].options[optionIndex];

      // Update the result based on whether the selected option is correct
      if (selectedOption === correctAnswer[questionIndex]) {
        newResult.score += 1;
        newResult.correctAnswers += 1;
        setTotalScore(prevScore => prevScore + 1); // Update the total score
      } else {
        newResult.wrongAnswers += 1;
      }
    });

    // Update the result state
    setResult(newResult);
    setShowResult(true);
    setIsSubmitClicked(true);
    setIsSubmitted(true);
  };

  return (
    <>
      {!showResult ? (
        <div>
          {questions.map((question, questionIndex) => (
            <div key={question.id}>
              <h3 style={{ margin: "20px 10px" }}>{question.question}</h3>
              <ul className="question-container">
                {question.options.map((option, optionIndex) => (
                  <li
                    key={optionIndex}
                    onClick={() =>
                      handleOptionSelect(questionIndex, optionIndex)
                    }
                    className={
                      ansIdx[questionIndex] === optionIndex
                        ? "selected-answer"
                        : "null"
                    }
                  >
                    <label htmlFor={`q${question.id}o${optionIndex}`}>
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <MuiButton label="Submit" onClick={handleQuestionSubmit} disabled={isSubmitted} />
          </div>
        </div>
      ) : (
        <div>
          <Dialog
            open={showResult}
            onClose={() => setShowResult(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {"Results"}
              </span>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6" align="center" gutterBottom>
                {"Score"}
              </Typography>
              <Typography variant="body1">
                Total score: <strong>{result.score}</strong>
              </Typography>
              <Typography variant="body1">
                Correct Answers: <strong>{result.correctAnswers}</strong>
              </Typography>
              <Typography variant="body1">
                Wrong Answers: <strong>{result.wrongAnswers}</strong>
              </Typography>
            </DialogContent>
            <DialogActions>
              <MuiButton label="OK" onClick={() => setShowResult(false)} />
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
