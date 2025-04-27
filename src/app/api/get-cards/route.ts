import { NextResponse } from 'next/server';

const api_url = "https://opentdb.com/api.php?amount=10&type=multiple";

export async function GET() {
    try {
        const response = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            next: {
                revalidate: 0
            }
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