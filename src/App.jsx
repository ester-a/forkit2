import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from "./pages/Home";
import ExploreRecipes from './pages/ExploreRecipes';
import RecipeDetail from './pages/RecipeDetail';

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

function App() {
  

  return (
    <>  
      <BrowserRouter>
      <Routes>
        {/* Vychozi stranka cele aplikace */}
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} />
          <Route path="Explore" element={<ExploreRecipes />}>
            {/* <Route path=":recipeId" element={<RecipeDetail/>}/> */}
            </Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
