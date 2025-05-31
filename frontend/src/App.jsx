
import Footer from "./components/main_compoenets/Footer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import React from 'react'
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Watchlist from './pages/Watchlist';
import Navbar from "./components/main_compoenets/Navbar"
function App() {
  return (

    <>

      <Router>
        <div className="bg-black text-white min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>


  )
}

export default App
