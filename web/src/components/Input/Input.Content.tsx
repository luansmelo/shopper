import React from 'react'

interface InputContentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const InputContent: React.FC<InputContentProps> = ({ className, ...rest }) => {
  return (
    <input
      className={`w-full border-none bg-light text-dark outline-none placeholder:text-sm placeholder:text-placeholder focus:ring-0 focus:ring-offset-0 disabled:text-gray ${className}`}
      {...rest}
    />
  )
}

export default InputContent
