import { ChangeEvent, TextareaHTMLAttributes } from "react";

interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  rows?: number;
  required?: boolean;
}

/**
 * Komponent reprezentujący pole tekstowe TextArea.
 *
 * @component
 * @param {TextAreaProps} props - Właściwości komponentu.
 * @returns {JSX.Element} Pole tekstowe TextArea.
 *
 * @example
 * <TextArea
 *   label="Description"
 *   value={description}
 *   onChange={setDescription}
 *   placeholder="Add more details..."
 *   rows={3}
 * />
 */
export default function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 2,
  required = false,
  className = "",
  disabled = false,
  ...rest
}: TextAreaProps) {
  /**
   * Obsługuje zmianę wartości pola tekstowego.
   * @param {ChangeEvent<HTMLTextAreaElement>} e - Obiekt zdarzenia zmiany wartości pola tekstowego.
   * @returns {void}
   */
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`text-black w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        } ${className}`}
        required={required}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
