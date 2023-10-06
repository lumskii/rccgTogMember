import React, { useState } from 'react';
// import Certificate from './Certificate';
import Questions from './Questions';
import Video from './Video';

const FormHandler = () => {
    const [videoFinished, setVideoFinished] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleVideoFinish = () => {
        setVideoFinished(true);
    };

    const handleAnswersChange = (newAnswers) => {
        setAnswers(newAnswers);
    };

    const handleNameChange = (first, last) => {
        setFirstName(first);
        setLastName(last);
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

  return (
    <div>
        {currentPage === 1 && (
            <Video
                onVideoFinish={handleVideoFinish}
                disabled={!videoFinished}
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