import express from "express"
import { getProducts, createPost, updateproduct, deleteproduct, getProduct } from "../controllers/products.js"
const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", createPost)
router.patch('/:id', updateproduct)
router.delete('/:id', deleteproduct)


export default router;