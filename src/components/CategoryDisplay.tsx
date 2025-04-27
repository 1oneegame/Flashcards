'use client'
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CategoryItem {
    id: number;
    name: string;
}

interface Category {
    trivia_categories: CategoryItem[]; 
}

export default function CategoryDisplay() {
    const [categories, setCategories] = useState<Category>();
    const [chosenCategory, setChosenCategory] = useState<CategoryItem>();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const fetchCategories = async () => {
        const response = await fetch('api/get-categories');
        const data = await response.json();
        
        setCategories(data);
        setChosenCategory(data.trivia_categories[0]);
        setIsLoading(false);
    } 
    useEffect(() => {
        setIsLoading(true);
        fetchCategories();
    }, []); 

    return(
        (
        !isLoading &&
            <div className="flex flex-col space-y-2 p-4">
                <h1 className="text-2xl mb-4 ml-4 font-bold text-blue-500">Categories:</h1>
                {categories?.trivia_categories.map((category) => (
                    <div 
                        onClick={() => setChosenCategory(category)}
                        key={category.id}
                        className={cn("p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white", category == chosenCategory ? 'ring-1 ring-blue-500 cursor-' : 'cursor-pointer')}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
        )
    );
}