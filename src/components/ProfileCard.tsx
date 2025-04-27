'use client'

import { useScore } from "@/context/ScoreContext";
import { User } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface questionItem {
  question: string;
  correct_answer: string;
}


export default function ProfileCard(){
    const {
        questionAmount,
        correctCount,
        wrongQuestions,
    } = useScore();

    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    return(
        <div className="flex flex-row items-center mx-42 mt-8 gap-8 relative">
                <div className="flex flex-col gap-4 items-center">
                    <User className="w-32 h-32 border-2 rounded-full "/>
                    <h1 className="text-2xl">UserName</h1>
                </div>
                <div className="flex flex-col">
                    <h1 className="absolute top-0 text-4xl text-blue-500 font-bold">Welcome to the profile page!</h1>
                    <div className={cn("flex flex-col gap-2 items-center text-2xl mt-20",
                        questionAmount == 0 ? 'hidden' : ''
                    )}>
                        <span className="font-bold text-blue-500">The number of cards you know:</span>
                        <span><span className="font-bold">{correctCount}</span> from <span className="font-bold">{questionAmount}</span></span>
                        <div className={cn("flex flex-col mt-4 shadow-md rounded-lg h-[175px] overflow-scroll w-full p-4 gap-2",
                            questionAmount == correctCount  ? 'hidden' : ''
                        )}>
                            <span>Incorrect questions:</span>
                            {
                                wrongQuestions.map((question: questionItem) => (
                                    <div className="flex flex-col gap-2 border-1 shadow-md rounded-lg p-2">
                                        <span className="text-sm">Question: {decodeHtml(question.question)}</span>
                                        <span className="text-sm text-emerald-500">Correct answer: {decodeHtml(question.correct_answer)}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
        </div>
    )
}