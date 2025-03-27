"use client";
import React, { useState } from "react";
import { HoveredLink } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function NavBar() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-0" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const router = useRouter()
    return (
        <div className={cn("fixed top-0 left-0 right-0 z-50", className)}>
            <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-8 backdrop-blur-lg flex items-center justify-between rounded-b-lg shadow-md">
                {/* Logo */}
                <div className="text-2xl font-bold hover:cursor-pointer"
                    onClick={()=>router.push('/')}
                >
                    <span className="text-white">Cureify</span>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-12">
                    <HoveredLink href="/" className="text-white hover:text-gray-300 transition duration-300">
                        Home
                    </HoveredLink>
                    <HoveredLink href="/aboutus" className="text-white hover:text-gray-300 transition duration-300">
                        About Us
                    </HoveredLink>
                    <HoveredLink
                        // onClick={()=> router.push('https://huggingface.co/spaces/AJ-ayushjha/Cureify')}
                        href="https://huggingface.co/spaces/AJ-ayushjha/Cureify"
                        className="text-white hover:text-gray-300 transition duration-300"
                    >
                        ChatBot
                    </HoveredLink>
                </div>

                {/* Login Button */}
                <div>
                    <HoveredLink
                        href="/login"
                        className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-6 rounded-lg transition duration-300"
                    >
                        Login
                    </HoveredLink>
                </div>
            </div>
        </div>
    );
}
