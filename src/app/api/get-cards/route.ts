import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const chosenCategory = await request.json();
    const api_url = `https://opentdb.com/api.php?amount=10&category=${chosenCategory.id}`;
    
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            next: {
                revalidate: 0
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json(
            { error: 'если честно, то хз почему выдает ошибку', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}