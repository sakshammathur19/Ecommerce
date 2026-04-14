import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryController,
  singleCategoryController,
} from "../controllers/categoryController.js";

import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* =========================
   CREATE CATEGORY
========================= */
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

/* =========================
   UPDATE CATEGORY
========================= */
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

/* =========================
   DELETE CATEGORY
========================= */
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

/* =========================
   GET ALL CATEGORY
========================= */
router.get("/get-category", getCategoryController);

/* =========================
   SINGLE CATEGORY
========================= */
router.get("/single-category/:slug", singleCategoryController);

export default router;