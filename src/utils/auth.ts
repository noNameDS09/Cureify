import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    return decoded.userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

export const getTokenFromRequest = (req: Request) => {
  const cookies = req.cookies;
  const token = cookies.get("access_token")?.value;

  if (!token) {
    const authHeader = req.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }
  }

  return token;
};


export const generateTokens = (userId: number) => {
    if (!userId) {
        throw new Error("userId is required to generate tokens");
    }

    const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};
