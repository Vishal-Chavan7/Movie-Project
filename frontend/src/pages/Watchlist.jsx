import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch watchlist movies on mount
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/movielist`, { withCredentials: true });
        setMovies(res.data.movies || []);
      } catch (err) {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/movielist/${movieId}`, { withCredentials: true });
      setMovies((prevMovies) => prevMovies.filter(movie => movie.moviesId !== movieId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Your Watchlist</h1>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="text-gray-400">Your watchlist is empty. Add some movies!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.moviesId}
              className="bg-[#222] rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={
                  movie.poster
                    ? movie.poster.startsWith("http")
                      ? movie.poster
                      : `https://image.tmdb.org/t/p/w500${movie.poster}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-yellow-300 mb-2">{movie.title}</h2>
                <button
                  className="mt-auto bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded transition"
                  onClick={() => handleRemove(movie.moviesId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;