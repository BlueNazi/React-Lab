import React, { useState, useEffect } from "react";
import './App.css'
import Swal from 'sweetalert2';

const QUESTIONS = [
    {
      question: "1. Which is the most popular JavaScript framework?",
      options: ["Angular", "React", "Svelte", "Vue"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "2. Which company invented React?",
      options: ["Google", "Apple", "Netflix", "Facebook"],
      correctOption: 3,
      points: 10,
    },
    {
      question: "3. What's the fundamental building block of React apps?",
      options: ["Components", "Blocks", "Elements", "Effects"],
      correctOption: 0,
      points: 10,
    },
    {
      question:
        "4. What's the name of the syntax we use to describe the UI in React components?",
      options: ["FBJ", "Babel", "JSX", "ES2015"],
      correctOption: 2,
      points: 10,
    },
    {
      question: "5. How does data flow naturally in React apps?",
      options: [
        "From parents to children",
        "From children to parents",
        "Both ways",
        "The developers decides",
      ],
      correctOption: 0,
      points: 10,
    },
    {
      question: "6. How to pass data into a child component?",
      options: ["State", "Props", "PropTypes", "Parameters"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "7. When to use derived state?",
      options: [
        "Whenever the state should not trigger a re-render",
        "Whenever the state can be synchronized with an effect",
        "Whenever the state should be accessible to all components",
        "Whenever the state can be computed from another state variable",
      ],
      correctOption: 3,
      points: 30,
    },
    {
      question: "8. What triggers a UI re-render in React?",
      options: [
        "Running an effect",
        "Passing props",
        "Updating state",
        "Adding event listeners to DOM elements",
      ],
      correctOption: 2,
      points: 20,
    },
    {
      question: '9. When do we directly "touch" the DOM in React?',
      options: [
        "When we need to listen to an event",
        "When we need to change the UI",
        "When we need to add styles",
        "Almost never",
      ],
      correctOption: 3,
      points: 20,
    },
    {
      question: "10. In what situation do we use a callback to update state?",
      options: [
        "When updating the state will be slow",
        "When the updated state is very data-intensive",
        "When the state update should happen faster",
        "When the new state depends on the previous state",
      ],
      correctOption: 3,
      points: 30,
    },
    {
      question:
        "11. If we pass a function to useState, when will that function be called?",
      options: [
        "On each re-render",
        "Each time we update the state",
        "Only on the initial render",
        "The first time we update the state",
      ],
      correctOption: 2,
      points: 30,
    },
    {
      question:
        "12. Which hook to use for an API request on the component's initial render?",
      options: ["useState", "useEffect", "useRef", "useReducer"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "13. Which variables should go into the useEffect dependency array?",
      options: [
        "Usually none",
        "All our state variables",
        "All state and props referenced in the effect",
        "All variables needed for clean up",
      ],
      correctOption: 2,
      points: 30,
    },
    {
      question: "14. An effect will always run on the initial render.",
      options: [
        "True",
        "It depends on the dependency array",
        "False",
        "In depends on the code in the effect",
      ],
      correctOption: 0,
      points: 30,
    },
    {
      question: "15. When will an effect run if it doesn't have a dependency array?",
      options: [
        "Only when the component mounts",
        "Only when the component unmounts",
        "The first time the component re-renders",
        "Each time the component is re-rendered",
      ],
      correctOption: 3,
      points: 20,
    },
  ];
  

  function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [timeLeft, setTimeLeft] = useState(420); 
  
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [timeLeft]);
  
    const handleOptionSelect = (index) => {
      setSelectedOption(index);
    };
  
    const handleNext = () => {
      if (selectedOption === QUESTIONS[currentQuestion].correctOption) {
        setCorrectAnswers((prev) => prev + 1);
        setTotalPoints((prev) => prev + QUESTIONS[currentQuestion].points);
      }
      setSelectedOption(null);
      setCurrentQuestion((prev) => prev + 1);
    };
  
    const handlePrevious = () => {
      setSelectedOption(null);
      setCurrentQuestion((prev) => prev - 1);
    };
    
    const handleCongratulate = () => {
        Swal.fire({
          icon: 'success',
          text: 'dasto jigho hoora ッ',
        });
      };

    const progress = calculateProgress(currentQuestion, QUESTIONS.length);
  
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    return (
      <>
        <div className="quiz-container">
          <div className="timer-container">
            <div className="timer">
              <div className="timer-time">⏱{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
              
            </div>
          </div>
          {currentQuestion < QUESTIONS.length && timeLeft > 0 ? (
            <>
              <div className="progress-container">
                <p>Progress: {progress}%</p>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="question-container">
                <h2>{QUESTIONS[currentQuestion].question}</h2>
                <div className="options">
                  {QUESTIONS[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={`option ${selectedOption === index ? "selected" : ""}`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              <div className="navigation">
                <button
                  className="previous"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  className="next"
                  onClick={handleNext}
                  disabled={selectedOption === null}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
             <div className="result-container">
            <h2>Quiz Completed!</h2>
            <p>You answered {correctAnswers} out of {QUESTIONS.length} questions correctly.</p>
            <p>Your total score is {totalPoints} points.</p>
            <i
              className="fa fa-gift"
              aria-hidden="true"
              onClick={handleCongratulate}
              style={{ fontSize: '36px', cursor: 'pointer', color: '#4caf50' }}
            ></i>
          </div>
        )}
      </div>
    </>
  );
}

  
  function calculateProgress(currentQuestion, totalQuestions) {
    return Math.round((currentQuestion / totalQuestions) * 100);
  }
  
  export default Quiz;