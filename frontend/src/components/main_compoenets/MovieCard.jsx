import React from 'react'
import useFetch from '@/hooks/useFetch'

function MovieCard() {
    const { data: movies = [], loading, error } = useFetch("movie/popular");
    console.log(movies)

    if (loading) return <div className='text-white text-2xl'>Loading...</div>
    if (error) return <span className='text-red-800 font-serif pl-10 pr-10 mt-50 w-200 ml-auto mr-auto rounded-md p-4 flex justify-center items-center bg-white    text-2xl'>{error}</span>
    if (!movies || movies.length === 0) return <div className='text-white text-2xl'>No Movies Found</div>

    return (

        <div className='m-16'>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-12 mx-14 mt-16  ">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 group cursor-pointer"
                    >
                        {/* Poster */}
                        <div className="relative">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-56 object-cover"
                            />
                            {/* Watchlist icon */}
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button className="text-white text-xl bg-black/50 p-1 rounded-full hover:bg-black/70">
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




    )
}

export default MovieCard
