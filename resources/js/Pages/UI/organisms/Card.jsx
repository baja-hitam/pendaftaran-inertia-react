export const Card = ({nomor,text,children}) => {
  return (
    <>
      <div className="w-[90%] h-[250px] bg-[#D8D8D8] rounded-xl relative shadow-2xl sm:w-full">
        <div className="absolute top-1.5 left-1.5 w-[40px] h-[40px] bg-[#226F54] rounded-full">
          <p className="text-xl ml-3.5 mt-1 text-white">{nomor}</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-[250px] p-2.5">
          {children}
          <p className="text-[15px] font-semibold font-poppins text-[#226F54] xl:text-[17px]">
            {text}
          </p>
        </div>
      </div>
    </>
  );
};
