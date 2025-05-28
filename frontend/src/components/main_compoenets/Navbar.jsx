import React from 'react';
import useAuthStore from "../../store/updateState.js";
import {
  Search,
  CircleFadingPlus,
  UserCircle,
  LogIn,
  LogOut,
  SquareMenu,
} from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const isRegistered = useAuthStore((state) => state.isRegistered);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#1F1F1F] text-white flex flex-wrap md:flex-nowrap justify-between items-center px-4 sm:px-6 lg:px-20 py-4 gap-4">

      <div className="text-2xl font-bold">
        <Link to="/" className="text-white hover:text-gray-200 transition">
          <span className="text-3xl font-bold ">Cinematic</span>
        </Link>
      </div>

      <div className="md:flex">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white text-md font-medium transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <SquareMenu className="w-4 h-4" />
          Menu
        </a>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movie"
            className="w-full pr-10 pl-4 py-2 rounded-md text-black font-serif bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all duration-200 text-sm md:text-base"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 w-5 h-5" />
        </div>
      </div>

      <ul className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-end">
        <li>
          <Link
            to="/watchlist/1"
            className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white text-sm md:text-md font-medium transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <CircleFadingPlus className="w-4 h-4" />
            Watchlist
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white text-sm md:text-md font-medium transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <UserCircle className="w-4 h-4" />
            Profile
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white text-sm md:text-md font-medium transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          ) : !isRegistered ? (
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white text-sm md:text-md font-medium transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <LogIn className="w-4 h-4" />
              Sign Up
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white text-sm md:text-md font-medium transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;