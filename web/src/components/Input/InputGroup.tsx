interface InputGroupProps {
  className?: string
  children: React.ReactNode
}

const InputGroup: React.FC<InputGroupProps> = ({
  children,
  className,
}: InputGroupProps) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border-red bg-light p-2 transition duration-200 focus-within:border-black focus-within:shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}

export default InputGroup