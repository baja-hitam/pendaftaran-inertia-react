import { useState } from "react";

const ButtonLink = ({className,children,handleOpen})=>{
    return (
        <button onClick={()=>{handleOpen(true)}} className={`bg-[#226F54] hover:bg-[#265944] active:bg-[#226F54] cursor-pointer text-[#e4e7eb] font-poppins mt-4 py-1 px-4 rounded-[7px] ${className}`}>{children}</button>
    );
}

export default ButtonLink;