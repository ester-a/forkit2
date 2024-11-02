import { Recipes } from "../components/Recipes";
import Searchbar from "../components/Searchbar";
import { BiSearchAlt2 } from "react-icons/bi";
import DropDownButton from "../components/DropDownButton";
import { AiOutlineDown } from "react-icons/ai";
import { useState } from "react";

export function ExploreRecipes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    diet: "",
    course: "",
    protein: "",
    method: ""
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    console.log(`Filter changed: ${filterName} = ${value}`);  // Debugging log
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
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
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <Searchbar
              placeholder="Search recipes by name or ingredient"
              handleInputChange={handleSearchChange}
              rightIcon={<BiSearchAlt2 className="text-gray-600" />}
            />
          </form>
        </div>

        {/* Filters Button and Dropdowns */}
        <div className="w-full mt-5">
          <button
            onClick={toggleFilters}
            className="flex items-center justify-between px-4 py-2 w-full bg-white border border-gray-300 rounded shadow hover:bg-gray-100 md:hidden"
          >
            {filtersOpen ? "Close Filters" : "Filters"}
            <AiOutlineDown
              className={`ml-2 transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <div className={`mt-3 gap-4 md:flex ${filtersOpen ? 'block' : 'hidden md:flex'} flex-col md:flex-row`}>
            <DropDownButton
              label="By Diet"
              options={['high_protein', 'vegan', 'vegetarian', 'gluten_free', 'dairy_free', 'paleo', 'low_carb']}  // JSON keys
              isOpen={openDropdown === 'diet'}
              onClick={() => toggleDropdown('diet')}
              onSelect={(value) => handleFilterChange("diet", value)}
            />
            <DropDownButton
              label="By Course"
              options={['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Salad']}
              isOpen={openDropdown === 'course'}
              onClick={() => toggleDropdown('course')}
              onSelect={(value) => handleFilterChange("course", value)}
            />
            <DropDownButton
               label="By Protein"
               options={['high_protein', 'low_carb']} 
               isOpen={openDropdown === 'protein'}
               onClick={() => toggleDropdown('protein')}
               onSelect={(value) => handleFilterChange("protein", value)}
            />
            <DropDownButton
               label="By Method"
               options={['under 30 minutes', 'under 15 minutes', '5 ingredients or less']}  
               isOpen={openDropdown === 'method'}
               onClick={() => toggleDropdown('method')}
               onSelect={(value) => handleFilterChange("method", value)}
            />
          </div>
        </div>
      </div>

      {/* Pass searchTerm and filters to Recipes */}
      <Recipes showAll={true} searchTerm={searchTerm} filters={filters} />
    </>
  );
}

export default ExploreRecipes;
