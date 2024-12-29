"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const UpdateRecipe = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Extract recipe ID from the pathname
  const id = pathname?.split("/").pop(); // Assuming the URL is in the format "/recipe/[id]"

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await axiosInstance.get(`/recipes/${id}`);
          const { name, ingredients, instructions } = response.data;
          setName(name);
          setIngredients(ingredients);
          setInstructions(instructions);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedRecipe = { name, ingredients, instructions };
      await axiosInstance.put(`/recipes/${id}`, updatedRecipe);
      router.push("/"); // Redirect to home or another page after updating
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div>
      <h1>Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div>
          <label>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
