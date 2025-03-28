import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenFromRequest, verifyToken } from "@/utils/auth";

export async function GET(req: NextRequest) {
    try {
        const token = getTokenFromRequest(req);
        // console.log()
        console.log(token)


        if (!token) {
            console.log("NOT TOKEN")
            return NextResponse.json(
                { error: "Authorization token not found" },
                { status: 401 }
            );
        }
        // console.log("JLJLJ")
        // console.log(token)
        const userId = verifyToken(token);
        // console.log(userId)
        if (!userId) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        const user = await prisma.user1.findUnique({
            where: { id: userId },
            include: {
                userprofile: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        // console.log(user)

        return NextResponse.json({
            fullName: user.userprofile?.fullName,
            contact: user.userprofile?.contact,
            email: user.email,
            age: user.userprofile?.age,
            gender: user.userprofile?.gender,
            birthdate: user.userprofile?.birthdate,
            previousMedicalHistory: user.userprofile?.previousMedicalHistory,
            familyHistory: user.userprofile?.familyHistory,
            addiction: user.userprofile?.addiction,
            address: user.userprofile?.address,
        }, {status: 200});
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json(
            { error: "Failed to fetch profile" },
            { status: 500 }
        );
    }
}
