import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    description: { type: String, required: true },
    instructions: [{ type: String, required: true }],
    category: { type: String, required: true },
    servings: { type: Number, required: true },
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    difficulty: { type: String, required: true },
    image: { type: String, required: false },
});

// Check if the model already exists before compiling
const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
