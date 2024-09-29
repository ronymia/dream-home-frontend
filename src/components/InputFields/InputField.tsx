import React from "react";

export type InputFieldProps = {
  label: string;
  type?: string;
  id?: string;
  name: string;
  value: string;
  defaultValue?: string;
  placeholder: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  maxLength: number;
  minLength: number;
  pattern: RegExp;
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
  required = false,
  readOnly = false,
  disabled = false,
  minLengthMessage,
  maxLengthMessage,
  patternMessage,
  maxMessage,
  minMessage,
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
          <span className="label-text text-md font-bold">
            {label}{" "}
            {required && (
              <span className="text-error font-bold text-md">*</span>
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
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        autoFocus={!!error}
        pattern={pattern}
        maxLength={maxLength}
        minLength={minLength}
        aria-placeholder={placeholder} // Use aria-placeholder for accessibility
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete="off" // Disable autocomplete
        spellCheck={false} // Disable spell checking
        {...inputProps}
        className={`${fieldClassName} bg-base-300 rounded border border-solid border-[#C5C5C5] px-3 py-2 placeholder:text-sm placeholder:capitalize focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-500"
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
          className="text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
