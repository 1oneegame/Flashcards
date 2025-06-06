'use client'
import { createContext, useContext, ReactNode, useState } from 'react';

interface CategoryItem {
    id: number;
    name: string;
}

interface QuestionItem {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface Question {
    response_code: number;
    results: QuestionItem[];
}

interface CardContextType {
    questions: Question | undefined;
    currentQuestion: number;
    shuffledAnswers: string[];
    score: number;
    answeredQuestions: boolean[];
    selectedAnswers: string[];
    showCorrectAnswers: boolean;
    chosenCategory: CategoryItem;
    setQuestions: (questions: Question) => void;
    setCurrentQuestion: (index: number) => void;
    setShuffledAnswers: (answers: string[]) => void;
    setScore: (score: number) => void;
    setAnsweredQuestions: (answered: boolean[]) => void;
    setSelectedAnswers: (selected: string[]) => void;
    setShowCorrectAnswers: (show: boolean) => void;
    setChosenCategory: (category: CategoryItem) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
    const [questions, setQuestions] = useState<Question>();
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState<boolean>(false);
    const [chosenCategory, setChosenCategory] = useState<CategoryItem>({
        id: 9,
        name: 'General knowledge'
    })


    const value = {
        questions,
        currentQuestion,
        shuffledAnswers,
        score,
        answeredQuestions,
        selectedAnswers,
        showCorrectAnswers,
        chosenCategory,
        setQuestions,
        setCurrentQuestion,
        setShuffledAnswers,
        setScore,
        setAnsweredQuestions,
        setSelectedAnswers,
        setShowCorrectAnswers,
        setChosenCategory,
    };

    return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export function useCard() {
    const context = useContext(CardContext);
    if (context === undefined) {
        throw new Error('useCard must be used within a CardProvider');
    }
    return context;
} 