import express from "express"
import { userRegistration, verifyEmail, login} from "../controllers/userRegistration.controller.js";



const router = express.Router();


router.post("/register", userRegistration);
router.get("/verify/:token", verifyEmail)
router.post("/login", login);

export default router;