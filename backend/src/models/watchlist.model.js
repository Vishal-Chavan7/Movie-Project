import {Schema, model} from 'mongoose';

const wathchlistSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movies: [{
        moviesId: { type: String, required: true },
        title: { type: String, required: true},
        poster: { type: String },
        releaseDate: { type: String, required: true },
    }]
    
},{timestamps: true})

const Watchlist =  model("Watchlist", wathchlistSchema);
export default Watchlist;