'use client'

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import Loading from "./Loading";
import { Minus, MinusCircle, Plus, PlusCircle } from "lucide-react";

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

export default function CardDisplay() {
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [error, setError] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };


    const fetchQuestion = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await fetch('/api/get-cards',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:9, name: 'General Knowledge'}),
            });
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setCurrentQuestion(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'an error occured fetching the question');
            console.error('Error fetching question:', err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchQuestion();
    }, [])

    if(isLoading){
        return(
            <Loading/>
        )
    }else{
        return(
            <div className="relative">
                <div className="flex flex-col items-center relative h-fit min-h-[375px] perspective-distant " onClick={() => setShowAnswer(!showAnswer)}>
                    <div className={cn("transition-all duration-300 transform-3d w-full h-fit min-h-[375px]",
                        showAnswer ? 'rotate-y-180' : 'rotate-y-0'
                    )}>

                        <div className="absolute backface-hidden flex-col items-center bg-white w-full h-fit min-h-[375px]">
                            <div className='relative mt-6'>
                                <div className='flex flex-row justify-between items-center mb-2 gap-4 absolute top-0 left-1/2 -translate-x-1/2'>
                                    <Badge className="font-medium text-sm">{decodeHtml(currentQuestion?.results[0].category)}</Badge>
                                    <Badge className={cn("font-medium text-sm", {
                                        "bg-green-500": currentQuestion?.results[0].difficulty === "easy",
                                        "bg-yellow-500": currentQuestion?.results[0].difficulty === "medium",
                                        "bg-red-500": currentQuestion?.results[0].difficulty === "hard",
                                    })}>
                                        {currentQuestion?.results[0].difficulty}
                                    </Badge>
                                </div>
                            </div>
                            <h1 className="text-4xl text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">{decodeHtml(currentQuestion?.results[0].question)}</h1>
                            <span className="text-md text-gray-500 absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-6 ">Tap to check the answer</span>
                        </div>

                        <div className={cn("absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 backface-hidden flex flex-col items-center bg-white transition-all duration-300",
                            showAnswer ? 'rotate-y-180' : 'hidden rotate-y-0'
                        )}>
                            <span className="text-4xl text-center">{decodeHtml(currentQuestion?.results[0].correct_answer)}</span>
                            <span className="text-md text-gray-500 mt-4 text-center">Tap to return back</span>
                        </div>

                    </div>
                </div>
                {
                <div className="absolute top-0 translate-y-6 w-full">
                        <div className="flex flex-row justify-between w-full px-12 ">
                            <span className={cn('p-2 text-2xl text-emerald-500 hover:text-emerald-600 border-2 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-100 rounded-lg pointer-cursor hover:scale-110 transition-all duration-300',
                                showAnswer ? '' : 'hidden'
                            )}>
                                I know
                            </span>
                            <span className={cn('p-2 text-2xl text-red-500 hover:text-red-600 border-2 border-red-500 hover:border-red-600 hover:bg-red-100 rounded-lg pointer-cursor hover:scale-110 transition-all duration-300',
                                showAnswer ? '' : 'hidden'
                            )}>
                                I don't know    
                            </span>
                        </div>
                </div>
                }
            </div>
        );
    }
}