"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function CustomerFeedbackScrolling() {
    return (
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            {/* Heading Section */}
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                What Our Customers Are Saying
            </h2>
            
            {/* Infinite Moving Cards Component */}
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
    );
}

const testimonials = [
    {
        quote: "Cureify has completely changed how I approach my health. The AI-driven insights helped me take proactive steps toward improving my wellness, and the chat interface made it so easy to use!",
        name: "Jane Doe",
        title: "Satisfied Customer",
    },
    {
        quote: "I love how Cureify gives personalized health recommendations based on my unique data. It’s like having a personal health assistant at my fingertips, available whenever I need it!",
        name: "John Smith",
        title: "Long-Time User",
    },
    {
        quote: "The real-time medical assistance and symptom checker have been a lifesaver for me. I can quickly get medical information and feel confident about my health choices.",
        name: "Emily Johnson",
        title: "Health Enthusiast",
    },
    {
        quote: "I’ve been using Cureify for a few months now, and I’m impressed with how well it adapts to my health needs. It even provided tips on improving my fitness routine!",
        name: "Michael Davis",
        title: "Fitness Focused",
    },
    {
        quote: "Cureify’s integration of AI and medical knowledge is a game-changer. I can trust the information I get and make informed decisions about my health every day.",
        name: "Sarah Lee",
        title: "Healthcare Advocate",
    },
];
