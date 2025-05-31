import express from "express"
import { userRegistration, verifyEmail, login, logout} from "../controllers/userRegistration.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addWatchlist } from "../controllers/watchlist.controller.js";



const router = express.Router();


router.post("/register", userRegistration);
router.get("/verify/:token", verifyEmail)
router.post("/login", login);
router.post("/logout", logout);
// router.get("/watchlist", authMiddleware, addWatchlist)
router.post("/watchlist", addWatchlist)



export default router;