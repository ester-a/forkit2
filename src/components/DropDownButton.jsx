import { AiOutlineDown } from 'react-icons/ai';

export function DropDownButton({ label, options, isOpen, onClick }) {
  return (
    <div className="relative w-full md:w-auto">
      <button
        onClick={onClick}
        className="flex items-center justify-between px-4 py-2 w-full bg-white border border-gray-300 rounded shadow hover:bg-gray-100"
      >
        {label}
        <AiOutlineDown className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full bg-gray-100 shadow-md rounded mt-1 md:w-40">
          <ul className="text-sm text-gray-700 p-2 space-y-1">
            {options.map((option) => (
              <li key={option} className="hover:bg-gray-200 cursor-pointer px-2 py-1 rounded">
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDownButton;



