// app/api/recipe/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import Recipe from "@/app/models/recipe";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Retrieve the recipe ID from URL parameters

    // Connect to the database
    await connectDB();

    // Fetch the recipe from the database using the ID
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json(
        { message: 'Recipe not found' },
        { status: 404 }
      );
    }

    // Return the recipe data
    return NextResponse.json({ recipe }, { status: 200 });
  } catch (error: any) {
    console.log('Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch recipe', error: error.message },
      { status: 500 }
    );
  }
}
