
export const Input = ({type,placeholder,className,name,onChange,value, required = false,minLength,maxLength}) => {
  return (
    <div>
        <input className={`bg-[#ececec] p-3 h-[35px] rounded-[10px] outline-[#598c77] ${className}`} minLength={minLength} maxLength={maxLength} type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} required={required}/>
    </div>
  )
}
