// const [loggedIn, setLoggedIn] = useState(false);
//   const [accessCode, setAccessCode] = useState('');
//   const [videoWatched, setVideoWatched] = useState(false);
//   const [questionsAnswered, setQuestionsAnswered] = useState(false);

//   const handleLogin = () => {
//     // Implement authentication logic here (e.g., validate access code)
//     // If authentication is successful, setLoggedIn(true)
//   };

//   const handleVideoComplete = () => {
//     // Mark the video as watched and show the questions
//     setVideoWatched(true);
//   };

//   const handleQuestionsComplete = () => {
//     // Mark the questions as answered and show certificate
//     setQuestionsAnswered(true);
//   };

//   return (
//     <div className="App">
//       {!loggedIn && (
//         <div>
//           <h1>Login</h1>
//           <input
//             type="text"
//             placeholder="Enter Access Code"
//             value={accessCode}
//             onChange={(e) => setAccessCode(e.target.value)}
//           />
//           <button onClick={handleLogin}>Login</button>
//         </div>
//       )}

      

//       {loggedIn && !videoWatched && (
//         <div>
//           <h2>Video Presentation</h2>
//           {/* Embed your video here */}
//           <button onClick={handleVideoComplete}>Mark as Watched</button>
//         </div>
//       )}

//       {loggedIn && videoWatched && !questionsAnswered && (
//         <div>
//           <h2>Objective Questions</h2>
//           {/* Display objective questions here */}
//           <button onClick={handleQuestionsComplete}>Submit Answers</button>
//         </div>
//       )}

//       {loggedIn && videoWatched && questionsAnswered && (
//         <div>
//           <h2>Certificate of Completion</h2>
//           {/* Display the certificate */}
//         </div>
//       )}
//     </div>
//   );