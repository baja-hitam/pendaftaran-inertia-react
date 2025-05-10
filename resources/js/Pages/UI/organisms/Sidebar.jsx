import { useState } from "react";
import logo from "../../../assets/logo_sekolah.png";
import { Menu } from "../molecules/Menu";
import { IconForm } from "../atoms/IconForm";
import { IconDashboard } from "../atoms/IconDashboard";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
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
      <Menu open={open} text='Dashboard' link='/dashboard'>
      <IconDashboard/>
      </Menu>
      <Menu open={open} text='Formulir Pendaftaran' link='/'>
      <IconForm/>
      </Menu>
    </div>
  );
};
export default Sidebar;
