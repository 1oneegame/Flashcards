import FunctionBlocks from "@/components/FunctionBlocks";
import Navbar from "@/components/Navbar";
import CardDisplay from "@/components/CardDisplay";

export default function Home() {
    return (
        <div className="w-full min-h-screen pb-20">
            <Navbar/>
            <FunctionBlocks/>
            <div className="mx-2 sm:mx-8 md:mx-16 lg:mx-28 mt-8 flex flex-col border-1 rounded-lg shadow-lg h-fit min-h-[375px] relative hover:scale-105 transition-transform duration-300 cursor-pointer">
                <CardDisplay/>
            </div>
        </div>
    );
}
