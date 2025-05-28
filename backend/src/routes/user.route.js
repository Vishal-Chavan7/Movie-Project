import express from "express"
import { userRegistration, verifyEmail, login, logout} from "../controllers/userRegistration.controller.js";



const router = express.Router();


router.post("/register", userRegistration);
router.get("/verify/:token", verifyEmail)
router.post("/login", login);
router.post("/logout", logout);


export default router;