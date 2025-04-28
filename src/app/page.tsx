import CategoryDisplay from "@/components/CategoryDisplay";
import FunctionBlocks from "@/components/FunctionBlocks";
import Navbar from "@/components/Navbar";

export default function Page(){

    return(
        <div className="w-full min-h-screen pb-20">
            <Navbar/>
            <FunctionBlocks/>
            <div className="mx-2 sm:mx-8 md:mx-16 lg:mx-28 mt-8 flex flex-col border-1 rounded-lg shadow-lg h-[300px] sm:h-[375px] relative overflow-scroll">
                <CategoryDisplay/>
            </div>
        </div>
    );
}