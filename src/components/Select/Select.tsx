import React, { forwardRef } from 'react';

// Define the type for the props
interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

// ForwardRef to handle refs correctly
const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, options, ...props }, ref) => (
  <div className='p-1'>
    <label className="block mb-1">{label}:</label>
    <select ref={ref} {...props} className="w-full p-4 border rounded text-black">
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
));

export default Select;