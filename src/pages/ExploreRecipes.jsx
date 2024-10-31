import { Recipes } from "../components/Recipes";
import Searchbar from "../components/Searchbar";
import { BiSearchAlt2 } from "react-icons/bi";
import DropDownButton from "../components/DropDownButton";
import { AiOutlineDown } from 'react-icons/ai';
import { useState } from 'react'


export function ExploreRecipes() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <>
    <div className="max-w-[1280px] mx-auto p-5">
      <div className="flex flex-col gap-6 pt-10">
        <h1 className="text-xl lg:text-2xl font-semibold text-black">
          Explore our Library
        </h1>
        <div className="flex gap-3">
          <h2 className="text-s lg:text-lg text-grey-500">Recipes</h2>
        </div>
      </div>
    </div>

    
    <div className="max-w-[1280px] bg-[#f9f9f9] rounded mx-auto flex flex-col items-center justify-between p-5">
      {/* Search Bar */}
      <div className="w-full">
        <form
          className="w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <Searchbar
            placeholder="Search recipes by name or ingredient"
            handleInputChange={handleChange}
            rightIcon={<BiSearchAlt2 className="text-gray-600" />}
          />
        </form>
      </div>

      {/* Filters Button and Dropdowns */}
      <div className="w-full mt-5">
        {/* Filters button only visible on screens below 1000px */}
        <button
          onClick={toggleFilters}
          className="flex items-center justify-between px-4 py-2 w-full bg-white border border-gray-300 rounded shadow hover:bg-gray-100 md:hidden"
        >
          {filtersOpen ? "Close Filters" : "Filters"}
          <AiOutlineDown
            className={`ml-2 transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Filters (Hidden on smaller screens) */}
        <div className={`mt-3 gap-4 md:flex ${filtersOpen ? 'block' : 'hidden md:flex'} flex-col md:flex-row`}>
          <DropDownButton
            label="By Diet"
            options={['High Protein', 'Vegan', 'Vegetarian', 'Gluten Free', 'Dairy Free', 'Paleo', 'Low Carb']}
            isOpen={openDropdown === 'recipeType'}
            onClick={() => toggleDropdown('recipeType')}
          />
          <DropDownButton
            label="By Course"
            options={['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Salad']}
            isOpen={openDropdown === 'simpleEasy'}
            onClick={() => toggleDropdown('simpleEasy')}
          />
          <DropDownButton
            label="By Protein"
            options={['High Protein', 'Low Carb']}
            isOpen={openDropdown === 'timeToMake'}
            onClick={() => toggleDropdown('timeToMake')}
          />
          <DropDownButton
            label="By Method"
            options={['Under 30 min', 'Under 15 min', '5 Ingredients or Less']}
            isOpen={openDropdown === 'dietaryOption'}
            onClick={() => toggleDropdown('dietaryOption')}
          />
        </div>
      </div>
      </div>
      <Recipes />
    
  </>
  );
}

export default ExploreRecipes;