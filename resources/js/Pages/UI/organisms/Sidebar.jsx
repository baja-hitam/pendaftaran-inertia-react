import { useState } from "react";
import logo from "../../../../../public/asset/logo_sekolah.png";
import React from "react";

const Sidebar = ({children,status}) => {
  const [open, setOpen] = useState(status);
  let time;
  return (
    <div
      className={`${
        open ? "w-[250px] xl:w-[300px]" : "w-[60px]"
      } fixed left-0 h-full overflow-hidden z-10 rounded-r-2xl bg-[#D8D8D8] flex flex-col shadow-2xl transition-all duration-300`}
      onMouseOver={() => {
        clearTimeout(time),
          (time = setTimeout(() => {
            setOpen(true);
          }, 100));
      }}
      onMouseLeave={() => {
        clearTimeout(time),
          (time = setTimeout(() => {
            setOpen(false), 100;
          }));
      }}
    >
      <div
        className={`w-[250px] min-h-[50px] mb-5 mt-2 flex flex-row relative ${
          open ? "items-center pl-[18px] xl:pl-[43px]" : ""
        }`} 
      >
        <div className={`w-[60px] flex flex-row justify-center`}>
          <img src={logo} className={`${open ? "w-full h-full":"w-[50px] h-[50px]"}`} alt="" />
        </div>
        <p
          className={`${
            open ? "ml-2" : "hidden absolute left-16"
          } text-[17px] font-poppins`}
        >
          SMP ISLAM PLUS AL MADINAH
        </p>
      </div>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { open }) : child
      )}
    </div>
  );
};
export default Sidebar;
