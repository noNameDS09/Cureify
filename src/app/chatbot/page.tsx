"use client";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { BsFileMedical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Chatbot = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmitText = async () => {
        if (userInput.trim()) {
            setMessages([
                ...messages,
                { sender: "user", text: userInput },
                { sender: "bot", text: "Analyzing your query..." },
            ]);
            setUserInput("");

            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        sender: "bot",
                        text: "Here is the analysis for your query: ...",
                    },
                ]);
            }, 2000);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setMessages([
                ...messages,
                { sender: "user", text: "Image uploaded" },
                { sender: "bot", text: "Analyzing the image..." },
            ]);

            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        sender: "bot",
                        text: "Here is the analysis for your image: ...",
                    },
                ]);
            }, 3000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-around w-full h-screen bg-blue-50 p-6 -z-20 lg:flex-row">
            <img
                src="/svgs/doctor.svg"
                alt="doctor"
                className="relative z-10 w-[30rem] left-0 scale-x-[-1]"
            />
            <section className="w-screen w-4xl bg-white shadow-xl rounded-lg p-6 ">
                <header className="flex justify-between items-center pb-4">
                    <div>
                        <h2 className="text-lg font-bold text-blue-800/95">
                            Medical Chatbot
                        </h2>
                        <p className="text-sm text-gray-600">
                            Your personal medical assistant
                        </p>
                    </div>
                    <div className="flex items-center">
                        <BsFileMedical size={24} color="#1E40AF" />
                        <span className="ml-2 text-blue-800/95">
                            Age: 34 | Gender: Male
                        </span>
                    </div>
                </header>

                {/* Chat Messages */}
                <div className="h-[30rem] overflow-auto bg-gray-100 p-4 rounded-lg space-y-4 scroll_">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${
                                msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`rounded-lg p-3 py-1 max-w-xs ${
                                    msg.sender === "user"
                                        ? "bg-neutral-400 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                {msg.sender === "user" ? (
                                    <p className="text-right">{msg.text}</p>
                                ) : (
                                    <p className="text-left">{msg.text}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center space-y-4 mt-4">
                    <div className="flex space-x-4 w-full">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ask something..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button
                            onClick={handleSubmitText}
                            className={`bg-blue-500 text-white rounded-lg px-4 py-2 ${
                                isLoading
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}
                        >
                            Send
                        </button>
                    </div>
                    <div className="flex gap-x-10 justify-center items-center">
                        <div className="mt-0 text-zinc-700 h-5">
                            {isLoading ? (
                                <span className="text-blue-600">Analysing</span>
                            ) : (
                                "Write a query and click send"
                            )}
                        </div>
                        <div className="mt-0 flex flex-col items-center">
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2 text-blue-500 border-blue-500"
                            >
                                <FaCamera size={20} />
                                <span>Upload Medical Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </Button>

                            {image && (
                                <div className="mt-4 text-blue-800">
                                    <p>Uploaded Image Preview:</p>
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt="Uploaded Image Preview"
                                        width={100}
                                        height={100}
                                        className="rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Chatbot;
