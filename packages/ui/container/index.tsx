interface ContainerProps {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  [key: string]: unknown
}

export const Container = ({ children, as, className = '', ...props }: ContainerProps) => {
  const Component = as || 'div'

  return (
    <Component className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </Component>
  )
}
