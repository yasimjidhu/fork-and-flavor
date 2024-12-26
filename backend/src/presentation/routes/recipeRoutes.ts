import express from 'express'
import { RecipeController } from '../controllers/recipeController';
import upload from '../../config/multer'

const router = express.Router()
const recipeController = new RecipeController()

router.post('/',upload.single('image'),recipeController.createRecipe.bind(recipeController))
router.get("/", recipeController.getAllRecipes.bind(recipeController));
router.get("/:id", recipeController.getRecipeById.bind(recipeController));
router.put("/:id", recipeController.updateRecipe.bind(recipeController));
router.delete("/:id", recipeController.deleteRecipe.bind(recipeController));

export default router;