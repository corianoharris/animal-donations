import React, { forwardRef } from 'react';  // Import React and forwardRef function from React

// Define the type for each option in the select dropdown
interface Option {
  value: string;  // The value to be sent when this option is selected
  label: string;  // The text displayed for this option
}

// Define the props for the Select component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;  // The label text to show above the dropdown
  options: Option[];  // Array of options to display in the dropdown
}

// Create the Select component using forwardRef to properly handle refs
const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, options, ...props }, ref) => (
  <div className='p-1'>  {/* Container div with padding */}
    <label className="block mb-1">{label}:</label>
    {/* Label for the select element, displayed above the dropdown */}
    <select ref={ref} {...props} className="w-full p-4 border rounded text-black">
      {/* The select element itself */}
      <option value="">Select an option</option>
      {/* Default option shown when no selection has been made */}
      {options.map((option) => (
        // Loop through each option and create an <option> element for it
        <option key={option.value} value={option.value}>
          {option.label}
          {/* Display the text for each option */}
        </option>
      ))}
    </select>
  </div>
));

export default Select;
// Export the Select component so it can be used in other parts of the application
