import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTokenFromRequest, verifyToken } from "@/utils/auth";

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
// console.log()
    if (!token) {
      return NextResponse.json({ error: "Authorization token not found" }, { status: 401 });
    }
    
    const userId = verifyToken(token);

    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userprofile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
