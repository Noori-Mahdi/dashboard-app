import { InputPropsType } from "@/types/type";

const Input = ({
  label,
  type,
  className,
  onFocus,
  onBlur,
  onChange,
  error,
  required = false,
  placeholder,
  name
}: InputPropsType) => {
  return (
    <>
      <div className="flex gap-2 select-none">
        <div className="mb-2 capitalize  font-medium tracking-wide">
          {label}{" "}
        </div>
        {required && <div className="text-sky-500">*</div>}
      </div>
      <input
        onChange={(e) => {
          onChange && onChange(e);
        }}
        onBlur={(e) => {
          onBlur && onBlur(e);
        }}
        onFocus={(e) => {
          onFocus && onFocus(e);
        }}
        className={`bg-neutral-600 w-full tracking-wide font-medium rounded-sm p-1 outline-0 border border-neutral-700 placeholder:text-sm ${className}`}
        placeholder={placeholder}
        type={type}
        required={required}
        name={name}
      />
      {error && <div>{error}</div>}
    </>
  );
};

export default Input;
