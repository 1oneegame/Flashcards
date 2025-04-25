import { NextResponse } from 'next/server';

const api_url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple";

export async function GET() {
    try {
        const response = await fetch(api_url, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Не удалось загрузить вопросы' },
            { status: 500 }
        );
    }
}