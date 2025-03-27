import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Left Side - Logo and Description */}
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-3xl font-semibold">Cureify</h1>
            <p className="text-gray-200 text-lg max-w-lg">
              Your AI-driven healthcare assistant. Bringing personalized medical advice and real-time support at your fingertips.
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-10">
            <div className="space-y-2">
              <h4 className="text-xl font-semibold">Company</h4>
              <ul className="space-y-1">
                <li><a href="/aboutus" className="hover:text-gray-300 transition">About Us</a></li>
                {/* <li><a href="/services" className="hover:text-gray-300 transition">Our Services</a></li> */}
                <li><a href="/contact" className="hover:text-gray-300 transition">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-semibold">Legal</h4>
              <ul className="space-y-1">
                <li><a href="/terms" className="hover:text-gray-300 transition">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-gray-300 transition">Privacy Policy</a></li>
                {/* <li><a href="/disclaimer" className="hover:text-gray-300 transition">Disclaimer</a></li> */}
              </ul>
            </div>
          </div>

          {/* Right Side - Social Icons */}
          <div className="flex space-x-6 justify-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-300 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-300 transition">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-300 transition">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-300 transition">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="mt-10 border-t border-gray-300 pt-4 text-center">
          <p className="text-sm text-gray-200">&copy; {new Date().getFullYear()} Cureify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
