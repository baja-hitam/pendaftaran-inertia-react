import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";
export const InputForm = ({
  type,
  placeholder,
  required = false,
  name,
  value,
  onChange,
  label,
  minLength,
  maxLength,
}) => {
  return (
    <div className="mb-2">
      <Label label={label}>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
      />
    </div>
  );
};
