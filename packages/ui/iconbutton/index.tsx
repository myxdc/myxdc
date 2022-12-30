interface IconButtonProps {
  children: React.ReactNode
  as?: React.ElementType
  onClick?: () => void
  className?: string
  [key: string]: unknown
}

// TODO: Add variants
export const IconButton = ({ children, as, onClick, className, ...rest }: IconButtonProps) => {
  const Component = as || 'button'
  return (
    <Component
      className={`flex items-center justify-center rounded-2xl w-8 h-8 text-gray-600 hover:bg-gray-200 hover:text-gray-700
      ${className}`}
      onClick={onClick}
      type="button"
      {...rest}
    >
      {children}
    </Component>
  )
}
