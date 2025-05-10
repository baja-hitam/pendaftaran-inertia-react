
export const Input = ({type,placeholder,name,onChange,value, required = false,minLength,maxLength}) => {
  return (
    <div>
        <input className='bg-[#ececec] lg:w-[250px] p-3 h-[35px] rounded-[10px] outline-[#598c77]' minLength={minLength} maxLength={maxLength} type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} required={required}/>
    </div>
  )
}
