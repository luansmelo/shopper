interface InputIconProps {
  children: React.ReactNode
}

const InputIcon: React.FC<InputIconProps> = ({ children }: InputIconProps) => {
  return <div className="px-3">{children}</div>
}

export default InputIcon
