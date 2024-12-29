"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/Navbar";
import Image from "next/image";
import RecipeListing from "./components/ListRecipes";

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const router =  useRouter()


  const handleAddRecipeClick = ()=>{
    router.push('/add-recipe')
  }

  

  return (
    <div>
      <Navbar />
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
      <div className=" grid grid-cols-4 gap-4 w-full place-items-center text-center mt-6">
        <div className="bg-slate-200 w-full rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
          <div className="bg-violet-400 rounded-full w-20 h-20 overflow-hidden ">
            <Image
              src="/pizz-small.jpg"
              width={80}
              height={80}
              alt="pizza"
              className="object-cover w-full h-full"
            />
          </div>
          <h5 className="primary mt-2 text-xl">Main Course</h5>
        </div>
        <div className="bg-slate-200 w-full rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
          <div className="bg-violet-400 rounded-full w-20 h-20 overflow-hidden ">
            <Image
              src="/appetizer.jpg"
              width={80}
              height={80}
              alt="dessert"
              className="object-cover w-full h-full"
            />
          </div>
          <h5 className="primary mt-2 text-xl">Dessert</h5>
        </div>
        <div className="bg-slate-200 w-full rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
          <div className="bg-violet-400 rounded-full w-20 h-20 overflow-hidden ">
            <Image
              src="/dessert.jpg"
              width={80}
              height={80}
              alt="snacks"
              className="object-cover w-full h-full"
            />
          </div>
          <h5 className="primary mt-2 text-xl">Snacks</h5>
        </div>
        <div className="bg-slate-200 w-full rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
          <div className="bg-violet-400 rounded-full w-20 h-20 overflow-hidden ">
            <Image
              src="/snacks.jpg"
              width={80}
              height={80}
              alt="appetizer"
              className="object-cover w-full h-full"
            />
          </div>
          <h5 className="primary mt-2 text-xl">Appetizer</h5>
        </div>
      </div>
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
          <h1 className="primary text-5xl leading-normal">Welcome to the trips <br />food where the food <br />  changes with the <br/> seasons</h1>
          <div>
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex minus qui at odio, et officia nobis cum, quia omnis molestias nesciunt dolores voluptas architecto laboriosam? </h6>
          </div>
          <div className="flex justify-start w-[60%] mt-6">
            <button className="px-4 py-2 rounded-full bg-yellow-500 primary text-xl shadow-sm">Explore our story</button>
          </div>
        </div>
      </div>
      <RecipeListing recipes={recipes} />
    </div>
  );
}

export default Home;
