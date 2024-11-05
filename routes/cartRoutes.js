import express from "express";
import {
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", auth, addToCart);
router.put("/:productId", auth, updateCartItem);
router.delete("/:productId", auth, removeFromCart);

export default router;
