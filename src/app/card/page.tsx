'use client'

import { Progress } from "@/components/ui/progress";
import { Bookmark, Ellipsis, Share, Star } from "lucide-react";
import { useCard } from "@/context/CardContext";
import { cn } from "@/lib/utils";
import FunctionBlocks from "@/components/FunctionBlocks";
import Navbar from "@/components/Navbar";
import QuestionnaireDisplay from "@/components/QuestionnaireDisplay";
import CardDisplay from "@/components/CardDisplay";
import { ScoreProvider } from "@/context/ScoreContext";

export default function Home() {
    const {
        questions,
        currentQuestion,
    } = useCard();

    const progressValue = (currentQuestion + 1) / (questions?.results?.length || 1) * 100;
    const totalQuestions = questions?.results?.length || 0;

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar/>
            <FunctionBlocks/>
            <div className="mx-42 mt-8 flex flex-col border-1 rounded-lg shadow-lg h-fit min-h-[375px] relative hover:scale-105 transition-transform duration-300 cursor-pointer">
                <CardDisplay/>
            </div>
        </div>
    );
}
