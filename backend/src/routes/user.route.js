import express from "express"
import { userRegistration, verifyEmail } from "../controllers/userRegistration.controller.js";



const router = express.Router();


router.post("/register", userRegistration);
router.get("/verify/:token", verifyEmail)

export default router;