import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFetch from '@/hooks/useFetch';

function Slider() {
  const { data: movies = [], loading, error } = useFetch("trending/movie/week");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      handleSlide("right");
    }, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [movies, currentIndex]);

  const handleSlide = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "left") {
        return (prev - 1 + movies.length) % movies.length;
      } else {
        return (prev + 1) % movies.length;
      }
    });
  };

  const scrollLeft = () => handleSlide("left");
  const scrollRight = () => handleSlide("right");

  if (loading) return <div className="text-white text-2xl">Loading...</div>;
  if (error) return <div className="text-red-500 text-2xl">{error}</div>;
  if (!movies.length) return <div className="text-white text-2xl">No Movies Found</div>;

  const movie = movies[currentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10">
      <h2
        className="text-4xl font-extrabold mb-8 text-center tracking-wide"
        style={{
          fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
          color: "#e2e8f0",
          letterSpacing: "0.08em",
          textShadow: "0 2px 16px rgba(0,0,0,0.25)",
        }}
      >
        Now Trending in Theatres
      </h2>

      {/* Navigation Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-4 rounded-full hover:bg-blue-600 transition"
        aria-label="Previous"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-4 rounded-full hover:bg-blue-600 transition"
        aria-label="Next"
      >
        <ChevronRight size={32} />
      </button>

      {/* Movie Card */}
      <div className="flex justify-center items-center">
        <div
          className="relative w-[900px] h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#232526] to-[#414345] border-8 border-[#181818] transition-all duration-500"
          style={{
            boxShadow: "0 10px 60px 0 rgba(0,0,0,0.7)",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.85)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/10 p-8">
            <h3 className="text-white text-3xl font-bold mb-2 drop-shadow">{movie.title}</h3>
            <p className="text-gray-300 text-base mb-1">{movie.release_date}</p>
            <p className="text-yellow-400 text-xl font-semibold mb-2">⭐ {movie.vote_average}</p>
            <p className="text-gray-200 text-sm line-clamp-3">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-3">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-4 h-4 rounded-full border-2 border-blue-500 ${
              idx === currentIndex ? "bg-blue-500 scale-110" : "bg-gray-500/50"
            } transition`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;