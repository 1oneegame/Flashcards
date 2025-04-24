import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Bookmark, CopyPlus, Ellipsis, FileText, GraduationCap, IdCard, Maximize, Play, Share, Shuffle, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const Title = "Title sample", Rating = "4.0 (2 reviews)";

  const cardFunction = [
    {
      title: "Flashcards",
      href: "/",
      icon: <IdCard className="w-8 h-8 text-blue-600"/>,
    },
    {
      title: "Learn",
      href: "/",
      icon: <GraduationCap className="w-8 h-8 text-blue-600"/>,
    },
    {
      title: "Test",
      href: "/",
      icon: <FileText className="w-8 h-8 text-blue-600"/>,
    },
    {
      title: "Match",
      href: "/",
      icon: <CopyPlus className="w-8 h-8 text-blue-600"/>,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-row items-center justify-between h-[75px] w-full border-1 py-4">
          <div className="flex flex-col items-center justify-center ml-32 gap-1">
            <h2 className="text-4xl font-bold cursor-pointer">{Title}</h2>
            <div className="flex flex-row gap-1">
              <Star className="w-5 h-5 pt-1"/>
              <span className="text-md">{Rating}</span>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center mr-32">
            <button className="bg-white hover:bg-indigo-100 duration-300 transition-colors rounded-lg shadow-md cursor-pointer"><Bookmark className="w-6 h-6 m-2"/></button>
            <button className="bg-white hover:bg-indigo-100 duration-300 transition-colors rounded-lg shadow-md cursor-pointer"><Share className="w-6 h-6 m-2"/></button>
            <button className="bg-white hover:bg-indigo-100 duration-300 transition-colors rounded-lg shadow-md cursor-pointer"><Ellipsis className="w-6 h-6 m-2" /></button>
          </div>
      </div>
      <div className="grid grid-cols-4 gap-8 mx-42 mt-8">
        {
          cardFunction.map((item, index) => (
            <div key={index} className="cursor-pointer border-1 shadow-md rounded-lg w-full min-h-[125px] flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 bg-indigo-100/20">
              {item.icon}
              <h2 className="text-xl">{item.title}</h2>
            </div>
          ))
        }
      </div>
      <div className="mx-42 mt-8 flex flex-col border-1 rounded-lg shadow-lg h-[350px]">
        card content
      </div>
      <div className="mx-42 mt-8 flex flex-col gap-8">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-8">
            <Link href="/" className="border-1 rounded-full shadow-md p-2 bg-white hover:bg-indigo-100 transition-colors duration-300"><Play className="w-6 h-6"/></Link>
            <Link href="/" className="border-1 rounded-full shadow-md p-2 bg-white hover:bg-indigo-100 transition-colors duration-300"><Shuffle className="w-6 h-6"/></Link>
          </div>
          <div className="flex flex-row gap-8">
            <Link href="/" className="border-1 rounded-full shadow-md p-2 bg-white hover:bg-indigo-100 transition-colors duration-300"><ArrowLeft className="w-6 h-6"/></Link>
            <span className="text-3xl font-light">2/18</span>
            <Link href="/" className="border-1 rounded-full shadow-md p-2 bg-white hover:bg-indigo-100 transition-colors duration-300"><ArrowRight className="w-6 h-6"/></Link>
          </div>
          <Link href="/" className="border-1 rounded-full shadow-md p-2 bg-white hover:bg-indigo-100 transition-colors duration-300"><Maximize/></Link>
        </div>
        <Progress value={95}/>
      </div>
    </div>
  );
}
