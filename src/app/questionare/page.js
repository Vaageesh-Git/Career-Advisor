'use client';
import { useState } from "react";
import { questionsOptions } from "../../data/questions";

export default function Questionare() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState({}); // { 0: "Option A", 1: "Option B" }
  const handleOptionChange = (option) => {
    setAnswers({ ...answers, [questionNumber]: option });
  };
  const handleNext = () => {
    if (questionNumber < questionsOptions.length - 1) {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const handlePrev = () => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  return (
    <div className="main-form">
      <h1>Your Journey Starts Here - Share a Bit About Yourself</h1>
      <form className="questions-form">
        <div className="questionare-container">
          <h2 className="questionare-heading">Question {questionNumber + 1}</h2>
          <div className="options-container">
            {questionsOptions
              .slice(questionNumber, questionNumber + 1)
              .map((quesObj, index) => (
                <div key={index}>
                  <h1>{quesObj.question}</h1>
                  {quesObj.options.map((option, idx) => (
                    <div key={idx} className="option-item">
                      <label htmlFor={`option-${index}-${idx}`} className="option-label">
                        <input
                          type="radio"
                          name={`question-${questionNumber}`}
                          value={option}
                          checked={answers[questionNumber] === option} // ✅ controlled
                          onChange={() => handleOptionChange(option)}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>

        <div className="ques-process-btn">
          <button type="button" onClick={handlePrev} disabled={questionNumber === 0}>
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={questionNumber === questionsOptions.length - 1}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
