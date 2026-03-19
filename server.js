import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryroutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve React build only in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "./client/build/index.html"));
  });
}

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});