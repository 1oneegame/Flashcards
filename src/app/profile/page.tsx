import FunctionBlocks from "@/components/FunctionBlocks";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";


export default function Page(){
    return(
        <div className="flex flex-col min-h-screen w-full">
            <Navbar/>
            <FunctionBlocks/>
            <ProfileCard/>
        </div>
    );
}