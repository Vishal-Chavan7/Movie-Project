import React, { useEffect, useState } from 'react';
import useAuthStore from "../../store/updateState.js";
import { useNavigate } from "react-router-dom";
import {useSearchStore} from "../../store/updateState.js";
import axios from "axios";

function MovieCard() {
    const searchQuery = useSearchStore((state) => state.searchQuery);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                let endpoint = "";
                if (searchQuery && searchQuery.trim() !== "") {
                    endpoint = `search/movie`;
                } else {
                    endpoint = `movie/popular`;
                }
                const url = `${import.meta.env.VITE_API_URL}/${endpoint}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US${searchQuery && searchQuery.trim() !== "" ? `&query=${encodeURIComponent(searchQuery)}` : ""}`;
                const res = await axios.get(url);
                setMovies(res.data.results || []);
            } catch (err) {
                setError("Failed to fetch movies.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [searchQuery]);

    const handleAddToWatchlist = async (movie) => {
        if (!isLoggedIn) {
            alert("Please login to add movies to your watchlist.");
            navigate("/login");
            return;
        }
        try {
            const payload = {
                movieId: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                releaseDate: movie.release_date
            };
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_API_URL}/movielist`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload)
                }
            );
            const data = await response.json();
            if (response.ok && data.success) {
                alert('Movie added to backend watchlist successfully!');
            } else {
                alert('The movie is already in your watchlist.');
            }
        } catch (error) {
            alert('Failed to add movie to backend watchlist. Please try again.');
        }
    };

    if (loading) {
        return <div className='text-white text-2xl'>Loading...</div>;
    }
    if (error) {
        return (
            <span className='text-red-800 font-serif pl-10 pr-10 mt-50 w-200 ml-auto mr-auto rounded-md p-4 flex justify-center items-center bg-white text-2xl'>
                {error}
            </span>
        );
    }
    if (!movies || movies.length === 0) {
        return <div className='text-white text-2xl'>No Movies Found</div>;
    }

    return (
        <div className='m-16'>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-12 mx-14 mt-16">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 group cursor-pointer"
                    >
                        {/* Poster */}
                        <div className="relative">
                            <img
                                src={movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : "https://via.placeholder.com/300x450?text=No+Image"}
                                alt={movie.title}
                                className="w-full h-56 object-cover"
                            />
                            {/* Watchlist icon */}
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button
                                    className="text-white text-xl bg-black/50 p-1 rounded-full hover:bg-black/70"
                                    onClick={() => handleAddToWatchlist(movie)}
                                    title={isLoggedIn ? "Add to Watchlist" : "Login to add"}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Movie Info */}
                        <div className="p-3 text-white space-y-1">
                            {/* Rating */}
                            <div className="flex items-center space-x-1 text-sm">
                                <span className="text-yellow-400">★</span>
                                <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
                                <span className="ml-1 text-gray-400">☆</span>
                            </div>

                            {/* Title */}
                            <h2 className="text-sm font-semibold leading-tight line-clamp-2">
                                {movie.title}
                            </h2>

                            {/* Buttons */}
                            <div className="flex flex-col gap-2 pt-2 text-xs font-medium">
                                <button className="bg-[#2e2e2e] hover:bg-blue-600 text-white px-3 py-1.5 rounded-full transition text-center">
                                    Watch options
                                </button>
                                <button className="flex items-center justify-center gap-1 text-white">
                                    <span>▶</span>
                                    Trailer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieCard;