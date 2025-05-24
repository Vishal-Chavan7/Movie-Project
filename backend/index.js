import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/utils/db.js";

// Importing routes
import router from "./src/routes/user.route.js";



dotenv.config("./config.env");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type, Authorization",
  })
);

const PORT = process.env.PORT || 3000;

app.get("/vishal", (req, res) => {
  res.send("Vishal is a Software Engineer");
});

app.use("/api/v1/users", router)

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
