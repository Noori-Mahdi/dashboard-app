import { InputPropsType } from "@/types/type";
import { useState } from "react";

const Input = ({
  label,
  type,
  className,
  onFocus,
  onBlur,
  onChange,
  error,
  required = false,
  readOnly,
  disabled,
  defaultValue,
  placeholder,
  name,
  min,
  max,
  Value,
}: InputPropsType) => {
  return (
    <div>
      <div className="flex gap-2 select-none">
        <div className="mb-2 capitalize  font-medium tracking-wide">
          {label}{" "}
        </div>
        {required && <div className="text-sky-500">*</div>}
      </div>
      {type === "textArea" ? (
        <textarea
          onChange={(e) => {
            onChange && onChange(e);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
          }}
          onFocus={(e) => {
            onFocus && onFocus(e);
          }}
          className={`bg-neutral-600 min-h-9 w-full tracking-wide font-medium rounded-sm p-1 outline-0 border border-neutral-700 placeholder:text-sm ${className}`}
          placeholder={placeholder}
          required={required}
          name={name}
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={defaultValue}
          value={Value}
          rows={5} // اینجا تعیین تعداد خطوط
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        ></textarea>
      ) : (
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
          className={`bg-neutral-600 min-h-9 w-full tracking-wide font-medium rounded-sm p-1 outline-0 border border-neutral-700 placeholder:text-sm ${className}`}
          placeholder={placeholder}
          type={type}
          required={required}
          name={name}
          readOnly={readOnly}
          disabled={disabled}
          defaultValue={defaultValue}
          value={Value}
          min={min}
          max={max}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />
      )}

      {error && <div>{error}</div>}
    </div>
  );
};

export default Input;
