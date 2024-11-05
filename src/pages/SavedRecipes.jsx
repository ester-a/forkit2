import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function SavedRecipes() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return (
      <>
        <div className="max-w-[1280px] mx-auto p-4 pt-11">
          <h2 className="pt-11 mt-10">Saved recipes</h2>

          <p>
            <strong>Only for registered users. Please sign in</strong>.
          </p>

          <Link to="/login" className="text-gray-700 hover:text-gray-400">
            <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-500">
              Log in
            </button>
          </Link>
        </div>
        <div className="max-w-[1280px] mx-auto p-4 pt-11">
          <button
            onClick={() => window.history.back()}
            className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-500"
          >
            Back to Content
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <p>
        <strong>Your database is empty.</strong>.
      </p>
      <Link to="/explore" className="text-gray-700 hover:text-gray-400">
        <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-500">
          Explore Recipes
        </button>
      </Link>
    </>
  );
}

export default SavedRecipes;
