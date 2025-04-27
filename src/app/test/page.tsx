'use client'

import CardDisplay from "@/components/CardDisplay";
import { Progress } from "@/components/ui/progress";
import { Bookmark, Ellipsis, Share, Star } from "lucide-react";
import { useCard } from "@/context/CardContext";
import { cn } from "@/lib/utils";
import FunctionBlocks from "@/components/FunctionBlocks";
import Navbar from "@/components/Navbar";

export default function Home() {
    const {
        questions,
        currentQuestion,
    } = useCard();

    const Title = "Title sample";
    const Rating = "4.0 (2 reviews)";
    const progressValue = (currentQuestion + 1) / (questions?.results?.length || 1) * 100;
    const totalQuestions = questions?.results?.length || 0;

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar/>
            <FunctionBlocks/>
            <div className="mx-42 mt-8 flex flex-col border-1 rounded-lg shadow-lg h-fit min-h-[375px] relative">
                <CardDisplay/>
            </div>
            <div className="mx-42 mt-8 flex flex-col gap-8">
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
