import { AiOutlineDown } from 'react-icons/ai';

function DropDownButton({ label, options, isOpen, onClick, onSelect }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="px-5 py-2 w-full bg-white border border-gray-300 rounded shadow hover:bg-gray-100"
      >
        {label}<AiOutlineDown className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option);  // Call onSelect with the selected option
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDownButton;



