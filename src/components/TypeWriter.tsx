"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";
export function TypeWriter() {
    const words = [
        {
            text: "You Know the Symptoms",
        },
        {
            text: "We Know the Disease",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
            {/* <TypewriterEffect words={words} /> */}
        </div>
    );
}
