import React, { useState } from 'react';
import Certificate from './Certificate';
import Questions from './Questions';
import VideoPage from './Video';
import { useParams } from 'react-router-dom';

const FormHandler = () => {
    const { firstName, lastName } = useParams();
    const [videoFinished, setVideoFinished] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleVideoFinish = () => {
        setVideoFinished(true);
        nextPage();
    };

    const handleAnswersChange = (newAnswers) => {
        setAnswers(newAnswers);
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

  return (
    <div>
      Testing
        {currentPage === 1 && (
            <VideoPage
                onVideoFinish={handleVideoFinish}
                disabled={!videoFinished}
                firstName={firstName}
                lastName={lastName}
            />
        )}

        {currentPage === 2 && (
            <Questions
                onAnswersChange={handleAnswersChange}
                onNext={nextPage}
            />
        )}

        {currentPage === 3 && (
            <Certificate
                firstName={firstName}
                lastName={lastName}
                answers={answers}
            />
        )}
    </div>
  )
}

export default FormHandler