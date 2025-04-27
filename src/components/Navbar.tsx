import { Github } from "lucide-react";
import Link from "next/link";

export default function Navbar(){
    return(
        <div className="flex flex-row justify-between items-center border-1 shadow-md h-[75px] w-full px-28">
            <Link href="/" className="text-4xl font-bold text-blue-500 hover:text-blue-600 cursor-pointer transition-all duration-300">FlashCards</Link>
            <Link href="https://github.com/1oneegame"><Github className="w-6 h-6 text-blue-500 hover:text-blue-600 transition-all duration-300"/></Link>
        </div>
    );
}