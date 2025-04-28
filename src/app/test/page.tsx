'use client'

import { Progress } from "@/components/ui/progress";
import { useCard } from "@/context/CardContext";
import { cn } from "@/lib/utils";
import FunctionBlocks from "@/components/FunctionBlocks";
import Navbar from "@/components/Navbar";
import QuestionnaireDisplay from "@/components/QuestionnaireDisplay";

export default function Home() {
    const {
        questions,
        currentQuestion,
    } = useCard();

    const progressValue = (currentQuestion + 1) / (questions?.results?.length || 1) * 100;
    const totalQuestions = questions?.results?.length || 0;

    return (
        <div className="w-full min-h-screen pb-20">
            <Navbar/>
            <FunctionBlocks/>
            <div className="mx-2 sm:mx-8 md:mx-16 lg:mx-28 mt-8 flex flex-col border-1 rounded-lg shadow-lg h-fit min-h-[375px] relative">
                <QuestionnaireDisplay/>
            </div>
            <div className="mx-2 sm:mx-8 md:mx-16 lg:mx-28 mt-8 flex flex-col gap-8">
                <div className="flex flex-row justify-center">
                    <span className={cn("text-3xl font-light", currentQuestion === totalQuestions ? "hidden" : "block")}>
                        {currentQuestion + 1} | {totalQuestions}
                    </span>
                </div>
                <Progress value={progressValue} className="mb-8"/>
            </div>
        </div>
    );
}
