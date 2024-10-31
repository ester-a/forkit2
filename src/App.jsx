import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Header } from './components/Header'
import Home from "./pages/Home";
import ExploreRecipes from './pages/ExploreRecipes';

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
          <Route path="Explore" element={<ExploreRecipes />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
