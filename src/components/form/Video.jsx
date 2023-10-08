import React from 'react'
import Button from '../button/Button'
import { useRef } from 'react'
import { useState } from 'react';
import Iframe from 'react-iframe';

export default function VideoPage({ onNext }) {
    const videoRef = useRef(null);
    const [videoFinished, setVideoFinished] = useState(false);

    const handleVideoFinish = () => {
        setVideoFinished(true);
    };

    const handleIframeEnd = () => {
        if (videoFinished){
            onNext();
        }
    };

  return (
    <div>
        <h1>Video</h1>
        <Iframe
            url="https://www.youtube.com/embed/7sDY4m8KNLc?autoplay=1"
            ref={videoRef}
            onEnd={handleIframeEnd}
            width="100%"
            height="360"
            padding="20px"
            frameBorder="0"
        allowFullScreen
        title="Video"
        />
        {/* <Button
            label="Next"
            onClick={onNext}
            disabled={!videoFinished}
        /> */}
        <button onClick={onNext}>Next</button>
    </div>
  )
}
