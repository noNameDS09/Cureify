import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { generateTokens } from "@/utils/auth";
import { z } from "zod";

const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validation = registerSchema.safeParse(body);
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

        const { email, password, confirmPassword } = validation.data;

        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: "Passwords do not match" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            select: {
                id: true,
            },
        });
        console.log(user);
        if (!user || !user.id) {
            console.error("User creation failed. User data:", user);
            return NextResponse.json(
                { error: "Failed to create user" },
                { status: 500 }
            );
        }

        const { accessToken, refreshToken } = generateTokens(user.id);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                accessToken,
                refreshToken,
            },
        });

        const response = NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );

        response.cookies.set("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60,
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
        console.error("Error occurred during registration:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
