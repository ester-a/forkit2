import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from "./pages/Home";
import ExploreRecipes from './pages/ExploreRecipes';
import RecipeDetail from './pages/RecipeDetail';
import SavedRecipes from './pages/SavedRecipes';
import Login from './pages/Login';
import Register from './pages/Register'

import './App.css'
import {
  BrowserRouter, 
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

function Layout() {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  );
}

export function App() {
  
  return (
    <>  
      <BrowserRouter>
      <Routes>
        {/* Vychozi stranka cele aplikace */}
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} />
          <Route path="explore" element={<ExploreRecipes />} />
          <Route path="recipe/:recipeId" element={<RecipeDetail/>}/>  
          <Route path="saved" element={<SavedRecipes />} />  
          <Route path="login" element={<Login />} /> 
          <Route path="signup" element={<Register />} /> 
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;


