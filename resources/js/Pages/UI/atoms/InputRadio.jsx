export const InputRadio = ({name,value,onChange,required=false,label,id})=>{
    return(
        <div className="flex flex-row items-center gap-x-2">
        <input id={id} type="radio" name={name} value={value} onChange={onChange} required={required} />
        <label htmlFor={id}>{label}</label>
        </div>
    );
}