import { Request, Response } from 'express'
import RecipeUseCase from '../../application/usecases/recipeUseCase'
import RecipeRepository from '../../infrastructure/repositories/recipeRepository'
import Recipe from '../../domain/entities/Recipe'

export class RecipeController {
    private recipeUseCase: RecipeUseCase

    constructor() {
        const recipeRepository = new RecipeRepository()
        this.recipeUseCase = new RecipeUseCase(recipeRepository)
    }

    // Create a new recipe
    async createRecipe(req: Request, res: Response): Promise<any> {
        try {
            console.log('requst reached', req.body)
            const { name, description, ingredients, instructions } = req.body;
            const image = req.file ? req.file.path : null;

            const recipe = new Recipe(
                name,
                image!,
                description,
                ingredients,
                instructions
            )
            const createdRecipe = await this.recipeUseCase.createRecipe(recipe);
            return res.status(201).json(createdRecipe);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create recipe" });
        }
    }

    // Get all recipes
    async getAllRecipes(req: Request, res: Response): Promise<any> {
        try {
            console.log('get allrecipes called', req.body)
            const recipes = await this.recipeUseCase.getAllRecipes();
            return res.status(200).json(recipes);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch recipes" });
        }
    }

    // Get a recipe by ID
    async getRecipeById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const recipe = await this.recipeUseCase.getRecipeById(id);
            if (recipe) {
                return res.status(200).json(recipe);
            } else {
                return res.status(404).json({ error: "Recipe not found" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch recipe" });
        }
    }

    // Update a recipe by ID
    async updateRecipe(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { name, description, ingredients, instructions } = req.body;
            const updatedRecipe = new Recipe(name, description, ingredients, instructions);
            const recipe = await this.recipeUseCase.updateRecipe(id, updatedRecipe);
            return res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update recipe" });
        }
    }

    // Delete a recipe by ID
    async deleteRecipe(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            await this.recipeUseCase.deleteRecipe(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete recipe" });
        }
    }
}