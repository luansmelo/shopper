type InputRootProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const InputRoot: React.FC<InputRootProps> = ({
  className,
  children,
}: InputRootProps) => {
  return <div className={`${className}`}>{children}</div>
}

export default InputRoot
