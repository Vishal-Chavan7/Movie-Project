import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Apple, Smartphone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#181818] text-gray-300 pt-12 pb-8 mt-16 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-10 pb-10 border-b border-gray-700">
          {/* Social */}
          <div>
            <h3
              className="text-2xl font-bold mb-3 tracking-wide"
              style={{ fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif", letterSpacing: "0.04em" }}
            >
              Follow Cinematic on social
            </h3>
            <div className="flex gap-6 text-3xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><Facebook size={32} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><Twitter size={32} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition"><Instagram size={32} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition"><Youtube size={32} /></a>
            </div>
          </div>
          {/* App Links */}
          <div>
            <h3
              className="text-2xl font-bold mb-3 tracking-wide"
              style={{ fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif", letterSpacing: "0.04em" }}
            >
              Get the Cinematic app
            </h3>
            <div className="flex gap-6 text-2xl">
              <a href="#" className="flex items-center gap-2 hover:text-green-400 transition">
                <Smartphone size={26} /> <span className="text-lg" style={{ fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif" }}>Android</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-gray-200 transition">
                <Apple size={26} /> <span className="text-lg" style={{ fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif" }}>iOS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Links Row */}
        <div
          className="flex flex-wrap gap-8 justify-center md:justify-between py-8 text-lg font-medium"
          style={{ fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif" }}
        >
          <a href="#" className="hover:text-white transition">Help</a>
          <a href="#" className="hover:text-white transition">Site Index</a>
          <a href="#" className="hover:text-white transition">CinematicPro</a>
          <a href="#" className="hover:text-white transition">Box Office Mojo</a>
          <a href="#" className="hover:text-white transition">License Cinematic Data</a>
          <a href="#" className="hover:text-white transition">Press Room</a>
          <a href="#" className="hover:text-white transition">Advertising</a>
          <a href="#" className="hover:text-white transition">Jobs</a>
          <a href="#" className="hover:text-white transition">Conditions of Use</a>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Your Ads Privacy Choices</a>
        </div>

        {/* Bottom Row */}
        <div
          className="flex flex-col md:flex-row md:justify-between items-center border-t border-gray-700 pt-8 text-base text-gray-500"
          style={{ fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif" }}
        >
          <span className='hover:text-white transition'>© 1990-2025 by Cinematic.com, Inc.</span>
          <span className="hover:text-white transition mt-2 md:mt-0">This site is a demo and not affiliated to any Webiste.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;