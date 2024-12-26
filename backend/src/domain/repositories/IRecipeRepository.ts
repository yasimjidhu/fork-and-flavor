import Recipe from "../entities/Recipe";

export default interface IRecipeRepository{
    createRecipe(recipe:Recipe):Promise<Recipe>
    getAllRecipes():Promise<Recipe[]>
    getRecipeById(id:string):Promise<Recipe|null>
    updateRecipe(id:string,recipe:Recipe):Promise<Recipe>
    deleteRecipe(id:string):Promise<void>
}