import { FileText, IdCard, User } from "lucide-react"
import Link from "next/link";

export default function FunctionBlocks(){

    const cardFunction = [
        {
        title: "Flashcards",
        href: "card/",
        icon: <IdCard className="w-8 h-8 text-blue-600"/>,
        },
        {
        title: "Test",
        href: "test/",
        icon: <FileText className="w-8 h-8 text-blue-600"/>,
        },
        {
        title: "Profile",
        href: "/profile",
        icon: <User className="w-8 h-8 text-blue-600"/>,
        },
    ]
    return(
        <div className="grid grid-cols-3 gap-8 mx-42 mt-8">
            {
              cardFunction.map((item, index) => (
                <Link href={item.href} key={index} className="cursor-pointer border-1 shadow-md rounded-lg w-full min-h-[125px] flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 bg-indigo-100/20">
                  {item.icon}
                  <h2 className="text-xl">{item.title}</h2>
                </Link>
              ))
            }
        </div>
    )
}