"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RecipeListing from "./components/ListRecipes";
import CategoryCard from "./components/CategoryCard";
import { useSearch } from "./context/SearchContext";
import Recipe from "@/types/recipe";


const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

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
      } catch (error: unknown) {
        if(error instanceof  Error){
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])


  const handleAddRecipeClick = () => {
    router.push('/add-recipe')
  }

  if(loading){
    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  }
  if(error){
    <h1>{error}</h1>
  }

  return (
    <div>
      <div className=" grid md:grid-cols-2 md:p-2 p-2 mt-6 gap-4 lg:mt-8 ">
        {/* Left Column */}
        <div className="col-span-1  place-items-start lg:p-10 lg:space-y-10">
          <h1 className="primary text-3xl lg:text-4xl xl:text-5xl leading-tight ">Good food choices are good  investments</h1>
          <div>
            <h6 className="text-md md:text-lg text-wrap mt-4 leading-tight font-normal ">Fork and  Flavor is a reci  pe app designed to inspire creativity in the kitchen. Discover a variety of recipes, customize them, and track your cooking journey. Whether you are  a beginner or an expert, Fork and Flavor has something for everyone.
            </h6>
          </div>
          <div className="flex flex-col md:flex-row justify-start gap-4 xl:justify-between xl:w-[52%] mt-6 w-full ">
            <button className="py-1 px-4 md:py-2 rounded-full bg-yellow-500 primary text-lg md:text-xl shadow-md transition duration-300 ease-in-out hover:bg-black hover:scale-110 hover:text-white" onClick={handleAddRecipeClick}>+ Recipe</button>
            <button className="py-1 px-4 md:py-2 rounded-full bg-slate-300 primary text-lg md:text-xl shadow-md transition duration-300 ease-in-out hover:bg-black hover:scale-110 hover:text-white">Watch Video</button>
          </div>
        </div>
  
        {/* Right Column with Image */}
        <div className="col-span-1 place-items-center h-full flex justify-center mt-4 md:mt-0">
          <div className="w-full max-h-[450px] overflow-hidden rounded-3xl">
            <Image
              src="/pizza.jpg"
              alt="pizza"
              width={740}
              height={300}
              layout="intrinsic"
              objectFit="cover" 
              className="opacity-0 animate-fade-in"
            />
          </div>
        </div>
      </div>

      {/* category section */}
      <>
        {searchResults && searchResults.length > 0 ? (
          <RecipeListing recipes={searchResults} title="search results" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center mt-12 lg:p-4">
            <CategoryCard image="/pizz-small.jpg" title="Main-Course" />
            <CategoryCard image="/appetizer.jpg" title="Appetizer" />
            <CategoryCard image="/dessert.jpg" title="Dessert" />
            <CategoryCard image="/snacks.jpg" title="Snacks" />
          </div>
        )}
      </>

      {/* explore section */}
      <div className=" grid grid-cols-1 lg:grid-cols-2 mt-12 gap-6 lg:p-4 ">

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
        <div className="col-span-1 place-items-start p-2 lg:p-8 lg:space-y-8 mt-4 md:mt-2">
          <h1 className="primary text-lg lg:text-4xl leading-tight xl:leading-relaxed md:text-xl">Welcome to the trips food where the food changes with the seasons</h1>
          <div className="mt-4">
            <h6 className="md:text-justify ">Explore an extensive collection of delicious recipes on Fork and Flavor, where you can discover new dishes from all over the world. Whether you are craving a quick weeknight meal or looking to experiment with gourmet flavors, our app offers a variety of recipes to suit every taste.  </h6>
          </div>
          <div className="flex justify-start lg:w-[60%] w-full mt-6 ">
            <button className="px-4 py-2 rounded-full bg-yellow-500 primary text-md md:text-xl shadow-sm w-full transition duration-300 ease-linear hover:bg-black hover:text-white">Explore our story</button>
          </div>
        </div>
      </div>
      <RecipeListing recipes={recipes} title='Explore Our Delicious Recipes' />
    </div>
  );
}

export default Home;
