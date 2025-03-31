import { NextResponse } from "next/server";
import db from "@/lib/db";
import { type User } from "@prisma/client";

export async function POST(request: Request) {
    const data = await request.json();

    const userFoundByEmail = await db.user.findUnique({
        where: {
            user_email: data.user_email
        }
    })

    if (userFoundByEmail) {
        return NextResponse.json({ error: "User email already exists" }, { status: 400 });
    }


    console.log(data);
    const newUser: User = await db.user.create({
        data: {
            user_name: data.user_name.toLowerCase(),
            user_email: data.user_email.toLowerCase(),
            user_password: data.user_password,
            user_phone: data.user_phone,
            user_image: data.user_image,
        }
    })


    console.log("User created: " + JSON.stringify(newUser));
    return NextResponse.json(newUser);
}
