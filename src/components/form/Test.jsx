import React from 'react'
import TestQuiz from './TestQuiz.jsx'
import VideoData from './VideoData.js'

const Test = () => {
  return (
    <div>
        <TestQuiz questions={VideoData} />
    </div>
  )
}

export default Test