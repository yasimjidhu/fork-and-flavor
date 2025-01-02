'use client';

import RecipeListing from '@/app/components/ListRecipes';
import Recipe from '@/types/recipe';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { category } = useParams();
    const [recipes,setRecipes] = useState<Recipe[]>([])
    
      useEffect(() => {
        if (category) {
          const fetchRecipe = async () => {
            try {
              const response = await fetch(`/api/recipes/category/${category}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
              });
              if (response.ok) {
                const data = await response.json();
                setRecipes(data.recipes)
              } else {
                console.error("Error fetching recipe:", response.status);
              }
            } catch (error) {
              console.error("Error fetching recipe:", error);
            }
          };
          fetchRecipe();
        }
      }, [category]);

      console.log('category',recipes)
  return (
    
    <div>
       {recipes && recipes.length > 0 && (
        <RecipeListing recipes={recipes!} title={`recipes under ${recipes[0].category}`}/>
       )}
    </div>
  )
}

export default Page