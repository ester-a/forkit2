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
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userEmail, setUserEmail] = useState(null);

  // Fetch user ID and email if authenticated
  useEffect(() => {
    async function fetchUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setUserEmail(user.email); // Storing email of the logged-in user
      }
    }
    fetchUserData();
  }, []);

  // Fetch recipe details
  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select()
          .eq("recipes__id", recipeId)
          .single(); // Ensure single recipe is fetched

        if (error) throw error;
        setRecipe(data);

        // Fetch favorite status of the user for the recipe
        if (userId) {
          const { data: favoriteData, error: favoriteError } = await supabase
            .from("favorites")
            .select()
            .eq("recipe_id", recipeId)
            .eq("user_id", userId)
            .single();

          if (favoriteError && favoriteError.code !== "PGRST116") {
            // No favorite entry found
            throw favoriteError;
          }

          setIsFavorite(!!favoriteData); // If favoriteData exists, it's in favorites
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe or favorite status");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [recipeId, userId]);

  // Function to toggle favorite status
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
        const { error } = await supabase.from("favorites").insert({
          recipe_id: recipeId,
          user_id: userId,
        });

        if (error) throw error;
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  }

  // Fetch comments for the recipe
  useEffect(() => {
    async function fetchComments() {
      try {
        const { data: commentsData, error } = await supabase
          .from("comments")
          .select("id, comment, created_at, user_email")
          .eq("recipe_id", recipeId)
          .order("created_at", { ascending: false }); // Order by latest first

        if (error) throw error;
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments");
      }
    }
    fetchComments();
  }, [recipeId]);

  // Handle comment submission
  async function handleCommentSubmit() {
    if (!comment.trim()) return; // Don't submit empty comments

    try {
      const { error } = await supabase.from("comments").insert([
        {
          recipe_id: recipeId,
          user_email: userEmail || null, // Store email of user (if available)
          comment: comment,
        },
      ]);

      if (error) throw error;

      // Add the new comment to the state (optimistic update)
      setComments([
        {
          comment,
          user_email: userEmail,
          created_at: new Date().toISOString(),
        },
        ...comments,
      ]);
      setComment(""); // Clear input after submission
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!recipe) return <div>No recipe available</div>;

  return (
    <div className="max-w-[1280px] mx-auto p-4 pb-11 mb-11">
      <button className="text-black mb-4" onClick={() => window.history.back()}>
        &lt;
      </button>
      <div className="flex flex-col md:flex-row mb-6 mt-11 pt-10">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src={recipe.recipes__image}
            alt={recipe.recipes__name}
            className="w-full h-auto rounded aspect-square object-cover object-center"
          />
          {/* Add to Favorites Button - Visible only if userId exists */}
          {/* {userId && (
            <button
              className="mt-5 px-4 py-2 bg-black text-white rounded hover:bg-gray-500"
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )} */}
        </div>
        <div className="ml-5 md:w-1/2 md:pl-6">
          <h1 className="text-2xl font-bold">{recipe.recipes__name}</h1>
          <p className="mt-2">
            <strong>Total Time:</strong> {recipe.recipes__total_time}
          </p>
          <p>
            <strong>Category:</strong> {recipe.recipes__category}
          </p>
          <p>
            <strong>Servings:</strong> {recipe.recipes__servings}
          </p>
          <p>
            <strong>Calories per Portion:</strong>{" "}
            {recipe.recipes__calories_per_portion}
          </p>

          {/* Nutritional Information */}
          <div className="mt-4">
            <h3 className="font-semibold">Nutritional Information</h3>
            <ul className="list-disc pl-5">
              <li>Protein: {recipe.recipes__protein}</li>
              <li>Carbohydrates: {recipe.recipes__carbs}</li>
              <li>Fat: {recipe.recipes__fat}</li>
              <li>Saturated Fat: {recipe.recipes__saturated_fat}</li>
              <li>
                Monounsaturated Fat: {recipe.recipes__monounsaturated_fat}
              </li>
              <li>
                Polyunsaturated Fat: {recipe.recipes__polyunsaturated_fat}
              </li>
              <li>Fiber: {recipe.recipes__fiber}</li>
              <li>Sugar: {recipe.recipes__sugar}</li>
            </ul>
          </div>

          {/* Dietary Information */}
          <div className="mt-4">
            <h3 className="font-semibold">Dietary Information</h3>
            <ul className="list-disc pl-5">
              {recipe.recipes__gluten_free && <li>Gluten Free: ✔️</li>}
              {recipe.recipes__dairy_free && <li>Dairy Free: ✔️</li>}
              {recipe.recipes__vegan && <li>Vegan: ✔️</li>}
              {recipe.recipes__vegetarian && <li>Vegetarian: ✔️</li>}
              {recipe.recipes__paleo && <li>Paleo: ✔️</li>}
              {recipe.recipes__low_carb && <li>Low Carb: ✔️</li>}
            </ul>
          </div>

          {/* Instructions */}
          {/* <div className="mt-4">
            <h3 className="font-semibold">Instructions</h3>
            <ol className="list-decimal list-inside space-y-1">
              {recipe.recipes__instructions.split("\\n").map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div> */}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4">
        <h3 className="font-semibold">Instructions</h3>
        <ol className="list-decimal list-inside space-y-1">
          {recipe.recipes__instructions.split("\\n").map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {/* Add to Favorites Button - Visible only if userId exists */}
      {userId && (
            <button
              className="mt-5 px-4 py-2 bg-black text-white rounded hover:bg-gray-500"
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )}

      {/* Comment Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Write a Comment</h2>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-500"
          onClick={handleCommentSubmit}
        >
          Send
        </button>
      </div>

      {/* Display Comments */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b py-4">
              <p>{comment.comment}</p>
              <p className="text-sm text-gray-500">
                {comment.user_email ? `By ${comment.user_email}` : "Anonymous"}{" "}
                - {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
