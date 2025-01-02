import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import Recipe from "@/app/models/recipe";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Get the data from the request body
    const {
      name,
      ingredients,
      description,
      instructions,
      category,
      servings,
      prepTime,
      cookTime,
      difficulty,
      image
    } = await req.json();

    // Create a new recipe
    const recipe = new Recipe({
      name,
      ingredients,
      description,
      instructions,
      category,
      servings,
      prepTime,
      cookTime,
      difficulty,
      image
    });

    // Save the recipe to the database
    await recipe.save();
    console.log('Recipe saved:', recipe);

    // Return a success response
    return NextResponse.json({ message: 'Recipe added successfully' }, { status: 201 });
  } catch (error: any) {
    console.log('Error:', error);

    // Return an error response
    return NextResponse.json(
      { message: 'Failed to add recipe', error: error.message },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
    try {
      // Connect to the database
      await connectDB();
  
      // Fetch all recipes from the database
      const recipes = await Recipe.find(); // You can modify this to add filtering, sorting, or pagination if needed
  
      // Return the list of recipes
      return NextResponse.json({ recipes }, { status: 200 });
    } catch (error: any) {
      console.log('Error:', error);
  
      // Return an error response
      return NextResponse.json(
        { message: 'Failed to fetch recipes', error: error.message },
        { status: 500 }
      );
    }
  }