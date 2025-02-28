import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
    const data = await request.json();
    console.log(data.email);

    const userFoundByEmail = await db.user.findUnique({
        where: {
            user_email: data.email, // Asegúrate de que el campo sea 'user_email'
        },
    });

    if (!userFoundByEmail) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
        user_image: userFoundByEmail.user_image,
    });
}