import express from "express"
import { userRegistration } from "../controllers/userRegistration.controller.js";

const router = express.Router();


router.post("/register", userRegistration);

export default router;