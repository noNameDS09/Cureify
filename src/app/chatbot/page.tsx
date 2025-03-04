"use client";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";

const Chatbot = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [chat, setChat] = useState<any[]>([]);

    // Function to format messages with *italic* and **bold**
    const formatMessage = (text: string) => {
        return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>");
    };

    const handleSubmitText = async () => {
        if (!userInput.trim() && !image) return; // Prevent empty submission

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: userInput || "Image uploaded" },
            { sender: "bot", text: "" },  // Skeleton loader
        ]);

        setChat((prevChat) => [...prevChat, userInput]);
        setUserInput(""); // Clear user input field
        setIsLoading(true);

        const formData = new FormData();
        if (userInput.trim()) formData.append("prompt", userInput);
        if (image) formData.append("img", image);

        try {
            const response = await fetch("http://localhost:5001/process", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to process the request");

            const data = await response.json();
            setIsLoading(false);

            setMessages((prevMessages) => [
                ...prevMessages.slice(0, prevMessages.length - 1),  // Remove the skeleton loader
                { sender: "bot", text: formatMessage(data.result || "Here is the analysis for your query: ...") },
            ]);
            setImage(null); // Clear image after submission

        } catch (err) {
            console.error("Error during fetch:", err);
            setIsLoading(false);
            setError("An error occurred while processing the request");
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setMessages([
                ...messages,
                { sender: "user", text: "Image uploaded" },
                { sender: "bot", text: "Image uploaded successfully" },
            ]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-around w-full h-screen bg-blue-50 p-6 lg:flex-row">
            <img
                src="/svgs/doctor.svg"
                alt="doctor"
                className="relative z-10 w-[30rem] left-0 scale-x-[-1]"
            />
            <section className="w-screen w-4xl bg-white shadow-xl rounded-lg p-6">
                <header className="flex justify-between items-center pb-4">
                    <div>
                        <h2 className="text-lg font-bold text-blue-800/95">Medical Chatbot</h2>
                        <p className="text-sm text-gray-600">Your personal medical assistant</p>
                    </div>
                </header>

                <div className="h-[30rem] overflow-auto bg-gray-100 p-4 rounded-lg space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`rounded-lg p-3 py-1 max-w-[80%] ${msg.sender === "user" ? "bg-neutral-400 text-white" : "bg-gray-200"}`}
                            >
                                <p className={`${msg.sender === "user" ? "text-right" : "text-left"}`} dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="rounded-lg p-3 py-1 max-w-[80%] bg-gray-200 h-[40px] animate-pulse w-[70%]">
                                <div className="space-y-4">
                                    <div className="flex space-x-2 items-center">Analyzing...</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center mt-4 space-y-0">
                    <div className="flex w-full space-x-4">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Ask something..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button
                            onClick={handleSubmitText}
                            className={`bg-blue-500 text-white rounded-lg px-4 py-2 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                            Send
                        </button>
                    </div>

                    <div className="flex justify-center items-center gap-x-10">
                        <div className="text-zinc-700">
                            {isLoading ? <span className="text-blue-600">Analyzing...</span> : "Write a query and click send"}
                        </div>

                        <div className="flex flex-col items-center mt-0">
                            <label htmlFor="file-upload" className="cursor-pointer text-blue-500">
                                <FaCamera size={20} />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mt-2 hidden"
                            />
                        </div>

                        {image && (
                            <div className="mt-4 text-blue-800 flex justify-center items-center">
                                <p className="font-semibold">Preview:</p>
                                <div className="mt-2 w-[70px] h-[70px] rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt="Uploaded Image Preview"
                                        width={150}
                                        height={150}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}
            </section>
        </div>
    );
};

export default Chatbot;
