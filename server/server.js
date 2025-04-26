import express from "express";
import morgan from "morgan";
// import swaggerUi from "swagger-ui-express";

// import "./config/envConfig";
import { errorHandler } from "./middlewares/errorHandler.js";
// import swaggerSpec from "./config/swagger";

import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { applySecurityMiddleware } from "./middlewares/security.js";

const app = express();

// Middleware
applySecurityMiddleware(app);
app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
// connectDB();

// Routes
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "System is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "System is running" });
});

// API Documentation
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.get("/docs.json", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(swaggerSpec);
// });

// Not found route
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Endpoint not found" });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error is ${err.message}`);
  process.exit(1);
});
