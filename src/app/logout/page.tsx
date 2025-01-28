"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch("/api/users/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    console.log("User logged out successfully");
                    setTimeout(()=>{
                        router.push("/");
                    }, 1000);
                } else {
                    console.error("Logout failed");
                }
            } catch (error) {
                console.error("An error occurred while logging out", error);
            }
        };

        logout();
    }, [router]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-semibold">Logging you out...</h1>
                <p className="mt-4">You will be redirected shortly.</p>
            </div>
        </div>
    );
};

export default LogoutPage;
