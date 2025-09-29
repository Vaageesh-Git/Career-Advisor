'use client';
import { useState } from "react";
import { questionsOptions } from "../../data/questions";

export default function Questionare() {
  const [questionNumber, setQuestionNumber] = useState(0);

  return (
    <div>
      <form>
        <div className="questionare-container">
          <h2 className="questionare-heading">Question {questionNumber + 1}</h2>
          <div className="options-container">
            {questionsOptions.map((quesObj, index) => (
              <div key={index}>
                <h1>{quesObj.question}</h1>
                  {questionNumber === index &&
                    quesObj.options.map((option, idx) => (
                      <div key={idx} className="option-item">
                        <input
                          type="radio"
                          id={`option-${index}-${idx}`}
                          name={`question-${index}`}
                          value={option}
                        />
                        <label htmlFor={`option-${index}-${idx}`}>
                          {option}
                        </label>
                      </div>
                    ))}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
