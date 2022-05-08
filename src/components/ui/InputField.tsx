import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import Input, { InputProps } from "./Input";

type InputFieldProps<T> = {
  name: Path<T>;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions;
  errors?: any;
} & Omit<InputProps, 'name'>

function InputField<T extends Record<string, unknown>>({
  name,
  register,
  rules,
  className,
  errors,
  ...props
}: InputFieldProps<T>) {
  const errorMessage = errors && errors[name] && errors[name].message;

  return (
    <Input
      name={name}
      error={errorMessage}
      {...props}
      {...(register && register(name, rules))}
    />
  )
}

export default InputField;