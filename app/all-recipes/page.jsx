'use client';
import React, { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import RecipeCard from '@/components/Recipes/RecipeCard';
import SingleRecipe from '@/components/Recipes/SingleRecipe';
import { useQuery } from '@tanstack/react-query';
import HttpKit from '@/common/helpers/HttpKit';
import { useCart } from '@/hooks/useCart';

const AllRecipes = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState('');
  const [recipes, setRecipes] = useState([]);
  const { addToCart } = useCart();

  const { data, isLoading, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: HttpKit.getAllRecipes,
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  const handleDetailsOpen = (id) => {
    setRecipeId(id);
    setOpenDetails(true);
  };

  if (isLoading) return <div>Loading recipes...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="relative py-16">
          <div className="container relative m-auto px-4 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3 mt-8">
              {recipes?.map((recipe) => (
                <RecipeCard
                  key={recipe?.idMeal}
                  recipe={recipe}
                  handleDetailsOpen={() => handleDetailsOpen(recipe.idMeal)}
                  handleAddToCart={() => addToCart(recipe)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal*/}
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </div>
  );
};

export default AllRecipes;
