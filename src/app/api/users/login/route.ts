import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { generateTokens } from "@/utils/auth";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    error: validation.error.errors
                        .map((e) => e.message)
                        .join(", "),
                },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        const user = await prisma.user1.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const { accessToken, refreshToken } = await generateTokens(user.id);

        const response = NextResponse.json(
            { message: "User logged in successfully" },
            { status: 200 }
        );

        response.cookies.set("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
            sameSite: "strict",
        });

        response.cookies.set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            sameSite: "strict",
        });

        return response;
    } catch (error) {
        console.error("Error occurred during login:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
