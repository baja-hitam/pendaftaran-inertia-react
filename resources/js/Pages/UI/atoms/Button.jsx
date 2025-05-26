export const Button = ({ children, type,className }) => {
  return (
    <div>
      <button
        type={type}
        className={`bg-[#226F54] hover:bg-[#265944] active:bg-[#226F54] cursor-pointer text-[#e4e7eb] font-poppins font-semibold mt-4 py-2 px-4 rounded-[7px] ${className}`}
      >
        {children}
      </button>
    </div>
  );
};
