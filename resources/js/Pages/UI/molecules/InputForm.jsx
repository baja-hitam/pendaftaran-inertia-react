import { Input } from "../atoms/Input";
export const InputForm = ({
  type,
  placeholder,
  required = false,
  name,
  value,
  onChange,
  minLength,
  maxLength,
  className
}) => {
  return (
    <div className="mb-2">
      <Input
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
        value={value}
        className={className}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
      />
    </div>
  );
};
