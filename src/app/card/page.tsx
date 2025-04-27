import FunctionBlocks from "@/components/FunctionBlocks";
import Navbar from "@/components/Navbar";
import CardDisplay from "@/components/CardDisplay";

export default function Home() {
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
