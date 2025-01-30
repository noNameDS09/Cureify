import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";

export async function POST(req: NextRequest) {
    try {
        const { refreshToken } = await req.json();

        if (!refreshToken) {
            return NextResponse.json(
                { error: "Refresh token is required" },
                { status: 400 }
            );
        }
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        } catch (error) {
            return NextResponse.json(
                { error: "Invalid or expired refresh token" },
                { status: 400 }
            );
        }

        const userId = (decoded as any).userId;

        if (!userId) {
            return NextResponse.json(
                { error: "Invalid refresh token payload" },
                { status: 400 }
            );
        }

        const newAccessToken = jwt.sign({ userId }, JWT_SECRET, {
            expiresIn: "1h",
        });

        return NextResponse.json(
            { accessToken: newAccessToken },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error occurred during token refresh:", error);
        return NextResponse.json(
            { error: "Failed to refresh token" },
            { status: 500 }
        );
    }
}
