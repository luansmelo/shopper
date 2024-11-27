interface InputLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor: string
  children: React.ReactNode
}

const InputLabel: React.FC<InputLabelProps> = ({
  htmlFor,
  children,
  className,
  ...rest
}: InputLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-nowrap pl-2 text-sm ${className}`}
      {...rest}
    >
      {children}
    </label>
  )
}

export default InputLabel
