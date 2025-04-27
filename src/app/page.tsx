import CategoryDisplay from "@/components/CategoryDisplay";
import FunctionBlocks from "@/components/FunctionBlocks";
import Navbar from "@/components/Navbar";

export default function Page(){

    return(
        <div className="w-full min-h-screen">
            <Navbar/>
            <FunctionBlocks/>
            <div className="mx-42 mt-8 flex flex-col border-1 rounded-lg shadow-lg h-[375px] relative overflow-scroll">
                <CategoryDisplay/>
            </div>
        </div>
    );
}