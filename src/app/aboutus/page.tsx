'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const LearnMore = () => {
  const router = useRouter();
  return (
    <section className="py-20 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-gray-900">
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        <h2 className="text-4xl font-semibold text-center text-blue-700 mb-12">
          Discover How Cureify Revolutionizes Healthcare
        </h2>

        {/* Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-lg leading-relaxed text-gray-700">
            Cureify is a pioneering digital health solution designed to revolutionize the way individuals assess and manage their health. By harnessing the power of artificial intelligence, natural language processing, and computer vision, Cureify offers a comprehensive diagnostic experience that caters to diverse user inputs—text and images. This multi-modal approach enables the platform to ask insightful follow-up questions, accurately interpret symptoms, and suggest personalized health recommendations, making healthcare more accessible and proactive.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Multi-Modal Input Handling</h3>
            <p className="text-gray-700">
              Users can interact with Cureify via text or by uploading images (such as photos of rashes, x-rays, or medication labels). Each input mode is processed by specialized agents to extract and analyze relevant health information.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Symptom Analysis and Follow-Up</h3>
            <p className="text-gray-700">
              The system employs advanced NLP techniques to parse user-reported symptoms, prompting additional queries when necessary to ensure a comprehensive understanding of the user's condition.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Image Processing Capabilities</h3>
            <p className="text-gray-700">
              With integrated computer vision models, Cureify can interpret medical images—classifying skin conditions, analyzing x-rays, and extracting text from medicine labels—to further refine its diagnostic suggestions.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 bg-white rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Medical Knowledge Integration</h3>
            <p className="text-gray-700">
              Supported by a fine-tuned medical dataset and continuously updated medical resources, the platform provides validated insights and recommendations, enhancing diagnostic accuracy and reliability.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 bg-white rounded-xl shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Remote and Intuitive Accessibility</h3>
            <p className="text-gray-700">
              Accessible via a web interface, Cureify offers users the flexibility to monitor their health and receive diagnostic feedback conveniently from any location with internet access.
            </p>
          </div>
        </div>

        {/* Impact and Benefits */}
        <div className="bg-blue-50 py-12 px-8 sm:px-16 rounded-xl mb-16">
          <h3 className="text-2xl font-semibold text-center text-blue-700 mb-8">
            Impact and Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <h4 className="text-lg font-semibold text-blue-600 mb-4">Enhanced Healthcare Accessibility</h4>
              <p className="text-gray-700">
                By offering a user-friendly web interface and intelligent diagnostic tools, Cureify empowers individuals to take control of their health, potentially reducing unnecessary visits to healthcare providers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-xl">
              <h4 className="text-lg font-semibold text-blue-600 mb-4">Improved Diagnostic Accuracy</h4>
              <p className="text-gray-700">
                The combination of text and image analysis ensures a more thorough evaluation of symptoms, leading to more precise and personalized health insights.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-xl">
              <h4 className="text-lg font-semibold text-blue-600 mb-4">Cost Efficiency</h4>
              <p className="text-gray-700">
                With its ability to provide immediate, on-demand diagnostic support, Cureify helps reduce the burden on traditional healthcare systems and minimizes out-of-pocket expenses for users.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-xl">
              <h4 className="text-lg font-semibold text-blue-600 mb-4">Proactive Health Management</h4>
              <p className="text-gray-700">
                Real-time feedback and tailored recommendations encourage users to adopt healthier lifestyles and make informed decisions about their well-being.
              </p>
            </div>
          </div>
        </div>

        {/* Innovation and Technology */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6">
            Innovation and Technology
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
            Cureify leverages the latest advancements in AI and IoT to deliver a next-generation health diagnostic experience. Its modular architecture includes dedicated agents for text analysis, image processing, and general medical inquiries, ensuring that each aspect of the user input is meticulously handled. Continuous learning from a vast repository of medical data and iterative improvements in its machine learning algorithms enable Cureify to evolve alongside emerging medical knowledge and technologies.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <a
            // href="#"
            onClick={()=> router.push('https://huggingface.co/spaces/AJ-ayushjha/Cureify')}
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold transition duration-300 hover:bg-blue-700"
          >
            Start Using Cureify Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
