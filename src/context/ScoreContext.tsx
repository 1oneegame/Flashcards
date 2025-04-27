'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface questionItem {
  question: string;
  correct_answer: string;
}

interface ScoreContextType {
  questionAmount: number;
  correctCount: number;
  wrongQuestions: questionItem[];
  setQuestionAmount: (questionAmount: number) => void;
  setCorrectCount: (correctCount: number) => void;
  setWrongQuestions: (questions: questionItem[]) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [questionAmount, setQuestionAmount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongQuestions, setWrongQuestions] = useState<questionItem[]>([]);

  return (
    <ScoreContext.Provider value={{ questionAmount, correctCount, wrongQuestions, setQuestionAmount, setCorrectCount, setWrongQuestions}}>
      {children}
    </ScoreContext.Provider>
  );
};

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}; 