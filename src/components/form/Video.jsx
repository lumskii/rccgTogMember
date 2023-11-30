import React from 'react';
import ReactPlayer from 'react-player';

const VideoPage = ({ videoUrl, onVideoFinish, videoFinished, onNext }) => {
  const handleVideoEnd = () => {
    if (videoFinished) {
      onVideoFinish();
    } else {
      onNext();
    }
  };

  return (
    <div>
      <h1>Video</h1>
      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
        <ReactPlayer
          url={videoUrl}
          playing={false}
          onEnded={handleVideoEnd}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          controls={true}
        />
      </div>
    </div>
  );
};

export default VideoPage;
