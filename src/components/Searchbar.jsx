export function Searchbar({
  type,
  placeholder,
  required = false,
  value,
  name,
  handleInputChange,

  rightIcon,
  
}) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={type || "text"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          required={required}
          className={`bg-white border border-gray-400 text-gray-800 text-md rounded
            focus:ring-1 focus:ring-slate-800
            focus:border-slate-500 block
            w-full p-2.5 outline-none px-5
            placeholder:text-sm shadow-xl`}
        />
        {rightIcon && (
          <div className="color-brown absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
