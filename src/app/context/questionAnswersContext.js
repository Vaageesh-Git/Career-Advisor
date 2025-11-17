"use client";

import { createContext, useContext, useState } from "react";

const QuestionAnswersContext = createContext();

export function QuestionAnswersProvider({ children }) {
  const [answers, setAnswers] = useState({});

  return (
    <QuestionAnswersContext.Provider value={{ answers, setAnswers }}>
      {children}
    </QuestionAnswersContext.Provider>
  );
}

export function useQuestionAnswers() {
  return useContext(QuestionAnswersContext);
}
