import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type PasswordFieldProps = {
  id?: string;
  label: string;
  formNoValidate?: boolean;
  required?: boolean;
  name: string;
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  defaultValue?: string;
  wrapperClassName?: string;
  fieldClassName?: string;
  dataAuto?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function PasswordField({
  inputProps,
  id,
  label,
  formNoValidate = false,
  required = false,
  name,
  value,
  placeholder,
  onChange,
  error,
  defaultValue,
  wrapperClassName,
  fieldClassName,
  dataAuto,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      data-auto={`${dataAuto}_wrapper`}
      className={`${wrapperClassName} flex flex-col justify-start gap-y-2`}
    >
      {/* LABEL */}
      {label ? (
        <label data-auto={`${dataAuto}_label`} htmlFor={id} className="">
          <span
            data-auto={`${dataAuto}_label_text`}
            className="text-sm font-medium"
          >
            {label}{" "}
            {required && (
              <span className="text-error font-bold text-lg">*</span>
            )}
          </span>
        </label>
      ) : null}

      {/* INPUT FIELD */}
      <div data-auto={`${dataAuto}_icons`} className={`w-full relative`}>
        {isVisible ? (
          <AiOutlineEyeInvisible
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            className="absolute right-3 text-xl top-1/2 -translate-y-1/2"
          />
        ) : (
          <AiOutlineEye
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            className="absolute right-3 text-xl top-1/2 -translate-y-1/2"
          />
        )}
        <input
          data-auto={dataAuto}
          id={id}
          formNoValidate={formNoValidate}
          required={required}
          onChange={onChange}
          type={isVisible ? "text" : "password"}
          defaultValue={defaultValue}
          value={value}
          name={name}
          aria-placeholder={placeholder} // Use aria-placeholder for accessibility
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="off" // Disable autocomplete
          spellCheck={false} // Disable spell checking
          autoFocus={false} // Don't auto-focus
          {...inputProps}
          placeholder={`${placeholder}`}
          className={`bg-base-300 w-full focus:outline-none rounded border border-solid border-[#C5C5C5] px-3 py-2 
            ${fieldClassName} ${
            error
              ? "border-error focus:border-error"
              : "border-gray-300 focus:border-primary"
          }`}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p
          data-auto={`${dataAuto}_error`}
          id={`${id}-error`} // ID to link with input field's aria-describedby
          role="alert"
          aria-label="error message"
          aria-live="assertive" // Ensures screen readers announce the message immediately
          aria-atomic="true" // Ensures the whole message is read out
          className="text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
