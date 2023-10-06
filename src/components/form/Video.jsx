import React from 'react'
import Button from '../button/Button'

export default function Video({ onVideoFinish, disabled }) {
  return (
    <div>
        <h1>Video</h1>
        <Video
            onEnded={onVideoFinish}
            controls
            width="640"
            height="360"
        >
            <source
                src="https://www.youtube.com/watch?v=7sDY4m8KNLc"
                type="video/mp4"
            />
            {/* https://www.youtube.com/watch?v=Lz7BSm2HSVs&ab_channel=TOGPTraining */}
            Your browser does not support the video tag.
        </Video>
        <Button
            label="Next"
            onClick={onVideoFinish}
            disabled={disabled}
        />
    </div>
  )
}
