import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  categoryController, // ✅ correct name
  singleCategoryController,
} from "../controllers/categoryController.js";

import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// CREATE
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController,
);

// UPDATE
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController,
);

// DELETE
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController,
);

// ✅ FIXED HERE
router.get("/get-category", categoryController);

// SINGLE
router.get("/single-category/:slug", singleCategoryController);

export default router;
