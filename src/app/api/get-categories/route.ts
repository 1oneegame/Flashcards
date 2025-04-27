import { NextResponse } from "next/server";

export async function GET() {
    try{
        const response = await fetch('https://opentdb.com/api_category.php')
        const data = await response.json();
        
        return NextResponse.json(data);
    } catch(error) {
        return NextResponse.json(
            { error: 'Не удалось загрузить категории' },
            { status: 500 }
        );
    }
}