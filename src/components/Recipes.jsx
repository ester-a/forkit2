import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/supabase-client";
import { RecipeCard } from "./RecipeCard";

export function Recipes({
  showAll = false,
  query,
  showFavorites = false,
  dietFilter,
}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    async function getUserId() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    }

    getUserId();

    async function getRecipes() {
      const { data, error } = await supabase.from("recipes").select();
      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setRecipes(data);
      }
      setLoading(false);
    }

    async function getFavorites() {
      if (!userId) return;
      const { data, error } = await supabase
        .from("favorites")
        .select()
        .eq("user_id", userId);
      console.log(userId);

      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setFavorites(data.map((x) => x.recipe_id)); //return array only with recipe_id
      }
      setLoading(false);
    }
    getRecipes();
    getFavorites();
  }, [userId]);

  useEffect(() => {
    // Filter recipes by name or ingredients based on searchQuery

    let filtered = [...recipes]; 

    if (query) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.recipes__name.toLowerCase().includes(query.toLowerCase()) ||
          recipe.recipes__ingredients 
            .toLowerCase()
            .includes(query.toLowerCase()) || 
          recipe.recipes__category.toLowerCase().includes(query.toLowerCase())
      );
    }

      // Filter by diet type
      if (dietFilter) {
           filtered = filtered.filter(
          (recipe) => recipe.recipes__diet_type === dietFilter
        );
      }

      if (showFavorites) {
        filtered = filtered.filter((recipe) => favorites.includes(recipe.recipes__id));
      }

    
      setFilteredRecipes(filtered);
  }, [recipes, favorites, query, dietFilter, showFavorites]);

  if (loading) {
    return (
      <>
        <div className="max-w-[1280px] mx-auto p-5 pt-11">
          <p>Loading recipes...</p>
        </div>
      </>
    );
  }

  if (filteredRecipes.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto p-5 pt-11">
        <h1 className="text-center">
          No tasty results. Let's discover something else!
        </h1>
        <Link to="/explore">
          <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-500">
            Explore Recipes
          </button>
        </Link>
      </div>
    );
  }

  // Display all recipes
  if (showAll || query || showFavorites || dietFilter) {
    return (
      <div className="max-w-[1280px] mx-auto p-5 pt-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.recipes__id} recipe={recipe} />
          ))}
        </div>
      </div>
    );
  }

   // Group by category for main page
   const categories = ["Breakfast", "Lunch", "Dinner", "Snack", "Salad"];
   const recipesByCategory = categories.reduce((acc, category) => {
     acc[category] = recipes.filter((r) => r.recipes__category === category);
     return acc;
   }, {});
 
   return (
     <div className="max-w-[1280px] mx-auto p-5">
       {categories.map((category) => (
         <div key={category} className="mb-8">
           <h2 className="text-xl text-gray-800 mb-4">{category}</h2>
           <div className="flex gap-4 overflow-x-auto">
             {recipesByCategory[category].map((recipe) => (
               <div
                 key={recipe.recipes__id}
                 className="min-w-[200px] max-w-[200px] bg-white rounded-lg shadow-md overflow-hidden"
               >
                 <Link to={`/recipe/${recipe.recipes__id}`}>
                   <img
                     src={recipe.recipes__image}
                     alt={recipe.recipes__name}
                     className="w-full h-32 object-cover"
                   />
                   <div className="p-4">
                     <h3 className="text-md font-medium text-gray-800 mb-2">
                       {recipe.recipes__name}
                     </h3>
                     <p className="text-sm text-gray-600">
                       ⏱ {recipe.recipes__total_time}
                     </p>
                   </div>
                 </Link>
               </div>
             ))}
           </div>
         </div>
       ))}
     </div>
   );
 }

