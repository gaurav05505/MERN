import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import searchRoute from "./routes/search.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Web Search Backend is running"
    });
});

app.use("/api", searchRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});