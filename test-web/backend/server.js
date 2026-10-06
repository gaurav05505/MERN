import "dotenv/config";
import express from "express";
import cors from "cors";

import searchRoute from "./routes/search.routes.js";
import youtubeRoute from "./routes/youtube.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Web Search Backend is running"
    });
});

app.use("/api", searchRoute);
app.use("/api", youtubeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});