
import type { ReactNode } from "react"

interface ButtonProps {
  children?: ReactNode, 
  className?: string,
  onClick?: () => void, 
  disabled?: boolean,
  size?: 'sm'| 'md' | 'lg'
} 

export default function Button({children, className, onClick, disabled, size='md'}: ButtonProps){

  const padding = size === 'sm' ? 'p-2' : size == 'md' ? 'p-4' : 'p-6'

    return (
      <div>
      <button 
          className={`cursor-pointer outline-2 outline-black rounded-md bg-radial-[at_25%_25%] from-white via-stone-200 to-stone-100 hover:via-stone-100 hover:to-white disabled:opacity-50 ${padding} ${className}`}
          onClick={onClick}
          disabled={disabled}
       >
        {children}
       </button>
      </div>  
    )

}