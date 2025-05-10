import { NavLink } from "react-router-dom";
export const Menu = ({ open, children, text, link }) => {
  return (
      <div
        className={`${
          open ? `w-[250px] xl:w-[300px]` : `w-[60px]`
        } flex flex-row justify-center`}
      >
        <NavLink
          to={link}
          className={({ isActive }) => {
            return (
              `flex relative flex-row p-[10px] mb-2 items-center ${
                open ? `w-[90%]` : "w-max"
              } hover:cursor-pointer hover:rounded-2xl hover:text-white hover:bg-[#226F54]` +
              (isActive ? ` bg-[#226F54] text-white rounded-2xl` : ``)
            );
          }}
        >
          <div className={`w-[30px] h-[30px]`}>{children}</div>
          <p className={`${!open && "hidden"} ml-2 xl:text-lg font-poppins`}>
            {text}
          </p>
        </NavLink>
      </div>
  );
};
