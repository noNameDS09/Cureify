import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";

const generateTokens = (userId: number) => {
    if (!userId) {
        throw new Error("userId is required to generate tokens");
    }

    const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

export async function POST(req: NextRequest) {
    try {
        const { email, password, confirmPassword } = await req.json();
        // console.log(email, password, confirmPassword);
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }
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

        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            select:{
                id : true
            }
        });
        
        console.log("usererers", user)
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
