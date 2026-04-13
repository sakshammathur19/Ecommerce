import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryroutes.js";
import productRoutes from "./routes/productRoutes.js";
import { requireSignIn } from "./middlewares/authMiddleware.js";

dotenv.config();
connectDB();

const app = express();

/* =========================
   CORS CONFIG (PRODUCTION SAFE)
========================= */
app.use(
  cors({
    origin: ["https://ecommerce-lake-nine-89.vercel.app"],
    credentials: true,
  }),
);

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());
app.use(morgan("dev"));

/* =========================
   API ROUTES
========================= */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

/* =========================
   PROTECTED ROUTE
========================= */
app.use("/api/v1/protected", requireSignIn, (req, res) => {
  res.send("Protected route working");
});

/* =========================
   HEALTH CHECK ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white,
  );
});
