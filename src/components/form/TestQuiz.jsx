import { useState } from 'react';

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState('');

    const questionSet = questions[currentQuestion].questions;

    const { id, question, options, correctAnswer } = questionSet[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if (answer === correctAnswer) {
            setAnswer(true)
            console.log(answer)
        } else {
            setAnswer(false)
            console.log(`not correct`)
        }
    };

    return <div>
        {currentQuestion + 1} / {questionSet.length}
        <br />
        <br />
        <h2>{id}.</h2> <h3>{question}</h3>
        <ul>
            {
                options.map((answer, index) => (
                    <li
                        onClick={() => onAnswerClick(answer, index)}
                        key={answer}>
                        {answer}
                        </li>
                    ))
            }
        </ul>

    </div>
};

export default Quiz;