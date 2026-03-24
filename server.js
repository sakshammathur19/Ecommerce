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

import { requireSignIn } from "./middlewares/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* =========================
   API ROUTES (NO STATIC ISSUE)
========================= */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

/* ONLY PROTECTED ROUTES */
app.use("/api/v1/protected", requireSignIn, (req, res) => {
  res.send("Protected route working");
});

/* =========================
   FRONTEND STATIC FILES
========================= */
app.use(express.static(join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});