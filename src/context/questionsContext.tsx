import { createContext, ReactNode, useEffect, useState } from "react";
import { Question } from "../interfaces/QuestionsIterface";
import api from "../services/api";

interface QuestionsContextData {
  questions: Question[];
  numberQuestions: number;
  setNumberQuestions: (number: number) => void;
  answers: string[];
  setAnswers: (answer: string[]) => void;
  loadQuestions: () => Promise<void>;
}

interface QuestionsProviderProps {
  children: ReactNode;
}

export const QuestionsContext = createContext<QuestionsContextData>(
  {} as QuestionsContextData
);

export function QuestionsProvider({ children }: QuestionsProviderProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [numberQuestions, setNumberQuestions] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  async function loadQuestions() {
    try {
      if (numberQuestions !== 0) {
        const response = await api.get(`/api.php?amount=${numberQuestions}`);
        const { results } = response.data;
        setQuestions(results);
        console.log(questions);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        numberQuestions,
        setNumberQuestions,
        answers,
        setAnswers,
        loadQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}
