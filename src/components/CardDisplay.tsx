'use client'

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useCard } from "@/context/CardContext";
import Loading from "./Loading";

export default function CardDisplay() {
    const {
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
    } = useCard();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const shuffleArray = (array: string[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }; 

    const fetchQuestion = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log(chosenCategory);
            const response = await fetch('/api/get-cards',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chosenCategory),
            });
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setQuestions(data);
            setAnsweredQuestions(new Array(data.results.length).fill(false));
            setSelectedAnswers(new Array(data.results.length).fill(''));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'an error occured fetching the questions');
            console.error('Error fetching questions:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (questions?.results?.[currentQuestion]) {
            const allAnswers = [
                questions.results[currentQuestion].correct_answer,
                ...questions.results[currentQuestion].incorrect_answers
            ].map(answer => decodeHtml(answer));
            setShuffledAnswers(shuffleArray(allAnswers));
        }
    }, [questions, currentQuestion]);
    
    useEffect(() => {
        setCurrentQuestion(0)
        setShuffledAnswers([])
        setScore(0)
        setAnsweredQuestions([])
        setSelectedAnswers([])
        setShowCorrectAnswers(false);
        fetchQuestion();
    }, []); 

    if (isLoading) {
        return (
            <Loading/>
        );
    }


    if (!questions || !questions.results) {
        return null;
    }

    const allQuestionsAnswered = answeredQuestions.every(answered => answered);
    
    if (currentQuestion >= questions.results.length && allQuestionsAnswered) {
        const totalQuestions = questions.results.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        
        return (
            <div className="h-full w-full px-4 py-6">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <h2 className="text-4xl font-bold">The test is completed!</h2>
                    <span className="text-4xl font-bold">
                        {percentage}%
                    </span>
                    <div className="text-xl">
                        Correct answers: {score} from {totalQuestions}
                    </div>
                    <div className={cn("text-lg font-semibold", {
                        "text-green-500": percentage >= 80,
                        "text-yellow-500": percentage >= 50 && percentage < 80,
                        "text-red-500": percentage < 50,
                    })}>
                        {percentage >= 80 ? "Well job!!!" :
                         percentage >= 50 ? "Satisfactory result!" :
                         "You should learn more!"}
                    </div>
                    <div className="flex flex-row justify-center gap-8">
                        <button
                            className="shadow-md hover:scale-105 cursor-pointer px-8 py-2 bg-blue-500 text-xl font-medium text-white hover:text-blue-500 border-2 border-blue-500 rounded-lg hover:bg-white transition-all duration-300"
                            onClick={async () => {
                                setCurrentQuestion(0);
                                setScore(0);
                                setShowCorrectAnswers(false);
                                await fetchQuestion();
                            }}
                        >
                            Try again!
                        </button>
                        <button 
                            className="shadow-md hover:scale-110 cursor-pointer px-8 py-2 bg-white border-blue-500 border-2 text-xl font-medium text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
                            onClick={() => {
                                setShowCorrectAnswers(!showCorrectAnswers);
                                setCurrentQuestion(0);
                            }}
                        >
                            Check
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (currentQuestion >= questions.results.length && !allQuestionsAnswered) {
        const unansweredIndex = answeredQuestions.findIndex(answered => !answered);
        setCurrentQuestion(unansweredIndex);
        return null;
    }

    return (
        <div className="h-full w-full px-4 py-6">
            <div className="flex flex-row justify-between items-center mx-8 relative">
                <button 
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    disabled={currentQuestion === 0}
                    className={cn(
                        "p-2 rounded-full transition-all absolute left-0 top-0",
                        currentQuestion === 0 
                            ? "hidden" 
                            : "hover:bg-gray-100"
                    )}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex flex-row justify-between items-center mb-2 gap-4 absolute top-0 left-1/2 -translate-x-1/2">
                    <Badge className="font-medium text-sm">{decodeHtml(questions.results[currentQuestion].category)}</Badge>
                    <Badge className={cn("font-medium text-sm", {
                        "bg-green-500": questions.results[currentQuestion].difficulty === "easy",
                        "bg-yellow-500": questions.results[currentQuestion].difficulty === "medium",
                        "bg-red-500": questions.results[currentQuestion].difficulty === "hard",
                    })}>
                        {questions.results[currentQuestion].difficulty}
                    </Badge>
                </div>
                <button 
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    disabled={currentQuestion === questions.results.length - 1}
                    className={cn(
                        "p-2 rounded-full transition-all absolute right-0 top-0",
                        currentQuestion === questions.results.length - 1 
                            ? "hidden" 
                            : "hover:bg-gray-100"
                    )}
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
            
            <div className="flex flex-col items-center p-4 mt-8">
                <div className="w-full px-4">
                    <p className="text-lg mb-4 whitespace-pre-wrap">{decodeHtml(questions.results[currentQuestion].question)}</p>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {shuffledAnswers.map((answer, index) => {
                            const isCorrect = answer === decodeHtml(questions.results[currentQuestion].correct_answer);
                            const isSelected = selectedAnswers[currentQuestion] === answer;
                            
                            return (
                                <button
                                    key={index}
                                    className={cn(
                                        "w-full p-3 text-left rounded-lg transition-colors duration-300 cursor-pointer whitespace-pre-wrap",
                                        showCorrectAnswers
                                            ? isCorrect
                                                ? "bg-green-100 border-2 border-green-500"
                                                : isSelected
                                                    ? "bg-red-100 border-2 border-red-500"
                                                    : "bg-gray-100"
                                            : isSelected
                                                ? "bg-blue-100 border-2 border-blue-500"
                                                : "bg-gray-100 hover:bg-gray-200"
                                    )}
                                    onClick={() => {
                                        if (showCorrectAnswers) return;
                                        
                                        const newSelected = [...selectedAnswers];
                                        newSelected[currentQuestion] = answer;
                                        setSelectedAnswers(newSelected);
                                        
                                        if(isCorrect) {
                                            setScore(score + 1);
                                        }
                                        
                                        const newAnswered = [...answeredQuestions];
                                        newAnswered[currentQuestion] = true;
                                        setAnsweredQuestions(newAnswered);
                                        
                                        if (currentQuestion + 1 >= questions.results.length) {
                                            if (newAnswered.every(answered => answered)) {
                                                setCurrentQuestion(questions.results.length);
                                            } else {
                                                const nextUnanswered = newAnswered.findIndex(answered => !answered);
                                                setCurrentQuestion(nextUnanswered);
                                            }
                                        } else {
                                            setCurrentQuestion(currentQuestion + 1);
                                        }
                                    }}
                                >
                                    {answer}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}