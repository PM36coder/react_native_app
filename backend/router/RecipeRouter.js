
import express from "express";
import { getAllRecipe, uploadRecipe } from "../controller/getRecipe.js";

const router = express.Router()

router.get('/', getAllRecipe)
router.post('/upload-recipe', uploadRecipe)

export default router