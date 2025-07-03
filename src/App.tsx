import React, { useState } from "react";
import './App.css';
import questions from './data/questions.json'; // Importing JSON data
import logo from './aca.png'; // ACA Logo

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion: Question = questions[currentIndex];

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      } else {
        localStorage.setItem("quizScore", JSON.stringify(score + (option === currentQuestion.correctAnswer ? 1 : 0)));
        setShowSummary(true);
      }
    }, 1000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{ maxWidth: 100, maxHeight: 100 }} className="App-logo" alt="ACA logo" />
        <h1>ACA Quiz App</h1>
        <p style={{ fontStyle: 'italic' }}>I Love ACA</p>
      </header>

      {!showSummary ? (
        <div>
          <h2>Question {currentIndex + 1} of {questions.length}</h2>
          <p>{currentQuestion.question}</p>
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              style={{
                backgroundColor:
                  selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? "lightgreen"
                      : "salmon"
                    : "white"
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>Quiz Summary</h2>
          <p>Your score: {score} / {questions.length}</p>
          <ul>
            {questions.map((q: Question, i: number) => (
              <li key={i}>
                <strong>Q{i + 1}:</strong> {q.question}<br />
                <strong>Answer:</strong> {q.correctAnswer}<br />
                <strong>Explanation:</strong> {q.explanation}<br />
                <strong>Topic:</strong> {q.topic}<br /><br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

