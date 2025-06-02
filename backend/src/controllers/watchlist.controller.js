import Watchlist from "../models/watchlist.model.js";

const addWatchlist = async (req, res) => {
    const userId = req.user;
    const { movieId, title, poster, releaseDate } = req.body;

    console.log("Add to Watchlist request received:", { userId, movieId, title, poster, releaseDate });

    if (!userId) {
        console.log("User ID not found in request.");
        return res.status(401).json({
            message: "Unauthorized: User not found.",
            success: false
        });
    }

    if (!movieId || !title || !releaseDate) {
        console.log("Missing required fields:", { movieId, title, releaseDate });
        return res.status(400).json({
            message: "Movie ID, title, and release date are required.",
            success: false
        });
    }

    try {
        let watchlist = await Watchlist.findOne({ user: userId });
        console.log("Fetched watchlist for user:", watchlist);

        if (!watchlist) {
            console.log("No watchlist found, creating new watchlist for user:", userId);
            watchlist = new Watchlist({ user: userId, movies: [] });
        }

        // Use String() to ensure type consistency
        const alreadyExists = watchlist.movies.some(m => String(m.moviesId) === String(movieId));
        console.log("Movie already exists in watchlist:", alreadyExists);

        if (alreadyExists) {
            console.log("Duplicate movie detected, not adding:", movieId);
            return res.status(409).json({
                message: "Movie already exists in watchlist.",
                success: false
            });
        }

        watchlist.movies.push({
            moviesId: movieId,
            title,
            poster,
            releaseDate
        });
        console.log("Movie pushed to watchlist:", { movieId, title, poster, releaseDate });

        await watchlist.save();
        console.log("Watchlist saved for user:", userId);

        return res.status(201).json({
            message: "Movie added to watchlist successfully.",
            success: true
        });
    } catch (error) {
        console.log("Error in addWatchlist controller:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
const getWatchlist = async (req, res) => {
    const userId = req.user;
    console.log("Get Watchlist request received for user:", userId);
    try {
        const watchlist = await Watchlist.findOne({ user: userId });
        console.log("Fetched watchlist for user:", watchlist);

        // If no watchlist, return empty array
        if (!watchlist) {
            return res.status(200).json({
                message: "Watchlist fetched successfully.",
                movies: [],
                success: true
            });
        }

        // Return the movies array
        return res.status(200).json({
            message: "Watchlist fetched successfully.",
            movies: watchlist.movies,
            success: true
        });
    } catch (error) {
        console.log("Error in getWatchlist controller:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

const removeFromWatchlist = async (req,res)=>{
    const userId =req.user;
    const {movieId} = req.params;
    console.log("Remove from Watchlist request received for user:", userId, "Movie ID:", movieId);

    try {
        const watchlist = await Watchlist.findOne({ user: userId });
        console.log("Fetched watchlist for user:", watchlist);

        // If no watchlist, return empty array
        if (!watchlist) {
            return res.status(200).json({
                message: "Watchlist fetched successfully.",
                movies: [],
                success: true
            });
        }
        const updatedWatchlist = watchlist.movies.filter((movie) => movie.moviesId !== movieId);
        watchlist.movies = updatedWatchlist;
        await watchlist.save();
        return res.status(200).json({
            message: "Movie removed from watchlist successfully.",
            success: true
        });
    } catch (error) {
        console.log("Error in removeFromWatchlist controller:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

export { addWatchlist, getWatchlist, removeFromWatchlist };