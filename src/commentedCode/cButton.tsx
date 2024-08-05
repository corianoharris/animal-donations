// Indicate that this file is for client-side code
'use client'

import React, { useRef } from 'react'  // Import React and useRef hook (though useRef is not used here)

// Define the properties (props) that the Button component can accept
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean  // Optional property to indicate if the button is loading
}

// Define the Button component
const Button: React.FC<ButtonProps> = ({ children, isLoading, ...props }) => {
    // 'children' represents any content inside the button, 'isLoading' indicates if it's in loading state
    // '...props' represents other button properties like onClick, type, etc.

    return (
        // Render a button element
        <button
            {...props}  // Spread other button properties onto the button element
            className={`w-full p-4 rounded shadow-lg shadow-indigo-500/40 ${isLoading ? 'bg-gray-400' : 'bg-black hover:bg-slate-700'} text-white ${props.className || ''}`}
            // Apply different styles based on whether the button is loading or not
            // `w-full` makes the button full width, `p-4` adds padding, `rounded` makes rounded corners
            // `shadow-lg` adds a large shadow, `shadow-indigo-500/40` gives a color to the shadow
            // `bg-gray-400` is used if the button is loading, otherwise `bg-black` with hover effect
            disabled={isLoading || props.disabled}
            // Disable the button if it's loading or if it is already disabled
        >
            {isLoading ? 'Processing...' : children}
            {/* Display 'Processing...' if the button is loading, otherwise display the button's children */}
        </button>
    )
}

export default Button
// Export the Button component so it can be used in other files
