import React,{useRef} from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import { Indonesian } from "flatpickr/dist/l10n/id.js"; // Lokal Bahasa Indonesia


const DatePickr = ({ value, onChange, name }) => {
    const ref = useRef();
    return (
        <Flatpickr
        value={value}
        onChange={onChange}
        options={{
          dateFormat: "Y-m-d",
          locale: Indonesian, // Menggunakan lokal Bahasa Indonesia
        }}
        render={({ defaultValue, value, ...props }, refInput) => {
          return (
            <input
              ref={refInput}
              name={name} // 👉 name diset di sini
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          );
        }}
      />
    );
}
export default DatePickr;