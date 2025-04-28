'use client'

import { useScore } from "@/context/ScoreContext";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import AnalyzeWithAI from '@/config/gemini'

interface questionItem {
  id: number;
  question: string;
  correct_answer: string;
}
interface ChildComponentProps {
  onData: (data: string) => void;
};


export default function ProfileCard({onData} : ChildComponentProps){

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

    const getResponseFromAI =  async (question: questionItem) => {
        const response = await AnalyzeWithAI(question);
        onData(response || '');
    }

    return(
        <div className="flex flex-col sm:flex-row items-center mx-2 sm:mx-8 md:mx-16 lg:mx-28 mt-8 gap-4 sm:gap-8 relative">
                <div className="flex flex-col gap-4 items-center">
                    <User className="w-32 h-32 border-2 rounded-full "/>
                    <h1 className="text-2xl">UserName</h1>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-4xl text-blue-500 font-bold text-center">Welcome to the profile page!</h1>
                    <div className={cn("flex flex-col gap-2 items-center text-2xl mt-8",
                        questionAmount == 0 ? 'hidden' : ''
                    )}>
                        <span className="font-bold">The number of cards you know:</span>
                        <span><span className="font-bold">{correctCount}</span> from <span className="font-bold">{questionAmount}</span></span>
                        <div className={cn("flex flex-col mt-4 rounded-lg h-[275px] overflow-scroll w-full p-4 gap-2",
                            questionAmount == correctCount  ? 'hidden' : ''
                        )}>
                            <span>Incorrect questions:</span>
                            <div className="grid grid-cols-2 gap-4">
                            {
                                wrongQuestions.map((question: questionItem) => (
                                    <div key={question.id} className="flex flex-col gap-2 border-1 shadow-md rounded-lg p-2">
                                        <span className="text-sm">Question: {decodeHtml(question.question)}</span>
                                        <span className="text-sm text-emerald-500">Correct answer: {decodeHtml(question.correct_answer)}</span>
                                        <button className="shadow-md rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition-colors duration-300 cursor-pointer" onClick={() => getResponseFromAI(question)}>Analyze with AI</button>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}