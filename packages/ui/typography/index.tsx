import React from 'react'

const WEIGHTS: Record<string, string> = {
  100: 'font-thin',
  200: 'font-extralight',
  300: 'font-light',
  400: 'font-normal',
  500: 'font-medium',
  600: 'font-semibold',
  700: 'font-bold',
  800: 'font-extrabold',
  900: 'font-black',
}

const VARIANTS: Record<string, string> = {
  hero: 'text-5xl ',
  h1: 'text-4xl sm:text-5xl',
  h2: 'text-2xl sm:text-3xl',
  h3: 'text-xl sm:text-2xl',
  h4: 'text-lg sm:text-xl',
  h5: 'text-base sm:text-lg',
  h6: 'text-sm sm:text-base',
  base: 'text-base',
  p: 'text-base leading-6 text-gray-600',
  tiny: 'text-sm leading-5',
}

interface TypographyProps {
  children: React.ReactNode
  as?: React.ElementType
  variant?: 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'base' | 'p' | 'tiny'
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  className?: string
  [key: string]: any
}

export const Typography = ({
  children,
  as = 'p',
  variant = 'base',
  weight = 400,
  className = '',
  ...props
}: TypographyProps) => {
  return React.createElement(
    as,
    {
      className: `${VARIANTS[variant]} ${weight && WEIGHTS[weight]} ${className}`,
      ...props,
    },
    children
  )
}
