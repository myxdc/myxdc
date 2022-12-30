import React from 'react'

interface ButtonProps {
  as?: React.ElementType
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  [key: string]: any
}

export const Button = ({
  as = 'button',
  onClick,
  className = '',
  children,
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  ...props
}: ButtonProps) => {
  const buttonClasses = `flex items-center justify-center gap-2 px-4 py-2 rounded-md transition duration-200 ease-in-out ${
    variant === 'primary'
      ? 'bg-gradient-to-br from-primary-700 to-primary-600 text-white hover:opacity-90'
      : variant === 'secondary'
      ? 'rounded-full text-primary-600 bg-primary-100 hover:bg-primary-200'
      : variant === 'tertiary'
      ? 'bg-transparent text-gray-700 hover:bg-gray-100'
      : ''
  } ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : size === 'large' ? 'text-lg' : ''} 
  ${disabled ? 'opacity-50 cursor-not-allowed hover:opacity-50' : ''}
  ${className}`

  return React.createElement(
    as,
    {
      onClick,
      className: buttonClasses,
      disabled,
      type,
      ...props,
    },
    children
  )
}
