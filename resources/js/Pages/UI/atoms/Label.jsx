import React from 'react'

export const Label = ({label,children}) => {
  return (
    <div className='mb-1.5 text-[#1E1E1E] font-semibold font-poppins'>
            <label htmlFor={label}>{children}</label>
    </div>
  )
}
