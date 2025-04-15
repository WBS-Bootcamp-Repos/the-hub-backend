import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import { connectDB } from "./db/index.js";
import setupSocket from "./controllers/socket.js";

// Routes
import messageRoutes from "./routes/messageRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import eventAttendeeRoutes from "./routes/eventAttendeeRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import communityEventRoutes from "./routes/communityEventRoutes.js";
import communityEventAttendeeRoutes from "./routes/communityEventAttendeeRoutes.js";
import communityPostRoutes from "./routes/communityPostRoutes.js";
import communityListRoutes from "./routes/communityListRoutes.js";
import communityListItemRoutes from "./routes/communityListItemRoutes.js";
import communityMessageRoutes from "./routes/communityMessageRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Base route
app.get("/api/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/login", registerRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/eventattendees", eventAttendeeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/upload", uploadRoutes);

// Community specific routes
app.use("/api/communities/:communityId/events", communityEventRoutes);
app.use(
  "/api/communities/:communityId/events/:eventId/attendees",
  communityEventAttendeeRoutes
);
app.use("/api/communities/:communityId/posts", communityPostRoutes);
app.use("/api/communities/:communityId/lists", communityListRoutes);
app.use(
  "/api/communities/:communityId/lists/:listId/items",
  communityListItemRoutes
);
app.use("/api/communities/:communityId/messages", communityMessageRoutes);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// HTTP server from Express
const server = http.createServer(app);

// Attach Socket.IO
const io = new Server(server, {
  pingTimeout: 5000,
  pingInterval: 2000,
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});
setupSocket(io);

// Start everything
const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  });
};

startServer();
