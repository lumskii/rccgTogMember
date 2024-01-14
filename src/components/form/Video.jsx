import React from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPage = ({ videoUrl, onEnded, onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay();
  };

  return (
    <div>
      {/* <h1>Video</h1> */}
      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
        <ReactPlayer
          url={videoUrl}
          playing={isPlaying}
          onEnded={onEnded}
          onPlay={handlePlay}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          controls={true}
          light={"https://adaptalux.com/wp-content/uploads/2020/01/Black-background-photography-example.jpg"}
        />
      </div>
    </div>
  );
};

export default VideoPage;
