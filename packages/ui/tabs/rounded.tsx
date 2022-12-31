import { Typography } from '../typography'

interface RoundedTabsProps {
  linkComponent?: React.ElementType
  tabs: {
    label?: string
    href?: string
    active?: boolean
    onClick?: () => void
    [key: string]: any
  }[]
  className?: string
  size?: 1 | 2 | 3
  [key: string]: any
}

export const RoundedTabs = ({ linkComponent = 'a', tabs, className, size = 2, onClick, ...rest }: RoundedTabsProps) => {
  const containerPadding = size === 1 ? 'p-1' : size === 2 ? 'p-2' : 'p-2.5'
  const tabPadding = size === 1 ? 'p-2' : size === 2 ? 'p-2.5' : 'p-3'
  const tabVariant = size === 1 ? 'tiny' : size === 2 ? 'base' : 'h5'
  return (
    <div
      className={`flex w-full gap-2 ${containerPadding} text-center bg-white rounded-full shadow-lg ` + className}
      {...rest}
    >
      {tabs.map(({ active, href, label, ...props }, i) => (
        <Typography
          variant={tabVariant}
          as={linkComponent}
          key={i}
          className={`flex-1 ${tabPadding} rounded-full transition-colors cursor-pointer ${
            active ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
          }`}
          weight={500}
          href={href}
          onClick={onClick}
          {...props}
        >
          {label}
        </Typography>
      ))}
    </div>
  )
}
