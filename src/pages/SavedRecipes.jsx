import { Link } from 'react-router-dom'

export function SavedRecipes() {
    return (
      <>
        <div className="max-w-[1280px] mx-auto p-4 pt-11">
          <h2 className='pt-11 mt-10'>Saved recipes</h2>
  
          <p>
            <strong>Only for registered users. Please sign in</strong>.
          </p>
  
          <Link to="/login" className="text-gray-700 hover:text-gray-400">
            <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-500">Log in</button> 
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
  
  export default SavedRecipes;