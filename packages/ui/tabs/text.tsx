import { Typography } from '../typography'

interface TextTabsProps {
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

export const TextTabs = ({ linkComponent = 'a', tabs, className, size = 2, onClick, ...rest }: TextTabsProps) => {
  const containerPadding = size === 1 ? 'p-1' : size === 2 ? 'p-2' : 'p-2.5'

  const tabHeight = size === 1 ? 'h-8' : size === 2 ? 'h-12' : 'h-14'

  const tabVariant = size === 1 ? 'tiny' : size === 2 ? 'base' : 'h5'
  const activeTabVariant = size === 1 ? 'h5' : size === 2 ? 'h4' : 'h3'

  return (
    <div className={`flex w-full gap-2 ${containerPadding} text-center rounded-full ` + className} {...rest}>
      {tabs.map(({ active, href, label, ...props }, i) => (
        <Typography
          variant={active ? activeTabVariant : tabVariant}
          weight={700}
          as={linkComponent}
          key={i}
          className={`flex items-center justify-center flex-1 rounded-full transition-all cursor-pointer 
          ${tabHeight}
          ${active ? 'text-gray-900' : 'text-gray-400 hover:text-gray-500'}
          `}
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
