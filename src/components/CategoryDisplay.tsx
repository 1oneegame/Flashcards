'use client'
import { useCard } from "@/context/CardContext";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import Loading from "./Loading";

interface CategoryItem {
    id: number;
    name: string;
}

interface Category {
    trivia_categories: CategoryItem[]; 
}


export default function CategoryDisplay() {
    const [categories, setCategories] = useState<Category>();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const {
        chosenCategory,
        setChosenCategory,
    } = useCard();

    const fetchCategories = useCallback(async () => {
        const response = await fetch('api/get-categories');
        const data = await response.json();
        
        setCategories(data);
        setChosenCategory(data.trivia_categories[0]);
        setIsLoading(false);
    }, [setCategories, setChosenCategory]);

    useEffect(() => {
        setIsLoading(true);
        fetchCategories();
    }, [fetchCategories]); 
    if (isLoading) {
        return (
            <Loading/>
        );
    }else{
        return(
            <div className="flex flex-col space-y-2 p-4">
                <h1 className="text-2xl mb-4 ml-4 font-bold text-blue-500">Categories:</h1>
                {categories?.trivia_categories.map((category) => (
                    <div 
                        onClick={() => setChosenCategory(category)}
                        key={category.id}
                        className={cn("p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white", category == chosenCategory ? 'ring-1 ring-blue-500' : 'cursor-pointer')}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
        );
    }
}