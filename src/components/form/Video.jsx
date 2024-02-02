import { VolumeDown, VolumeUp } from "@mui/icons-material";
import { Box, Slider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoPage = ({ videoUrl, onEnded, onPlay, setVideoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  // const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.5);

  const handlePlay = () => {
    setVideoUrl(videoUrl);
    setIsPlaying(true);
    onPlay();
  };

  // const handlePlaybackRateChange = (e) => {
  //   setPlaybackRate(parseFloat(e.target.value));
  // };

  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue);
  };

  return (
    <div>
      {/* <h1>Video</h1> */}
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <ReactPlayer
          url={videoUrl}
          playing={isPlaying}
          onEnded={onEnded}
          onPlay={handlePlay}
          // playbackRate={playbackRate}
          volume={volume}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          controls={true}
          light={
            "https://adaptalux.com/wp-content/uploads/2020/01/Black-background-photography-example.jpg"
          }
        />
      </div>
      <Box
        sx={{ marginTop: "10px" }}
      >
        {/* <Select
          value={playbackRate}
          onChange={handlePlaybackRateChange}
          label="Speed"
        >
          <MenuItem value={0.5}>0.5x</MenuItem>
          <MenuItem value={1}>1x</MenuItem>
          <MenuItem value={1.5}>1.5x</MenuItem>
          <MenuItem value={2}>2x</MenuItem>
        </Select> */}
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.1}
          aria-label="Volume"
        />
        <VolumeUp />
        </Stack>
      </Box>
    </div>
  );
};

export default VideoPage;
