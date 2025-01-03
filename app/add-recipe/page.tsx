'use client';

import { BeatLoader } from 'react-spinners';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddRecipe = () => {
  const [imageLoding, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [currentInstruction, setCurrentInstruction] = useState('');
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    ingredients: '',
    category: '',
    servings: '',
    prepTime: '',
    cookTime: '',
    difficulty: '',
    image: null,
  });
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [instructionsList, setInstructionsList] = useState<string[]>([]);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRecipeData((prev) => ({ ...prev, image: e.target.files[0] }));
    }

    setImageLoading(true);

    const file = e.target.files?.[0];
    if (!file) {
      setImageLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", 'ylexcxmk');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dhla5xcqb/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.secure_url);
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error: any) {
      setError(error.message);
      console.error("Error uploading image:", error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleAddIngredient = () => {
    if (recipeData.ingredients.trim()) {
      setIngredientsList((prev) => [...prev, recipeData.ingredients]);
      setRecipeData((prev) => ({ ...prev, ingredients: '' }));
    }
  };

  const handleAddInstruction = () => {
    if (currentInstruction.trim()) {
      setInstructionsList((prev) => [...prev, currentInstruction.trim()]);
      setCurrentInstruction('');
    }
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructionsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredientsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveInstruction = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newList = [...instructionsList];
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
      setInstructionsList(newList);
    } else if (direction === 'down' && index < instructionsList.length - 1) {
      const newList = [...instructionsList];
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      setInstructionsList(newList);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      ...recipeData,
      image: imageUrl,
      ingredients: ingredientsList,
      instructions: instructionsList.join(' '),
    };

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await response.json();
        router.push('/');
        alert('Recipe added successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to add recipe:', errorData.error);
      }
    } catch (error: any) {
      setError(error);
      console.error('Error submitting recipe:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8 mt-12">
      {error && (<h4 className='primary text-lg text-center text-red-600'>{error}</h4>)}

      <div className="bg-white shadow-lg p-6 rounded-lg flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 primary">
                Recipe Name
              </label>
              <input
                type="text"
                name="name"
                value={recipeData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 primary">
                Description
              </label>
              <textarea
                name="description"
                value={recipeData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
              ></textarea>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 primary">
                Category
              </label>
              <select
                name="category"
                value={recipeData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="" disabled>Select a category</option>
                <option value="appetizer">Appetizer</option>
                <option value="dessert">Dessert</option>
                <option value="main-course">Main Course</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 primary">
                Ingredients
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="ingredients"
                  value={recipeData.ingredients}
                  onChange={handleInputChange}
                  className="flex-1 rounded-md border-gray-300 shadow-sm p-2 bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 primary"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2 space-y-2">
                {ingredientsList.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-gray-700 primary flex-1">• {item}</span>
                    <button
                      onClick={() => handleRemoveIngredient(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 primary">
                Instructions
              </label>
              <div className="flex space-x-2">
                <textarea
                  value={currentInstruction}
                  onChange={(e) => setCurrentInstruction(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm p-2 bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter instruction step..."
                />
                <button
                  type="button"
                  onClick={handleAddInstruction}
                  className="bg-gray-600 text-white px-2 py-2 rounded-md hover:bg-gray-500 primary"
                >
                  Add Step
                </button>
              </div>
              <div className="mt-2 space-y-3">
                {instructionsList.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-2 bg-gray-50 p-3 rounded-lg">
                    <span className="bg-gray-600 text-white w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 primary flex-1">{instruction}</p>
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleMoveInstruction(index, 'up')}
                        disabled={index === 0}
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleMoveInstruction(index, 'down')}
                        disabled={index === instructionsList.length - 1}
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleRemoveInstruction(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 primary">
                Servings
              </label>
              <input
                type="number"
                name="servings"
                value={recipeData.servings}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 primary">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={recipeData.difficulty}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 primary">
                Preparation Time
              </label>
              <input
                type="text"
                name="prepTime"
                value={recipeData.prepTime}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 primary">
                Cook Time
              </label>
              <input
                type="text"
                name="cookTime"
                value={recipeData.cookTime}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 primary">
                Choose Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-yellow-500 w-full p-2 rounded-lg text-md font-medium text-gray-800 hover:bg-yellow-500 transition"
              disabled={imageLoding}
            >
              {imageLoding ? (
                <div className='flex justify-center items-center gap-2'>
                  <BeatLoader color="#000000" loading={imageLoding} size={15} />
                </div>
              ) : (
                'Add Recipe'
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 h-[500px]">
        <Image
          src="/black-food-theme.jpg"
          width={500}
          height={500}
          alt="food image"
          className="rounded-xl object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default AddRecipe;