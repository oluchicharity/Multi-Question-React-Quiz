import { useState } from "react";
import "./App.css";

function App() {
  const [showFinalResult, setFinalResult] = useState(false); 
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      text: "What is a blockchain?",
      options: [
        { id: 0, text: "A list of transactions connected by a chain", isCorrect: true },
        { id: 1, text: "A block", isCorrect: false },
        { id: 2, text: "A chain", isCorrect: false },
        { id: 3, text: "I don't know", isCorrect: false },
      ],
    },
    {
      text: "3+3?",
      options: [
        { id: 0, text: "1", isCorrect: false },
        { id: 1, text: "3", isCorrect: false },
        { id: 2, text: "6", isCorrect: true },
        { id: 3, text: "10", isCorrect: false },
      ],
    },
    {
      text: "What is my name?",
      options: [
        { id: 0, text: "Oluchi", isCorrect: true },
        { id: 1, text: "Favy", isCorrect: false },
        { id: 2, text: "Joy", isCorrect: false },
        { id: 3, text: "Bukky", isCorrect: false },
      ],
    },
  ];

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setFinalResult(true); 
    } 
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResult(false);
  };

  return (
    <div>
      {/* Header */}
      <h1> Multiple-Question Quiz</h1>

      {/* Current score */}
      <h2>Current Score: {score}</h2>

      {/* Show final result or question card based on the state */}
      {showFinalResult ? (
        <div className="Result">
          <h1>Final Result</h1>
          <h2>
            {score} of {questions.length} ({((score / questions.length) * 100).toFixed(2)}%)
          </h2>
          <button className="btn" onClick={restartQuiz}>
            Restart?
          </button>
        </div>
      ) : (
        <div className="Question-Card">
          <h3>
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <h4>{questions[currentQuestion].text}</h4>
          <ul>
            {questions[currentQuestion].options.map((option) => (
              <li key={option.id} onClick={() => handleAnswerClick(option.isCorrect)}>
                {option.text}
              </li>
            ))}
          </ul>
          <div className="navigation-buttons">
            <button
              className="btn"
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
