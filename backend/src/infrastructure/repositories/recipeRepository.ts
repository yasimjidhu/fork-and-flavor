import Recipe from "../../domain/entities/Recipe";
import RecipeModel from "../database/mongoose/recipeModel";
import IRecipeRepository from "../../domain/repositories/IRecipeRepository";


export default class RecipeRepository implements IRecipeRepository{
    async createRecipe(recipe: Recipe): Promise<Recipe> {
        const newRecipe = new RecipeModel({
            name:recipe.name,
            description:recipe.description,
            ingredients:recipe.ingredients,
            instructions:recipe.instructions,
        })

        await newRecipe.save()
        return new Recipe(newRecipe.name,newRecipe.image,newRecipe.description,newRecipe.ingredients,newRecipe.instructions,newRecipe.id)
    }
    async getAllRecipes(): Promise<Recipe[]> {
        const recipes = await RecipeModel.find()
        return recipes.map(
            (recipe)=>new Recipe(recipe.name,recipe.image,recipe.description,recipe.ingredients,recipe.instructions,recipe.id)
        )
    }
    async getRecipeById(id: string): Promise<Recipe | null> {
        const recipe = await RecipeModel.findById(id)
        if(!recipe) return null;
        return new Recipe(recipe.name,recipe.image,recipe.description,recipe.ingredients,recipe.instructions,recipe.id)
    }
    async updateRecipe(id: string, recipe: Recipe): Promise<Recipe> {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            id,
            {
                name:recipe.name,
                description:recipe.description,
                ingredients:recipe.ingredients,
                instructions:recipe.instructions
            },
            {new:true}
        );

        if(!updatedRecipe) throw new Error("Recipe not found")

        return new Recipe(
            updatedRecipe.name,
            updatedRecipe.image,
            updatedRecipe.description,
            updatedRecipe.ingredients,
            updatedRecipe.instructions,
            updatedRecipe.id
        )
    }
    async deleteRecipe(id: string): Promise<void> {
        await RecipeModel.findByIdAndDelete(id)
    }
}