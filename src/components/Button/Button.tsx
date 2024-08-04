// components/Button.tsx
'use client'

import React, {useRef} from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
    isLoading?: boolean
}



const Button: React.FC<ButtonProps> = ({ children, isLoading, ...props }) =>
{
    
   
    return (
        <button
            {...props}
            className={`w-48 p-2 rounded shadow-lg shadow-indigo-500/40 ${isLoading ? 'bg-gray-400' : 'bg-black hover:bg-slate-700'
                } text-white ${props.className || ''}`}
            disabled={isLoading || props.disabled}
            
        >
            {isLoading ? 'Processing...' : children}
        </button>
    
    )
}

export default Button