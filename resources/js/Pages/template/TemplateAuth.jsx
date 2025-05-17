import { ToastContainer } from "react-toastify";
import gedung from "../../../../public/asset/gedung_sekolah.jpeg";

export const TemplateAuth = (props) => {
  const { children, text, text1, head } = props;
  return (
    <div className="bg-[#D8D8D8] w-[90%] p-6 shadow-2xl rounded-2xl md:w-[65%] md:h-[550px] md:flex-row md:flex">
      <div className="relative hidden md:w-1/2 md:h-full md:flex md:items-center">
        <div className="absolute flex items-end w-full h-full bg-[#226F54] opacity-60 rounded-2xl">
        </div>
        <p className="text-white absolute bottom-0 text-3xl mb-4 ml-4 font-semibold font-poppins">
            SMP ISLAM PLUS AL MADINAH
        </p>
        <img src={gedung} className="w-full h-full rounded-2xl" alt="" />
      </div>
      <div className="flex flex-col items-center md:w-1/2 md:h-full md:flex md:flex-col md:items-center md:justify-center">
        <div className="w-full xl:w-[300px]">
          <h1 className="text-[30px] text-[#1E1E1E] text-center">{head}</h1>
          <p className="text-[15px] text-[#1E1E1E] font-poppins mb-5 text-center">
            {text}
          </p>
          <p className="text-[15px] text-[#1E1E1E] font-poppins mb-5 text-center">
            {text1}
          </p>
        </div>
        {children}
        <ToastContainer />
      </div>
    </div>
  );
};
