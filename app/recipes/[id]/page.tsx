"use client";

import Recipe from "@/types/recipe";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await fetch(`/api/recipes/${id}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
          });
          if (response.ok) {
            const data = await response.json();
            setRecipe(data.recipe);
          } else {
            console.error("Error fetching recipe:", response.status);
          }
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-4">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] w-full">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 w-full p-6 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {recipe.name}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl primary">
            {recipe.description}
          </p>
        </div>
      </div>
  
      {/* Recipe Details Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Info Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <p className="font-bold text-gray-800">Prep Time</p>
              <p className="text-gray-600 primary">{recipe.prepTime}</p>
            </div>
            <div className="p-4">
              <p className="font-bold text-gray-800">Servings</p>
              <p className="text-gray-600 primary">{recipe.servings}</p>
            </div>
            <div className="p-4">
              <p className="font-bold text-gray-800">Difficulty</p>
              <p className="text-gray-600 primary">{recipe.difficulty}</p>
            </div>
          </div>
        </div>
  
        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-[50vh] overflow-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 font-primary">
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span className="text-gray-700 primary">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Instructions Section */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6 h-[50vh] overflow-auto font-primary">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Instructions
            </h2>
            <div className="space-y-6">
              {recipe.instructions[0].split('.').map((instruction, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 mt-1">{instruction.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
