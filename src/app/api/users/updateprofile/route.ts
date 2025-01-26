import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenFromRequest } from "@/utils/auth";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { useId } from "react";

// Define the input schema for updating user profile
const updateProfileSchema = z.object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    contact: z.string().min(10, { message: "Contact number is required" }),
    age: z.number().min(0, { message: "Age must be a valid number" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    birthdate: z.string().min(1, { message: "Birthdate is required" }),
    previousMedicalHistory: z.string().optional(),
    familyHistory: z.string().optional(),
    addiction: z.string().optional(),
    address: z.string().optional(),
});

export async function PUT(req: NextRequest) {
    try {
        // Step 1: Extract the token from request cookies or headers
        const token = getTokenFromRequest(req);
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized - No access token found" },
                { status: 401 }
            );
        }
        // console.log(token);
        // Step 2: Verify the token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            console.error("Error verifying token:", error); // More detailed error logging
            return NextResponse.json(
                { error: "Invalid or expired token" },
                {
                    status: 401,
                }
            );
        }
        // console.log(decodedToken);

        // Check if decodedToken is valid
        if (!decodedToken || !decodedToken.userId) {
            console.error("Decoded token is invalid:", decodedToken);
            return NextResponse.json(
                { error: "Invalid token data" },
                {
                    status: 401,
                }
            );
        }

        const userId = decodedToken.userId;
        // console.log(userId);

        // Step 3: Parse and validate the request body
        const body = await req.json();
        // console.log(body);
        const validation = updateProfileSchema.safeParse(body);
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

        const {
            fullName,
            contact,
            age,
            gender,
            birthdate,
            previousMedicalHistory,
            familyHistory,
            addiction,
            address,
        } = validation.data;

        // Step 4: Update the user's profile in the database
        const updatedProfile = await prisma.userprofile.upsert({
            where: { userId },
            update: {
                fullName: fullName,
                contact: contact,
                age: age,
                gender: gender,
                birthdate: new Date(birthdate),
                previousMedicalHistory: previousMedicalHistory,
                familyHistory: familyHistory,
                addiction: addiction,
                address: address,
            },
            create: {
                userId: userId,
                fullName: fullName,
                contact: contact,
                age: age,
                gender: gender,
                birthdate: new Date(birthdate),
                previousMedicalHistory: previousMedicalHistory,
                familyHistory: familyHistory,
                addiction: addiction,
                address: address,
            },
        });
        console.log("herehre", updatedProfile)
        // Step 5: Return the updated profile
        return NextResponse.json(
            {
                message: "Profile updated successfully",
                profile: updatedProfile,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating profile:", error); // More detailed error logging
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
