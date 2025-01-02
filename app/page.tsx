"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RecipeListing from "./components/ListRecipes";
import CategoryCard from "./components/CategoryCard";
import { useDebounce } from "./hooks/useDebounce";
import { useSearch } from "./context/SearchContext";

interface Recipe {
  name: string;
  description: string;
  instructions: string[];
  ingredients: string[];
  category: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}


const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { searchResults } = useSearch()

  const router = useRouter()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes')
        if (!response.ok) {
          throw new Error(`error: ${response.status}`)
        }
        const data = await response.json()
        setRecipes(data.recipes)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])


  const handleAddRecipeClick = () => {
    router.push('/add-recipe')
  }
  console.log('searchresults', searchResults)
  return (
    <div>
      <div className=" grid grid-cols-2">
        {/* Left Column */}
        <div className="col-span-1  place-items-start p-10">
          <h1 className="primary text-5xl leading-normal">Good food choices <br />are good <br />  investments</h1>
          <div>
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex minus qui at odio, et officia nobis cum, quia omnis molestias nesciunt dolores voluptas architecto laboriosam? </h6>
          </div>
          <div className="flex justify-between w-[52%] mt-6">
            <button className="px-4 py-3 rounded-full bg-yellow-500 primary text-xl shadow-md" onClick={handleAddRecipeClick}>+ Recipe</button>
            <button className="px-4 py-3 rounded-full bg-slate-300 primary text-xl shadow-md">Watch Video</button>
          </div>
        </div>

        {/* Right Column with Image */}
        <div className="col-span-1 place-items-center h-full flex justify-center">
          <div className="w-full max-h-[450px] overflow-hidden rounded-3xl">
            <Image
              src="/pizza.jpg"
              alt="pizza"
              width={740}
              height={300}
              layout="intrinsic"
              objectFit="cover" // Ensure the image covers the area and doesn't stretch
            />
          </div>
        </div>
      </div>
      {/* category section */}

      <>
        {searchResults && searchResults.length > 0 ? (
          <RecipeListing recipes={searchResults} title="search results" />
        ) : (
          <div className="grid grid-cols-4 gap-4 text-center mt-12">
            <CategoryCard image="/pizz-small.jpg" title="Main-Course" />
            <CategoryCard image="/appetizer.jpg" title="Appetizer" />
            <CategoryCard image="/dessert.jpg" title="Dessert" />
            <CategoryCard image="/snacks.jpg" title="Snacks" />
          </div>
        )}
      </>

      {/* explore section */}
      <div className=" grid grid-cols-2 mt-12">

        {/* left Column with Image */}
        <div className="col-span-1 place-items-center h-full flex justify-center">
          <div className="w-full max-h-[450px] overflow-hidden rounded-3xl">
            <Image
              src="/food.jpg"
              alt="pizza"
              width={740}
              height={300}
              layout="intrinsic"
              objectFit="cover"
            />
          </div>
        </div>

        {/* right Column */}
        <div className="col-span-1  place-items-start p-10">
          <h1 className="primary text-5xl leading-normal">Welcome to the trips <br />food where the food <br />  changes with the <br /> seasons</h1>
          <div>
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex minus qui at odio, et officia nobis cum, quia omnis molestias nesciunt dolores voluptas architecto laboriosam? </h6>
          </div>
          <div className="flex justify-start w-[60%] mt-6">
            <button className="px-4 py-2 rounded-full bg-yellow-500 primary text-xl shadow-sm">Explore our story</button>
          </div>
        </div>
      </div>
      <RecipeListing recipes={recipes} title='Explore Our Delicious Recipes' />
    </div>
  );
}

export default Home;
