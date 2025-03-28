import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is running...");
});

const startServer = async () => {
    // await connectDB();
    app.listen(PORT, () =>
        console.log(
            `server running on port ${PORT} ->  http://localhost:${PORT}/`
        )
    );
};

startServer();
