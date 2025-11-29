'use client';
import { useState } from "react";
import { questionsOptions } from "../../data/questions";
import { useQuestionAnswers } from "../context/questionAnswersContext";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useDataContext } from "../context/aiDataContext";

export default function Questionare() {
  const {setData} = useDataContext();
  const [questionNumber, setQuestionNumber] = useState(0);
  const { answers, setAnswers } = useQuestionAnswers();
  const [loading, setLoading] = useState(false);
  const {setLoggedIn} = useAuth();
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

const handleSubmit = async () => {
  for (let i = 0; i < questionsOptions.length; i++) {
    if (!answers[i]) {
      alert("⚠️ Please answer all questions before submitting!");
      return;
    }
  }

  try {
    setLoading(true)
    await axios.post("/api/gemini", { answers });

    setLoggedIn(true);

    const rec = await axios.get("/api/recommendations");
    setData(rec.data);

    window.location.href = "/dashboard";

  } catch (err) {
    alert(
      err.response?.data?.error ||
      err.message ||
      "Something went wrong"
    );
  } finally{
    setLoading(false)
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
                          checked={answers[questionNumber] === option}
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
          {questionNumber < 6 ?
            <button
            type="button"
            onClick={handleNext}
            disabled={questionNumber === questionsOptions.length - 1}
            >
            Next
            </button>
            :
            <button
              type="button"
              className={`loader-btn ${loading ? "loading" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <span className="btn-spinner"></span> : "Submit"}
            </button>

          }
        </div>
      </form>
    </div>
  );
}
