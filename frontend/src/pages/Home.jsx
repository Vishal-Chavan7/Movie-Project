import MovieCard from "@/components/main_compoenets/MovieCard";
import Navbar from "../components/main_compoenets/Navbar";


import React from 'react'
import Slider from "@/components/main_compoenets/Slider";

function home() {
    return (
        <>
            <Slider />
            <div className=" ">
                <MovieCard />
            </div>


        </>
    )
}

export default home
