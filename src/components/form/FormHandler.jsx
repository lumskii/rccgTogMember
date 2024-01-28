import React, { useState } from "react";
import VideoPage from "./Video";
import Questions from "./Questions";
import Certificate from "./Certificate";
import VideoData from "./VideoData";
import MuiButton from "../button/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { user } from "../header";

const FormHandler = ({ firstName, lastName }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [congratulationsOpen, setCongratulationsOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [attempt, setAttempt] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const correctAnswers = VideoData[Math.floor(currentPage / 2)]?.questions.map(
    (question) => question.correctAnswer
  );

  // Modify the onAttempt callback to check if all questions have been answered
  const handleAttempt = (attempts) => {
    setAttempt(attempts);
    const allAnswered = attempts.every((attempt) => attempt !== null);
    setAllQuestionsAnswered(allAnswered);
  };

  const idxStyle = {
    fontSize: "1em",
    fontWeight: "bold",
    color: "#1976d2",
    marginLeft: "10px",
  };

  const handleVideoFinish = () => {
    setIsVideoPlaying(false);

    if (currentPage < VideoData.length * 2 - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // If all videos and questions are completed, show congratulations dialog
      setCongratulationsOpen(true);
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleCongratulationsClose = () => {
    setCongratulationsOpen(false);

    if (
      incorrectAnswers.length === 0 &&
      currentPage % 2 === 1 &&
      currentPage < VideoData.length * 2 - 1
    ) {
      // After clicking "OK" in the dialog, move to the Certificate page
      setCurrentPage(VideoData.length * 2);
    } else {
      // For other pages, move to the next page
      setCurrentPage((prevPage) => prevPage + 1);
    }

    // Reset incorrect answers and attempt
    setIncorrectAnswers([]);
    setAttempt(null);
  };

  const PageDisplay = () => {
    if (currentPage % 2 === 0 && currentPage < VideoData.length * 2) {
      // Display VideoPage for even pages
      return (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Video</h1>
            <span
              style={{
                fontSize: "2em",
                fontWeight: "bold",
                color: "#1976d2",
                marginLeft: "10px",
              }}
            >
              {currentPage / 2 + 1}
            </span>
            /
            <span style={{ fontSize: "2em", fontWeight: "bold" }}>
              {VideoData.length}
            </span>
          </div>
          <VideoPage
            videoUrl={VideoData[currentPage / 2]?.videoUrl}
            onEnded={handleVideoFinish}
            onPlay={handleVideoPlay}
          />
        </div>
      );
    } else if (currentPage % 2 === 1 && currentPage < VideoData.length * 2) {
      // Display Questions for odd pages
      return (
        <div>
          <div style={{ display: "grid" }}>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              Questions
              <span style={idxStyle}>{Math.ceil(currentPage / 2)}</span>/
              <span style={{ fontSize: "1em", fontWeight: "bold" }}>
                {VideoData.length}
              </span>
            </h1>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "15px",
              }}
            >
              Answer all the questions
            </p>
          </div>
          <Questions
            questions={VideoData[Math.floor(currentPage / 2)]?.questions}
            numQuestions={3}
            onAttempt={handleAttempt}
            correctAnswer={correctAnswers}
            setIsSubmitClicked={setIsSubmitClicked}
          />
        </div>
      );
    } else if (currentPage === VideoData.length * 2) {
      return <Certificate firstName={user.name} lastName={lastName} />;
    } else {
      return null;
    }
  };

  return (
    <div>
      {PageDisplay()}
      {currentPage !== VideoData.length * 2 && ( // Conditionally render buttons
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <div>
            <MuiButton
              label="Back"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!currentPage}
            />
          </div>
          <div>
            <MuiButton
              label={currentPage === VideoData.length * 2 ? "Finish" : "Next"}
              onClick={
                currentPage === VideoData.length * 2 ? null : handleVideoFinish
              }
              disabled={
                isVideoPlaying ||
                currentPage % 2 === 0 ||
                !allQuestionsAnswered ||
                !isSubmitClicked
              }
            />
          </div>
        </div>
      )}
      {/* Congratulations Dialog */}
      <Dialog
        open={congratulationsOpen}
        onClose={handleCongratulationsClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {incorrectAnswers.length === 0
            ? `Congratulations!`
            : `Incorrect Answers`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {incorrectAnswers.length === 0
              ? "You have completed this program."
              : "Some answers are wrong. Please try again."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCongratulationsClose} label="OK" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormHandler;
