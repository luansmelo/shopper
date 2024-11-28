import React, { forwardRef } from 'react'

interface InputContentProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

const InputContent = forwardRef<HTMLInputElement, InputContentProps>(
    ({ className, ...rest }, ref) => {
        return (
            <input
                className={`w-full border border-gray-300 bg-light text-dark placeholder:text-sm placeholder:text-placeholder focus:ring-2 focus:ring-blue-300 ${className}`}
                ref={ref}
                {...rest}
            />
        )
    }
)

export default InputContent
