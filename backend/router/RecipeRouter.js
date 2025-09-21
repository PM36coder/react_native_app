
import express from "express";
import { getAllRecipe, getRecipeById, getRecipeByUserId, uploadRecipe } from "../controller/getRecipe.js";
import { authTokenMiddleware } from "../middleware/userAuthMiddleware.js";

const router = express.Router()

router.get('/', getAllRecipe)
router.post('/upload-recipe',authTokenMiddleware, uploadRecipe)
router.get('/get-recipe-by-user', authTokenMiddleware, getRecipeByUserId)
router.get("/:id", getRecipeById);
export default router