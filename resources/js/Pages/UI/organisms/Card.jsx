export const Card = ({children}) => {
  return (
    <>
      <div className="w-[90%] h-[250px] bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-full">
        {children}
      </div>
    </>
  );
};
