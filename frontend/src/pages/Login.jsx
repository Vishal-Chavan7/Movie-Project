import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/updateState.js";
function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const handleChange = (e) =>{
    setFormData(prev => ({...prev, [e.target.id]: e.target.value}))
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try{
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/login`, formData);
      setMessage(res.data.message || "Login successful!");
      setSuccess(true);
      setFormData({ email: "", password: "" });
      setLoggedIn(true);
    }catch(err){
      setMessage(err.response?.data?.message || "Login failed.");
      setSuccess(false);
    }
  }
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form 
      onSubmit={handleSubmit}
      className="bg-[#111] text-white w-full max-w-sm p-8 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 bg-[#1c1c1e] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-[#1c1c1e] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <div className={`mt-4 text-sm ${success ? "text-green-500" : "text-red-500"}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
