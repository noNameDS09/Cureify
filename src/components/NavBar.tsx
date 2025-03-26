"use client";
import React, { useState } from "react";
import { HoveredLink } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavBar() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-0" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className={cn("fixed top-10 mx-auto z-50", className)}>
            <div className="relative rounded-none border border-transparent dark:bg-black dark:border-white/[0.2] bg-blue-700/70 text-white backdrop-blur-lg flex items-center justify-between space-x-4 px-16 mx-auto py-4 w-screen">
                <div>Cureify</div>
                <div className="flex space-x-10">
                    <HoveredLink href="/" className={`text-white hover:text-gray-700`}>
                        Home
                    </HoveredLink>
                    <HoveredLink href="/chatbot" className="text-white">ChatBot</HoveredLink>
                </div>
                <div>
                    <HoveredLink href="/login">Login</HoveredLink>
                </div>
            </div>
        </div>
    );
}
