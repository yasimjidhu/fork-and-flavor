import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    category: { type: String, enum: ["Dessert", "Main Course", "Appetizer", "Snack", "Drink", "Other"], required: true },
    servings: { type: Number, required: true },
    prepTime: { type: Number, required: true }, // Time in minutes
    cookTime: { type: Number, required: true }, // Time in minutes
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
    image: { type: String, required: true }, 
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User collection
    ratings: { 
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User who rated
          rating: { type: Number, min: 1, max: 5 }, // Rating from 1 to 5
          comment: { type: String, maxLength: 200 },
          createdAt: { type: Date, default: Date.now },
        }
      ],
      default: []
    }
  },
  {
    timestamps: true, 
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
