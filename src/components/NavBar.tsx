"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import axios from "axios";

export function NavBar() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-0" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const router = useRouter();

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get("/api/users/profile");  // Check login status
                if (response.status === 200) {
                    setLogged(true);
                }
            } catch (error) {
                setLogged(false);  // If there's an error, assume the user is not logged in
            }
        };

        checkLoginStatus();
    }, []); // Empty array ensures this runs only once when the component mounts

    return (
        <div className={cn("fixed top-0 left-0 right-0 z-50", className)}>
            <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-8 backdrop-blur-lg flex items-center justify-between rounded-b-lg shadow-md">
                {/* Logo */}
                <div className="hover:cursor-pointer max-h-5 flex items-center justify-center" onClick={() => router.push("/")}>
                    <span className="text-white">
                        <Logo />
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-grow justify-center space-x-12 -ml-40">
                    <HoveredLink href="/" className="text-white hover:text-gray-300 transition duration-300">
                        Home
                    </HoveredLink>
                    <HoveredLink href="/aboutus" className="text-white hover:text-gray-300 transition duration-300">
                        About Us
                    </HoveredLink>
                    <HoveredLink href="https://cureifyy.streamlit.app/" className="text-white hover:text-gray-300 transition duration-300">
                        ChatBot
                    </HoveredLink>
                </div>

                {/* Login Button */}
                <div>
                    <HoveredLink
                        href={logged ? "/profile" : "/login"} // Conditional redirect based on logged-in state
                        className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-6 rounded-lg transition duration-300"
                    >
                        {logged ? "Profile" : "Login"}
                    </HoveredLink>
                </div>
            </div>
        </div>
    );
}
