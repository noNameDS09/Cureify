'use client';

import { Poppins, Roboto } from "next/font/google";
import { useRouter } from "next/navigation";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});
const poppins = Poppins({
    weight: "300",
    subsets: ["latin-ext"],
});

const FeaturesSection = () => {
    const router = useRouter();
    return (
        <div className="py-20 px-8 sm:px-16 bg-blue-50 text-gray-900">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className={`${roboto.className} text-4xl font-semibold text-blue-600 mb-10`}>
                    How Cureify Helps
                </h2>
                <div className="parent grid grid-cols-9 grid-rows-3 gap-3">
                    {/* Feature 1 */}
                    <div
                        className="div1 bg-blue-100 p-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-200 transition-all duration-300 flex flex-col justify-center items-center"
                        style={{ gridArea: '1 / 1 / 2 / 5' }}
                    >
                        <h3 className={`${roboto.className} text-xl font-semibold text-blue-600 mb-2`}>24/7 Access to Medical Assistance</h3>
                        <p className={`${poppins.className} text-md text-gray-700 mb-2`}>
                            AI-powered platforms can provide immediate healthcare advice and consultations, regardless of time.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div
                        className="div2 bg-blue-100 p-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-200 transition-all duration-300 flex flex-col justify-center items-center"
                        style={{ gridArea: '1 / 5 / 3 / 7' }}
                    >
                        <h3 className={`${roboto.className} text-xl font-semibold text-blue-600 mb-2`}>Seamless User Interaction</h3>
                        <p className={`${poppins.className} text-md text-gray-700 mb-4`}>
                            AI-driven chatbots and conversational interfaces enable easy and accessible communication with Users.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div
                        className="div3 bg-blue-100 p-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-200 transition-all duration-300 flex flex-col justify-center items-center"
                        style={{ gridArea: '1 / 7 / 2 / 10' }}
                    >
                        <h3 className={`${roboto.className} text-xl font-semibold text-blue-600 mb-2`}>Personalized Health Guidance</h3>
                        <p className={`${poppins.className} text-md text-gray-700 mb-4`}>
                            AI can offer customized wellness, fitness, and nutrition recommendations based on individual needs and data.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div
                        className="div4 bg-blue-100 p-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-200 transition-all duration-300 flex flex-col justify-center items-center"
                        style={{ gridArea: '2 / 8 / 4 / 10' }}
                    >
                        <h3 className={`${roboto.className} text-xl font-semibold text-blue-600 mb-2`}>Real-Time Medical Information</h3>
                        <p className={`${poppins.className} text-md text-gray-700 mb-4`}>
                            AI can instantly access and provide up-to-date medical knowledge, drug interactions, and treatment options, ensuring reliability.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div
                        className="div5 bg-blue-100 p-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-200 transition-all duration-300 flex flex-col justify-center items-center"
                        style={{ gridArea: '2 / 7 / 4 / 8' }}
                    >
                        <h3 className={`${roboto.className} text-xl font-semibold text-blue-600 mb-2`}>AI Precision for Medical Imaging</h3>
                        <p className={`${poppins.className} text-md text-gray-700 mb-4`}>
                            Analyzes X-rays, MRIs, skin conditions, and more with AI-powered precision.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div
                        className="div6 bg-blue-100 p-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-200 transition-all duration-300 flex flex-col justify-center items-center"
                        style={{ gridArea: '2 / 1 / 4 / 2' }}
                    >
                        <h3 className={`${roboto.className} text-xl font-semibold text-blue-600 mb-2`}>Intelligent Follow-Up Questions</h3>
                        <p className={`${poppins.className} text-md text-gray-700 mb-4`}>
                            Doesn’t rely on single inputs—asks follow-up questions to refine results.
                        </p>
                    </div>

                    {/* Feature 7 */}
                    <div
                        className="div7 bg-blue-100 p-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-200 transition-all duration-300 flex flex-col justify-center items-center"
                        style={{ gridArea: '2 / 2 / 3 / 5' }}
                    >
                        <h3 className={`${roboto.className} text-xl font-semibold text-blue-600 mb-2`}>Multilingual Support</h3>
                        <p className={`${poppins.className} text-md text-gray-700 mb-4`}>
                            Breaks language barriers—assists doctors and patients in multiple languages.
                        </p>
                    </div>

                    {/* Feature 8 */}
                    <div
                        className="div8 bg-blue-100 p-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-200 transition-all duration-300 flex flex-col justify-center items-center"
                        style={{ gridArea: '3 / 2 / 4 / 7' }}
                    >
                        <h3 className={`${roboto.className} text-xl font-semibold text-blue-600 mb-2`}>Disease Diagnosis Adaptability</h3>
                        <p className={`${poppins.className} text-md text-gray-700 mb-4`}>
                            Adaptable for diagnosing various diseases, including neurological and dermatological conditions.
                        </p>
                    </div>

                    {/* Empty Grid Item to fill empty space */}
                    <div className="div9 bg-transparent"></div>
                </div>

                {/* Learn More Button at the bottom */}
                <div className="mt-12 flex justify-center">
                    <a
                        // href="/features"
                        onClick={()=> router.push('/aboutus')}
                        className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold transition duration-300 hover:bg-blue-700 hover:cursor-pointer"
                    >
                        Learn More About Our Service
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;
