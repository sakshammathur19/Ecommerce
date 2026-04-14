import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  categoryController,
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

// GET ALL
router.get("/get-category", categoryControlller);

// SINGLE
router.get("/single-category/:slug", singleCategoryController);

export default router;
