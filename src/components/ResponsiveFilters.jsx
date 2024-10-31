import React, { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { DropDownButton } from './DropDownButton';

export function ResponsiveFilters() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:gap-4 pt-5">
      {/* Dropdown Filters (Visible above 1000px width) */}
      <div className="hidden md:flex gap-4 w-full justify-center">
        <DropDownButton
          label="By Diet"
          options={['High Protein', 'Vegan', 'Vegetarian', 'Gluten Free', 'Dairy Free', 'Paleo', 'Low Carb']}
          isOpen={openDropdown === 'diet'}
          onClick={() => toggleDropdown('diet')}
        />
        <DropDownButton
          label="By Course"
          options={['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Salad']}
          isOpen={openDropdown === 'course'}
          onClick={() => toggleDropdown('course')}
        />
        <DropDownButton
          label="By Protein"
          options={['High Protein', 'Low Carb']}
          isOpen={openDropdown === 'protein'}
          onClick={() => toggleDropdown('protein')}
        />
        <DropDownButton
          label="By Method"
          options={['Under 30 mins', 'Under 15 mins', '5 Ingredients or Less']}
          isOpen={openDropdown === 'method'}
          onClick={() => toggleDropdown('method')}
        />
      </div>

      {/* Single "Filters" Button (Visible below 1000px width) */}
      <div className="flex md:hidden w-full justify-center">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center justify-between px-4 py-2 w-full bg-white border border-gray-300 rounded shadow hover:bg-gray-100"
        >
          Filters
          <AiOutlineDown
            className={`ml-2 transition-transform duration-300 ${
              filtersOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {filtersOpen && (
          <div className="flex flex-col gap-2 mt-2 w-full">
            <DropDownButton
              label="By Diet"
              options={['High Protein', 'Vegan', 'Vegetarian', 'Gluten Free', 'Dairy Free', 'Paleo', 'Low Carb']}
              isOpen={openDropdown === 'diet'}
              onClick={() => toggleDropdown('diet')}
              responsive
            />
            <DropDownButton
              label="By Course"
              options={['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Salad']}
              isOpen={openDropdown === 'course'}
              onClick={() => toggleDropdown('course')}
              responsive
            />
            <DropDownButton
              label="By Protein"
              options={['High Protein', 'Low Carb']}
              isOpen={openDropdown === 'protein'}
              onClick={() => toggleDropdown('protein')}
              responsive
            />
            <DropDownButton
              label="By Method"
              options={['Under 30 mins', 'Under 15 mins', '5 Ingredients or Less']}
              isOpen={openDropdown === 'method'}
              onClick={() => toggleDropdown('method')}
              responsive
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponsiveFilters;