const Questions = ({ questions, numQuestions }) => {
  if (!questions) {
    return null; // or return an error message
  }

  return (
    <div>
      <h1>Questions</h1>
      <p>Answer all the questions</p>
      <ol>
        {questions.slice(0, numQuestions).map((question) => (
          <li key={question.id}>
            <p>{question.question}</p>
            <ul>
              {question.options.map((option, index) => (
                <li key={index} style={{listStyleType: "none" }}>
                  <label>
                    <input
                      type="radio"
                      value={option}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Questions;

// const Questions = ({ questions, numQuestions }) => {
//   if (!questions) {
//     return null; // or return an error message
//   }

//   return (
//     <div>
//       <h1>Questions</h1>
//       <p>Answer all the questions</p>
//       <ol>
//         {questions.slice(0, numQuestions).map((question) => (
//           <li key={question.id}>
//             <p>{question.question}</p>
//             <ul>
//               {question.options.map((option, index) => (
//                 <li key={index} style={{listStyleType: "none" }}>
//                   <label>
//                     <input
//                       type="radio"
//                       value={option}
//                     />
//                     {option}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// };

// export default Questions;
