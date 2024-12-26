import IRecipeRepository from "../../domain/repositories/IRecipeRepository";
import Recipe from "../../domain/entities/Recipe";

export default class RecipeUseCase{
    constructor(private recipeRepository:IRecipeRepository){}

    async createRecipe(recipe:Recipe):Promise<Recipe>{
        return await this.recipeRepository.createRecipe(recipe)
    }
    async getAllRecipes():Promise<Recipe[]>{
        return this.recipeRepository.getAllRecipes()
    }
    async getRecipeById(id:string):Promise<Recipe|null>{
        return this.recipeRepository.getRecipeById(id)
    }
    async updateRecipe(id:string,updatedRecipe:Recipe):Promise<Recipe>{
        return this.recipeRepository.updateRecipe(id,updatedRecipe)
    }
    async deleteRecipe(id:string):Promise<void>{
        return this.recipeRepository.deleteRecipe(id)
    }

}