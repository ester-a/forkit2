import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";

export function RecipeDetail() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   async function fetchRecipe() {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/recipes/${recipeId}`
  //       );
  //       const data = await response.json();
  //       setRecipe(data);
  //     } catch (error) {
  //       console.error("Error fetching recipe:", error);
  //       setError("Failed to load recipe");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchRecipe();
  // }, [recipeId]);

  useEffect(() => {
    async function fetchUserId() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    }
    fetchUserId();
  }, []);

  useEffect(() => {
    async function getRecipes() {
      try {
        const { data, error } = await supabase
        .from("recipes")
        .select()
        .eq('recipes__id', recipeId);

        if (error) throw error;
        setRecipe(data);

        if (userId) { 
        const { data: favoriteData, error: favoriteError } = await supabase
          .from("favorites")
          .select()
          .eq("recipe_id", recipeId)
          .eq("user_id", userId)
          .single();

          if (favoriteError && favoriteError.code !== "PGRST116") {
            // PGRST116: No rows found, meaning it's not in favorites
            throw favoriteError;
          }
          
          setIsFavorite(!!favoriteData);
        }

      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    }
    getRecipes();
  }, [recipeId, userId]);

    // Function to add or remove the recipe from favorites
    async function handleFavoriteToggle() {
      if (!userId) {
        console.error("User not authenticated");
        return;
      }

      try {
        if (isFavorite) {
          // Remove from favorites
          const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("recipe_id", recipeId)
            .eq("user_id", userId);
  
          if (error) throw error;
          setIsFavorite(false);
        } else {
          // Add to favorites
          const { error } = await supabase
            .from("favorites")
            .insert({ 
              recipe_id: recipeId, 
              user_id: userId
            });
  
          if (error) throw error;
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error updating favorite status:", error);
      }
    }

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!recipe) return <div>No recipe available</div>;
  console.log(recipe)

  return (
    <div className="max-w-[1280px] mx-auto p-4">
      <button className="text-black mb-4" onClick={() => window.history.back()}>
        &lt;
      </button>
      <div className="flex flex-col md:flex-row mb-6 mt-11 pt-10">
        <div className="md:w-1/2 mb-4 md:mb-0 ">
          <img
            src={recipe[0].recipes__image}
            alt={recipe[0].recipes__name}
            className="w-full h-auto rounded aspect-square object-cover object-center"
          />
          <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-500"
          onClick={handleFavoriteToggle}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
        <div className="ml-10 md:w-1/2 md:pl-6">
          <h1 className="text-2xl font-bold">{recipe[0].recipes__name}</h1>
          <p className="mt-2">
            <strong>Total Time:</strong> {recipe[0].recipes__total_time}
          </p>
          <p>
            <strong>Category:</strong> {recipe[0].recipes__category}
          </p>
          <p>
            <strong>Servings:</strong> {recipe[0].recipes__servings}
          </p>
          <p>
            <strong>Calories per Portion:</strong>{" "}
            {recipe[0].recipes__calories_per_portion}
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Nutritional Information</h3>
            <ul className="list-disc pl-5">
              <li>Protein: {recipe[0].recipes__protein}</li>
              <li>Carbohydrates: {recipe[0].recipes__carbs}</li>
              <li>Fat: {recipe[0].recipes__fat}</li>
              <li>Saturated Fat: {recipe[0].recipes__saturated_fat}</li>
              <li>Monounsaturated Fat: {recipe[0].recipes__monounsaturated_fat}</li>
              <li>Polyunsaturated Fat: {recipe[0].recipes__polyunsaturated_fat}</li>
              <li>Fiber: {recipe[0].recipes__fiber}</li>
              <li>Sugar: {recipe[0].recipes__sugar}</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Dietary Information</h3>
            <ul className="list-disc pl-5">
              {recipe[0].recipes__gluten_free && <li>Gluten Free: ✔️</li>}
              {recipe[0].recipes__dairy_free && <li>Dairy Free: ✔️</li>}
              {recipe[0].recipes__vegan && <li>Vegan: ✔️</li>}
              {recipe[0].recipes__vegetarian && <li>Vegetarian: ✔️</li>}
              {recipe[0].recipes__paleo && <li>Paleo: ✔️</li>}
              {recipe[0].recipes__low_carb && <li>Low Carb: ✔️</li>}
              {recipe[0].recipes__high_protein && <li>High Protein: ✔️</li>}
            </ul>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Ingredients</h2>
        <ul className="list-disc pl-5">
          {recipe[0].recipes__ingredients.split('\\n').map((ingredient, index) => ( //amend it in supabase later
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>


      <div className="mb-4">
        <h2 className="text-xl font-bold">Instructions</h2>
        <ol className="list-decimal pl-5">
          {recipe[0].recipes__instructions.split('\\n').map((instruction, index) => (
            <li key={index}>{instruction.split('\\n').map((line, i) => (
              <span key={i}>{line}<br /></span> 
            ))}
            </li>
          ))}
        </ol>
      </div>



      <div className="mt-6">
        <h2 className="text-xl font-bold">Write a Comment</h2>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md"
          placeholder="Write your comment here..."
        />
        <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-500">
          Send
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;
