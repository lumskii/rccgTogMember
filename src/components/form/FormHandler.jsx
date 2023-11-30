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
import jsonData from "./MemberQuiz.json";
import { useEffect } from "react";

const FormHandler = ({ firstName, lastName }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [congratulationsOpen, setCongratulationsOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(jsonData)));
  }, []);

  const handleVideoFinish = () => {
    setIsVideoPlaying(false);

    if (currentPage < VideoData.length * 2 - 1) {
      setCurrentPage(currentPage + 1);
      console.log(data);
    } else {
      // If all videos and questions are completed, show congratulations dialog
      setCongratulationsOpen(true);
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleQuestionSubmit = () => {
    if (currentPage < VideoData.length * 2 - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // If all videos and questions are completed, show congratulations dialog
      setCongratulationsOpen(true);
    }
  };

  const handleCongratulationsClose = () => {
    setCongratulationsOpen(false);
    // After clicking "OK" in the dialog, move to the Certificate page
    setCurrentPage(VideoData.length * 2);
  };

  const PageDisplay = () => {
    if (currentPage % 2 === 0 && currentPage < VideoData.length * 2) {
      // Display VideoPage for even pages
      return (
        <VideoPage
          videoUrl={VideoData[currentPage / 2]?.videoUrl}
          onEnded={handleVideoFinish}
          onPlay={handleVideoPlay}
        />
      );
    } else if (currentPage % 2 === 1 && currentPage < VideoData.length * 2) {
      // Display Questions for odd pages
      return (
        <div>
          <Questions
            questions={VideoData[Math.floor(currentPage / 2)]?.questions}
            numQuestions={2}
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
              disabled={isVideoPlaying}
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
        <DialogTitle id="alert-dialog-title">Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have completed this program.
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
