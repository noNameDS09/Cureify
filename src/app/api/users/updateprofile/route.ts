import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenFromRequest } from "@/utils/auth";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { useId } from "react";


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
        const token:string = getTokenFromRequest(req);
        // console.log(token)
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized - No access token found" },
                { status: 401 }
            );
        }
        // console.log(token);
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            console.error("Error verifying token:", error);
            return NextResponse.json(
                { error: "Invalid or expired token" },
                {
                    status: 401,
                }
            );
        }
        // console.log(decodedToken);

        if (!decodedToken || !decodedToken.userId) {
            console.error("Decoded token is invalid:", decodedToken);
            return NextResponse.json(
                { error: "Invalid token data" },
                {
                    status: 401,
                }
            );
        }

        const userId:number = decodedToken.userId;
        // console.log(decodedToken);

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
        // console.log(validation)
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
// console.log(typeof(userId))
        try {
            // console.log("trying")
            const updatedProfile = await prisma.userprofile.upsert({
                where: { userId },  // Ensure userId is an Int
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
                    userId: userId,  // Ensure userId is an Int
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
            
            // console.log("herehre", updatedProfile)
            return NextResponse.json(
                {
                    message: "Profile updated successfully",
                    profile: updatedProfile,
                },
                { status: 200 }
            );
        } catch (error) {
            return NextResponse.json({
                error : error
            }, {status:500})
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: "Internal server error", 
                // error : error
             },
            { status: 500 }
        );
    }
}
