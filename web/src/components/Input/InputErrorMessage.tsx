interface InputErrorMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  error: string | null | undefined
}

const InputErrorMessage = ({
  error,
  className,
  ...rest
}: InputErrorMessageProps) => {
  return (
    <span
      className={`h-4 text-md font-light text-rose-600 ${className}`}
      {...rest}
    >
      {error}
    </span>
  )
}

export default InputErrorMessage