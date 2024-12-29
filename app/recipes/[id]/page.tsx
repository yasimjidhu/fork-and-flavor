"use client";

import Recipe from "@/types/recipe";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image"; 

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          console.log('recipe id', id);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="relative flex justify-end">
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={300}
          height={300}
          className="object-cover rounded-lg"
        />
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-1 rounded-md">
          <h1 className="text-xl font-semibold">{recipe.name}</h1>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <p className="text-gray-600">{recipe.description}</p>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Ingredients</h2>
          <ul className="list-inside list-disc text-gray-700">
            {recipe.ingredients.map((ingredient, index) => (
              
              <li key={index} className="text-lg">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Instructions</h2>
          <p className="text-gray-700">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}
