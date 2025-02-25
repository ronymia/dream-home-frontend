import React from "react";

export type InputFieldProps = {
  label?: string;
  type?: string;
  id?: string;
  name: string;
  value: string;
  defaultValue?: string;
  placeholder: string;
  formNoValidate?: boolean;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  error?: string;
  minLengthMessage?: string;
  maxLengthMessage?: string;
  patternMessage?: string;
  maxMessage?: string;
  minMessage?: string;
  wrapperClassName?: string;
  fieldClassName?: string;
  labelClassName?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function InputField({
  inputProps,
  id,
  name,
  value,
  defaultValue,
  error,
  label,
  type = "text",
  placeholder,
  maxLength,
  minLength,
  pattern,
  formNoValidate = false,
  required = false,
  readOnly = false,
  disabled = false,
  wrapperClassName,
  fieldClassName,
  labelClassName,
  onChange = (event) => event,
}: InputFieldProps) {
  return (
    <div className={`${wrapperClassName} flex flex-col justify-start gap-y-2`}>
      {/* LABEL */}
      {label && (
        <label htmlFor={id} className={`${labelClassName}`}>
          <span className="text-sm font-medium ">
            {label}{" "}
            {required && (
              <span className="text-error font-bold text-lg">*</span>
            )}
          </span>
        </label>
      )}

      {/* INPUT FIELD */}
      <input
        type={type} // Set input type as needed
        id={id}
        name={name}
        onChange={onChange}
        value={value} // Ensure value is never undefined
        defaultValue={defaultValue}
        placeholder={placeholder}
        formNoValidate={formNoValidate}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        autoFocus={!!error}
        pattern={pattern ? pattern.source : undefined} // Convert RegExp to string
        maxLength={maxLength}
        minLength={minLength}
        aria-placeholder={placeholder} // Use aria-placeholder for accessibility
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete="off" // Disable autocomplete
        spellCheck={false} // Disable spell checking
        {...inputProps}
        className={`bg-base-300 rounded border border-solid border-[#C5C5C5] px-3 py-2 placeholder:text-sm placeholder:capitalize focus:outline-none ${fieldClassName} 
          ${
            error
              ? "border-error focus:border-error"
              : "border-gray-300 focus:border-primary"
          }`}
      />

      {/* Error Message */}
      {error && (
        <p
          id={`${id}-error`} // ID to link with input field's aria-describedby
          role="alert"
          aria-label="error message"
          aria-live="assertive" // Ensures screen readers announce the message immediately
          aria-atomic="true" // Ensures the whole message is read out
          className="text-xs text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
