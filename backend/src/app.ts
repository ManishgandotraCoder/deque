import express from "express";
import cors from "cors";
import { routes } from "./routes/route";

const app = express();
const port = 2000;

// Use CORS middleware with configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow cookies and credentials
    methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type, authorization",
  })
);

// Add routes after middleware
app.use("/api", routes);

// Start the server
app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
});
