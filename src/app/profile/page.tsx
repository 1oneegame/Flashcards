'use client'
import FunctionBlocks from "@/components/FunctionBlocks";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import { X } from "lucide-react";
import { useEffect, useState } from "react";


export default function Page(){
    const [isModalWindowOpen, setIsModalWindowOpen] = useState<boolean>(false);
    const [responseAI, setResponseAI] = useState<string>('');

    const handleDataFromProfileCard = (response: string) => {
        setResponseAI(response);
    }
    
    useEffect(() => {
        if (responseAI !== '') setIsModalWindowOpen(true);
    }, [responseAI]);

    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    return(
        <div className="flex flex-col min-h-screen w-full relative pb-20">
            {
                isModalWindowOpen && 
                    <div className="z-1 bg-black/40 w-full h-full flex justify-center items-center absolute">
                        <div className="relative bg-white rounded-lg border-1 w-[calc(100vh)] min-h-[375px] py-4 px-8">
                            <X onClick={() => {setIsModalWindowOpen(!isModalWindowOpen); setResponseAI('')}} className="w-6 h-6 absolute top-0 right-0 -translate-x-6 translate-y-6 hover:text-red-500 transition-colors duration-300 cursor-pointer"/>
                            <h1 className="text-4xl font-bold text-center">AI analyzer</h1>
                            <div className="text-md mt-4">
                                <p className="whitespace-pre-line">{decodeHtml(responseAI)}</p>
                            </div>
                        </div>
                    </div>
            }
            <Navbar/>
            <FunctionBlocks/>
            <ProfileCard onData={handleDataFromProfileCard}/>
        </div>
    );
}