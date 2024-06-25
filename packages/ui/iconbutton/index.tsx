// @ts-nocheck
import React from 'react'

interface IconButtonProps {
  children: React.ReactElement
  variant?: 1 | 2 | 3
  size?: 1 | 2 | 3 | 4 | 5
  as?: React.ElementType
  onClick?: () => void
  className?: string
  [key: string]: unknown
}

export const IconButton = ({ children, variant = 1, size = 2, as, onClick, className, ...rest }: IconButtonProps) => {
  const Component = as || 'button'

  const variantsClasses = {
    1: 'rounded-full text-gray-600 bg-gray-50 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700',
    2: 'text-primary-600 transition duration-300 shadow-sm rounded-2xl md:rounded-2xl bg-primary-50 hover:shadow-lg hover:scale-105 active:scale-95',
    3: 'rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-700',
  }
  const containerSize = {
    1: 'w-8 h-8',
    2: 'w-10 h-10',
    3: 'w-12 h-12',
    4: 'w-14 h-14',
    5: 'w-16 h-16',
  }
  const iconSize = {
    1: 'w-5 h-5',
    2: 'w-6 h-6',
    3: 'w-8 h-8',
    4: 'w-10 h-10',
    5: 'w-12 h-12',
  }
  return (
    <Component
      className={`flex items-center justify-center ${containerSize[size]} ${variantsClasses[variant]} ${className}`}
      onClick={onClick}
      type="button"
      {...rest}
    >
      {React.cloneElement(children, {
        className: `${children.props.className} ${iconSize[size]}`,
      })}
    </Component>
  )
}
